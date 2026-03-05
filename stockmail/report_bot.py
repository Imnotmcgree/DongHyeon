import os
import json
import smtplib
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from pykrx import stock


def get_target_date() -> datetime:
    """리포트 기준 날짜(영업일)를 반환 (전 영업일 기준)."""
    # 기본은 '어제'
    d = datetime.now() - timedelta(days=1)
    # 어제가 토/일이면 가장 가까운 금요일로 이동
    if d.weekday() == 5:  # 토요일
        d = d - timedelta(days=1)
    elif d.weekday() == 6:  # 일요일
        d = d - timedelta(days=2)
    return d


def fetch_market_data(base_date: datetime) -> dict:
    """pykrx로 '대표 종목 바스켓' 데이터를 수집.

    pykrx의 전체 티커/시장 헬퍼들이 환경에 따라 불안정해서,
    비교적 안정적인 대형주/대표주 소수 종목을 대상으로만 OHLCV를 조회해
    상승/하락/거래량 TOP 리스트를 계산한다.

    pykrx 또는 KRX 응답 문제로 실제 데이터를 못 가져오는 경우에는
    최소한 동작 확인을 위해 예시 데이터를 사용한다.
    """
    date_str = base_date.strftime("%Y%m%d")

    # 코스피 중심 대표 종목 바스켓 (필요하면 여기 종목을 추가/수정)
    universe = [
        "005930",  # 삼성전자
        "000660",  # SK하이닉스
        "035420",  # NAVER
        "035720",  # 카카오
        "051910",  # LG화학
        "373220",  # LG에너지솔루션
        "207940",  # 삼성바이오로직스
        "005380",  # 현대차
        "000270",  # 기아
        "068270",  # 셀트리온
        "105560",  # KB금융
        "028260",  # 삼성물산
        "006400",  # 삼성SDI
        "034730",  # SK
        "003550",  # LG
    ]

    records: list[dict] = []

    for code in universe:
        try:
            df = stock.get_market_ohlcv(date_str, date_str, code)
        except Exception:
            continue

        if df.empty:
            continue

        row = df.iloc[0]
        try:
            try:
                name = stock.get_market_ticker_name(code)
            except Exception:
                name = str(code)

            rec = {
                "code": str(code),
                "name": name,
                "open": float(row["시가"]),
                "close": float(row["종가"]),
                "change": float(row["등락률"]),
                # 활동성 지표로 거래량 사용
                "value": float(row["거래량"]),
            }
        except KeyError:
            continue
        records.append(rec)

    is_mock = False
    if not records:
        # 실데이터가 전혀 없는 경우: 파이프라인 테스트를 위해 예시 데이터 사용
        print("경고: pykrx에서 실데이터를 가져오지 못했습니다. 예시 데이터로 대체합니다.")
        is_mock = True
        records = [
            {"code": "000001", "open": 10000, "close": 10200, "change": 2.0, "value": 1500000000},
            {"code": "000002", "open": 25000, "close": 26250, "change": 5.0, "value": 980000000},
            {"code": "000003", "open": 8000, "close": 7600, "change": -5.0, "value": 450000000},
            {"code": "000004", "open": 120000, "close": 118800, "change": -1.0, "value": 2100000000},
            {"code": "000005", "open": 15000, "close": 15750, "change": 5.0, "value": 700000000},
        ]

    # 등락률 기준 상위/하위, 거래대금 상위 계산
    sorted_by_change = sorted(records, key=lambda r: r["change"])
    sorted_by_value = sorted(records, key=lambda r: r["value"], reverse=True)

    top_gainers = list(reversed(sorted_by_change))[:10]
    top_losers = sorted_by_change[:10]
    top_value = sorted_by_value[:10]

    return {
        "date_str": base_date.strftime("%Y-%m-%d"),
        "is_mock": is_mock,
        # 지수 정보는 환경별 pykrx 스키마 차이로 인해 생략
        "kospi": None,
        "kosdaq": None,
        "top_gainers": top_gainers,
        "top_losers": top_losers,
        "top_value": top_value,
    }


