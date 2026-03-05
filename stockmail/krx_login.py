# krx_login.py
import os
import requests

from pykrx.website.krx.webio import webio  # pykrx 내부 webio 세션 가져오기

# pykrx가 쓸 세션을 우리가 만든 세션으로 교체
_session = requests.Session()
webio._session = _session


def login_krx(login_id: str, login_pw: str) -> bool:
    """
    KRX data.krx.co.kr 로그인 후 pykrx 내부 세션 쿠키(JSESSIONID)를 갱신한다.

    로그인 흐름:
      1. GET MDCCOMS001.cmd  → 초기 JSESSIONID 발급
      2. GET login.jsp       → iframe 세션 초기화
      3. POST MDCCOMS001D1.cmd → 실제 로그인
      4. CD011(중복 로그인) → skipDup=Y 추가 후 재전송

    성공 시 True, 실패 시 False 리턴.
    """
    _LOGIN_PAGE = "https://data.krx.co.kr/contents/MDC/COMS/client/MDCCOMS001.cmd"
    _LOGIN_JSP = "https://data.krx.co.kr/contents/MDC/COMS/client/view/login.jsp?site=mdc"
    _LOGIN_URL = "https://data.krx.co.kr/contents/MDC/COMS/client/MDCCOMS001D1.cmd"
    _UA = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    )

    # 1) 초기 세션 발급
    _session.get(_LOGIN_PAGE, headers={"User-Agent": _UA}, timeout=15)
    _session.get(
        _LOGIN_JSP,
        headers={"User-Agent": _UA, "Referer": _LOGIN_PAGE},
        timeout=15,
    )

    payload = {
        "mbrNm": "",
        "telNo": "",
        "di": "",
        "certType": "",
        "mbrId": login_id,
        "pw": login_pw,
    }
    headers = {"User-Agent": _UA, "Referer": _LOGIN_PAGE}

    # 2) 로그인 POST
    resp = _session.post(_LOGIN_URL, data=payload, headers=headers, timeout=15)
    data = resp.json()
    error_code = data.get("_error_code", "")

    # 3) CD011 = “중복 로그인” 처리
    if error_code == "CD011":
        payload["skipDup"] = "Y"
        resp = _session.post(_LOGIN_URL, data=payload, headers=headers, timeout=15)
        data = resp.json()
        error_code = data.get("_error_code", "")

    # CD001 = 정상
    return error_code == "CD001"