def build_ai_prompt(market: dict) -> str:
    """수집한 데이터를 기반으로 AI에 전달할 한국어 프롬프트 생성."""
    lines = []
    lines.append(f"날짜: {market['date_str']}")
    if market.get("is_mock"):
        lines.append("")
        lines.append("[중요] 아래 데이터는 실제 KRX 데이터 수집에 실패하여, 파이프라인 테스트용으로 생성된 예시입니다.")
    lines.append("")
    lines.append("1. 지수 요약")

    def _idx_line(name, info):
        if not info:
            return f"- {name}: 데이터 없음"
        return (
            f"- {name}: 종가 {info['close']:.2f}p, "
            f"등락률 {info['change']:.2f}% "
            f"(시가 {info['open']:.2f} / 고가 {info['high']:.2f} / 저가 {info['low']:.2f})"
        )

    lines.append(_idx_line("코스피", market.get("kospi")))
    lines.append(_idx_line("코스닥", market.get("kosdaq")))
    lines.append("")

    def _format_table(title, rows):
        out = [f"2. {title}"]
        if not rows:
            out.append("- 데이터 없음")
            return out
        for r in rows:
            out.append(
                f"- 종목코드 {r['code']}: "
                f"시가 {r['open']:.0f}원 → 종가 {r['close']:.0f}원 "
                f"(등락률 {r['change']:.2f}%, 거래대금 {r['value']:.0f})"
            )
        return out

    lines.extend(_format_table("상승률 상위 TOP 10", market.get("top_gainers") or []))
    lines.append("")
    lines.extend(_format_table("하락률 상위 TOP 10", market.get("top_losers") or []))
    lines.append("")
    lines.extend(_format_table("거래대금 상위 TOP 10", market.get("top_value") or []))

    stats_block = "\n".join(lines)

    system_instruction = (
        "당신은 한국 국내 주식시장(KOSPI, KOSDAQ) 데일리 리포트를 작성하는 애널리스트입니다. "
        "아래 통계 데이터를 바탕으로, 시장의 전반적인 흐름과 특징, 섹터/테마별 특징, "
        "대표 종목, 투자자 심리, 향후 단기적인 관전 포인트를 한국어로 정리해 주세요. "
        "만약 데이터가 테스트용 예시라고 명시되어 있다면, 실제 투자 판단이 아닌 예시 설명이라는 점을 "
        "간단히 밝혀 주고, 지나치게 구체적인 수치 전망은 피해주세요."
    )

    prompt = f"""
다음은 오늘 장 마감 후 요약 통계 데이터입니다.

{stats_block}

위 데이터를 바탕으로 아래 구조로 한국어 리포트를 작성해 주세요.

1. 오늘 시장 한 줄 요약 (1~2문장)
2. 코스피 / 코스닥 지수 흐름 정리
3. 강세 섹터 및 대표 종목 특징
4. 약세 섹터 및 하락 종목 특징
5. 거래대금 상위 종목에서 볼 수 있는 수급 특징
6. 향후 1~3거래일 단기 관전 포인트 (투자 판단이 아닌 방향성 참고용 코멘트)

문장 수는 너무 길지 않게, 일반 개인 투자자가 읽기 쉽게 써 주세요.
"""

    return system_instruction.strip(), prompt.strip()


def generate_rule_based_commentary(market: dict) -> str:
    """관심 종목 바스켓을 기반으로 간단한 규칙 기반 한국어 마켓 코멘터리 생성."""
    gainers = market.get("top_gainers") or []
    losers = market.get("top_losers") or []
    values = market.get("top_value") or []

    lines: list[str] = []

    date_label = market.get("date_str", "")
    if date_label:
        lines.append(f"{date_label} 기준 관심 대형주 바스켓 마감 동향입니다.")
    else:
        lines.append("관심 대형주 바스켓 마감 동향입니다.")

    # 상승률/하락률 상위 대표 종목
    if gainers:
        g = gainers[0]
        lines.append(
            f"상승률 상위 종목은 {g.get('name', g['code'])}({g['code']})로, "
            f"{g['open']:.0f}원에서 {g['close']:.0f}원으로 마감하며 "
            f"{g['change']:.2f}% 상승했습니다."
        )

    if losers:
        l = losers[0]
        lines.append(
            f"하락률 상위 종목은 {l.get('name', l['code'])}({l['code']})로, "
            f"{l['open']:.0f}원에서 {l['close']:.0f}원으로 마감하며 "
            f"{l['change']:.2f}% 하락했습니다."
        )

    # 상승률 상위와 거래량 상위 겹치는 종목
    overlap_codes = {g["code"] for g in gainers} & {v["code"] for v in values}
    if overlap_codes:
        # 이름 목록 만들기
        code_to_name: dict[str, str] = {}
        for r in gainers + values:
            code_to_name[r["code"]] = r.get("name", r["code"])
        names = [code_to_name[c] for c in overlap_codes]
        joined = ", ".join(names)
        lines.append(
            f"상승률 상위와 거래량 상위에 동시에 포함된 종목으로는 {joined} 등이 있어, "
            "단기 모멘텀과 수급이 함께 유입된 구간으로 보입니다."
        )
    elif values:
        v = values[0]
        lines.append(
            f"거래량 상위 종목은 {v.get('name', v['code'])}({v['code']})로, "
            "당일 수급이 이 종목에 집중되는 모습입니다."
        )

    # 전체 관심 바스켓의 평균 등락률로 분위기 추정
    all_recs = gainers + losers + values
    if all_recs:
        uniq: dict[str, dict] = {}
        for r in all_recs:
            uniq[r["code"]] = r
        avg_change = sum(r["change"] for r in uniq.values()) / len(uniq)

        if avg_change > 0.5:
            lines.append(
                "관심 종목 바스켓 전체로 보면 상승 종목이 우세하며, "
                "투자심리는 비교적 우호적인 편입니다."
            )
        elif avg_change < -0.5:
            lines.append(
                "관심 종목 바스켓 전체로 보면 하락 종목이 우세하며, "
                "단기 조정 국면으로 해석할 수 있습니다."
            )
        else:
            lines.append(
                "관심 종목 바스켓 전체로는 상승·하락이 혼재된 보합권 흐름에 가깝습니다."
            )

    lines.append(
        "본 코멘트는 소수 대표 종목 기반의 정량 지표 요약으로, "
        "개별 종목 매수·매도 판단보다는 시장 분위기와 흐름을 파악하는 데 참고용으로 활용해 주세요."
    )

    return "\n".join(lines)

def build_html_report(market: dict, commentary: str) -> str:
    """AI 코멘터리와 기본 지표를 포함한 HTML 리포트 생성."""
    date_label = market["date_str"]

    def _idx_tr(label, info):
        if not info:
            return ""
        return f"""
          <tr>
            <td>{label}</td>
            <td>{info['close']:.2f}</td>
            <td>{info['change']:.2f}%</td>
            <td>{info['open']:.2f}</td>
            <td>{info['high']:.2f}</td>
            <td>{info['low']:.2f}</td>
          </tr>
        """

    kospi_tr = _idx_tr("코스피", market.get("kospi"))
    kosdaq_tr = _idx_tr("코스닥", market.get("kosdaq"))

    def _table_rows(rows):
        if not rows:
            return "<tr><td colspan='5'>데이터 없음</td></tr>"
        buff = []
        for r in rows:
            change_val = float(r["change"])
            if change_val > 0:
                change_color = "#f97373"  # 상승: 붉은색
            elif change_val < 0:
                change_color = "#60a5fa"  # 하락: 파란색
            else:
                change_color = "#e5e7eb"  # 보합: 기본 회색 톤

            name = r.get("name") or r["code"]
            buff.append(
                f"""
            <tr>
              <td style="padding:4px 4px;color:#e5e7eb;">{name} ({r['code']})</td>
              <td align="right" style="padding:4px 4px;color:#e5e7eb;">{r['open']:.0f}</td>
              <td align="right" style="padding:4px 4px;color:#e5e7eb;">{r['close']:.0f}</td>
              <td align="right" style="padding:4px 4px;font-weight:600;color:{change_color};">{r['change']:.2f}%</td>
              <td align="right" style="padding:4px 4px;color:#e5e7eb;">{r['value']:.0f}</td>
            </tr>
            """
            )
        return "\n".join(buff)

    gain_rows = _table_rows(market.get("top_gainers") or [])
    lose_rows = _table_rows(market.get("top_losers") or [])
    value_rows = _table_rows(market.get("top_value") or [])

    # 간단한 다크 테마 HTML 이메일 템플릿
    html = f"""
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>일일 주식 마감 리포트 – {date_label}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:760px;margin:0 auto;background:#020617;color:#e5e7eb;padding:24px 20px;">
      <h1 style="font-size:22px;margin:0 0 6px 0;font-weight:600;">일일 주식 마감 리포트</h1>
      <p style="margin:0 0 20px 0;font-size:13px;color:#9ca3af;">날짜: {date_label} · KOSPI / KOSDAQ Daily Brief</p>

      <div style="border-radius:16px;border:1px solid #1f2937;background:#0b1120;padding:18px 16px 16px 16px;margin-bottom:20px;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#9ca3af;margin:0 0 8px 0;">Summary</p>
        <div style="font-size:13px;line-height:1.9;color:#e5e7eb;white-space:pre-wrap;">{commentary}</div>
      </div>

      <div style="border-radius:16px;border:1px solid #1f2937;background:#020617;padding:16px 16px 14px 16px;margin-bottom:20px;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#9ca3af;margin:0 0 10px 0;">Index Overview</p>
        <table style="width:100%;border-collapse:collapse;font-size:12px;line-height:1.6;">
          <thead>
            <tr>
              <th align="left" style="padding:6px 6px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">지수</th>
              <th align="right" style="padding:6px 6px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종가</th>
              <th align="right" style="padding:6px 6px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">등락률</th>
              <th align="right" style="padding:6px 6px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">시가</th>
              <th align="right" style="padding:6px 6px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">고가</th>
              <th align="right" style="padding:6px 6px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">저가</th>
            </tr>
          </thead>
          <tbody>
            {kospi_tr}
            {kosdaq_tr}
          </tbody>
        </table>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
        <div style="flex:1 1 240px;border-radius:16px;border:1px solid #1f2937;background:#020617;padding:12px 12px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#9ca3af;margin:0 0 8px 0;">상승률 상위 TOP 10</p>
          <table style="width:100%;border-collapse:collapse;font-size:11px;line-height:1.6;">
            <thead>
              <tr>
                <th align="left" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종목</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">시가</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종가</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">등락률</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">거래량</th>
              </tr>
            </thead>
            <tbody>
              {gain_rows}
            </tbody>
          </table>
        </div>

        <div style="flex:1 1 240px;border-radius:16px;border:1px solid #1f2937;background:#020617;padding:12px 12px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#9ca3af;margin:0 0 8px 0;">하락률 상위 TOP 10</p>
          <table style="width:100%;border-collapse:collapse;font-size:11px;line-height:1.6;">
            <thead>
              <tr>
                <th align="left" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종목</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">시가</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종가</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">등락률</th>
                <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">거래량</th>
              </tr>
            </thead>
            <tbody>
              {lose_rows}
            </tbody>
          </table>
        </div>
      </div>

      <div style="border-radius:16px;border:1px solid #1f2937;background:#020617;padding:12px 12px;margin-bottom:20px;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#9ca3af;margin:0 0 8px 0;">거래량 상위 TOP 10</p>
        <table style="width:100%;border-collapse:collapse;font-size:11px;line-height:1.6;">
          <thead>
            <tr>
              <th align="left" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종목</th>
              <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">시가</th>
              <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">종가</th>
              <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">등락률</th>
              <th align="right" style="padding:4px 4px;border-bottom:1px solid #1f2937;color:#e5e7eb;background:#020617;">거래량</th>
            </tr>
          </thead>
          <tbody>
            {value_rows}
          </tbody>
        </table>
      </div>

      <p style="font-size:11px;color:#6b7280;margin:0;line-height:1.6;">
        ※ 본 리포트는 참고용 정보이며, 투자 손익에 대한 책임은 투자자 본인에게 있습니다.
      </p>
    </div>
  </body>
</html>
    """
    return html


def load_mail_config(config_path: str = "mail_config.json") -> dict:
    """메일 서버 및 수신자 설정 로드."""
    if not os.path.exists(config_path):
        raise FileNotFoundError(
            f"{config_path} 파일이 없습니다. mail_config.example.json을 참고해 생성해 주세요."
        )
    with open(config_path, "r", encoding="utf-8") as f:
        return json.load(f)


def send_email(subject: str, html_body: str, config: dict) -> None:
    """SMTP를 이용해 HTML 이메일 발송."""
    smtp_host = config["smtp_host"]
    smtp_port = config.get("smtp_port", 587)
    use_tls = config.get("use_tls", True)
    username = config["username"]
    password = config["password"]
    sender = config.get("sender", username)
    recipients = config["recipients"]  # list[str]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = ", ".join(recipients)

    part_html = MIMEText(html_body, "html", _charset="utf-8")
    msg.attach(part_html)

    # 윈도우 PC 이름/호스트명이 한글일 때 ASCII 인코딩 문제를 피하기 위해
    # local_hostname을 명시적으로 ASCII 값으로 지정한다.
    with smtplib.SMTP(smtp_host, smtp_port, local_hostname="localhost") as server:
        server.ehlo("localhost")
        if use_tls:
            server.starttls()
            server.ehlo("localhost")
        server.login(username, password)
        server.sendmail(sender, recipients, msg.as_string())


def main():
    target_date = get_target_date()
    market_data = fetch_market_data(target_date)

    commentary = generate_rule_based_commentary(market_data)

    html_report = build_html_report(market_data, commentary)

    config = load_mail_config()
    subject = f"[StockMail] {market_data['date_str']} 코스피/코스닥 마감 요약"

    send_email(subject, html_report, config)


if __name__ == "__main__":
    main()

