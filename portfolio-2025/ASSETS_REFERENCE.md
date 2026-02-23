# 포트폴리오 CSS/JS 파일 참조 (index.html 기준)

> 이 문서는 `index.html`에 연결된 모든 CSS/JS를 분석해 둔 것입니다.  
> "어디서 뭐 하는지" 물어보시면 이걸 기준으로 빠르게 답변할 수 있습니다.

---

## 1. CSS 파일 (4개)

| 경로 | 용도 |
|------|------|
| `./asset/css/bootstrap.min.css` | **Bootstrap 5** (미니파이). 그리드, 폼, 모달, 유틸 클래스 등. |
| `./asset/css/swiper-bundle.min.css` | **Swiper** 슬라이더 기본 스타일. |
| `./asset/css/aos.css` | **AOS(Animate On Scroll)**. `[data-aos]` duration/delay/easing, fade/zoom/slide/flip 등 스크롤 애니메이션. (인트로에서 `AOS.init()` 사용) |
| `./asset/css/style.css` | **메인 커스텀 스타일** (아래 상세). |

### style.css 요약

- **리셋/공통**: `html` 62.5%, `--vh` 보정, `body` 등 기본 스타일, `box-sizing`, `a/li/button/img` 등.
- **폰트**: `@font-face` — Instagram Sans(300/400/500/700/800), InterVar(가변).
- **유틸**: `.gap10`~`.gap100`, `.mr/ml/mt/mb10`~`200`, `.pl/pr/pt/pb` 동일 패턴, `.d-flex`, `.text-clamp`, `.blind`, `.toggle` 등.
- **버튼 공통**: `.more`, `.work-item-btn`, `.btn-submit` — 192x77, 둥근 버튼, 호버 시 파란색+그림자.
- **인트로/카드**: `#particles-js`, `.wrap`, `.intro-txt`, `.card-section-wrap` / `.card-section`, `.card-front` / `.card-back` (뒤집기), `.character-area`, `.connect`, `.spinner`(iOS 스타일 로딩), `.profile-area`, `.profile-photo`(온라인 초록 점).
- **메인 네비**: `.main-nav`, `.main-nav-list`, `.active-background`(GSAP로 위치/너비 이동), `.nav-item`, `.swiper-pagination`(숨김).
- **모바일 스크롤**: `body.mobile-scroll-view` — 풀페이지 해제, 카드 펼침, 슬라이드 세로 나열, 네비/화살표 숨김.
- **스크롤 화살표**: `.arrow-down`, `.arrow-item` (fadeInOut 애니메이션).
- **섹션 공통**: `.section-title`, `.slide-wrap`, `.about-container`.
- **About**: `.about-content` (좌: 이름/직함/태그라인/설명/태그리스트, 우: `.skills` 카테고리별 아이콘), `.about-slide`(My Values 스와이퍼, 원형 이미지, 텍스트+prev/next).
- **Works**: `.works-container`, `.works-swiper`, `.work-item` / `.work-item-reverse`, `.work-item-thumb`(비디오), `.work-item-info`, `.work-item-btn`.
- **모달**: `.portfolio-modal`, `.modal-body`(좌: 미디어, 우: 태그+제목+설명), `.modal-iframe-tabs` / 탭 버튼, `.modal-scroll-hint`, 태그별 색상(html/css/js 등).
- **Contact**: `.contact-container`, `.contact-form-wrap`(폼 스타일), `.contact-info-wrap`(프로필 카드).

---

## 2. JavaScript 파일

### 2-1. 로컬 JS (asset/js)

| 파일 | 역할 |
|------|------|
| `jquery-3.7.1.min.js` | jQuery. DOM/이벤트/GSAP·Swiper와 함께 전역 사용. |
| `bootstrap.bundle.min.js` | Bootstrap (모달 등). `#portfolioModal`을 `bootstrap.Modal`로 제어. |
| `swiper-bundle.min.js` | Swiper. 메인 세로 슬라이더, About 가로 슬라이더, Works 세로 슬라이더. |
| `aos.js` | AOS 라이브러리. `index.js`에서 인트로 시 `AOS.init()` 호출. |
| `particles-app.js` | **particles.js** 설정. `particlesJS("particles-js", { ... })` — 파티클 개수·색·연결선·이동·호버 시 bubble 등. |
| `modal-data.js` | **포트폴리오 모달 데이터**. 전역 `portfolioData` 객체 (item1~item8). 각 항목: `type`(iframe / iframe-tabs / image), `iframeSrc` 또는 `iframeTabs` 또는 `imgSrc`, `tags`, `title`, `description`, 필요 시 `scrollHint`. |
| `index.js` | **메인 로직** (아래 상세). |
| `contact-form.js` | **EmailJS**. `emailjs.init('...')`, `#contact-form` submit 시 `emailjs.sendForm(service, template, form)` 호출 후 성공/실패 알림. |

### 2-2. index.js 상세 (블록 단위)

1. **모바일 100vh 보정**  
   `setRealVH()` — `--vh` 설정, resize 시 갱신.

2. **인트로 스킵 플래그**  
   `devSkipIntro = true` → 인트로 없이 바로 메인(카드 뒤집힌 상태).

3. **메인 네비 ↔ 슬라이드 동기화**  
   `SLIDE_TO_NAV`, `NAV_TO_SLIDE`로 인덱스 매핑. `updateActiveSlider()`에서 GSAP로 `.active-background` 위치/너비 이동. 메뉴 클릭 시 `swiper.slideTo(NAV_TO_SLIDE[navIndex])`.

4. **Works 섹션**  
   `.works-swiper` — 세로 Swiper, 휠로만 이동. 끝에서 한 번 더 휠 시 `playBoundaryFeedbackAnimation` 후 다음/이전 메인 슬라이드로 이동. `initWorksSwiper()` / `destroyWorksSwiper()` 로 생성·해제.

5. **메인 세로 슬라이더**  
   `.main-swiper` — direction vertical, mousewheel, keyboard. Works 슬라이드일 때 메인 휠 비활성화. `scheduleArrowDown()` 로 화살표 표시. 슬라이드 1(My Values)일 때 `.card-back--values-bg` 토글.

6. **반응형 레이아웃**  
   `manageLayout()` — 1200px 이하면 `mobile-scroll-view` 부여, Swiper 해제, 스크롤 레이아웃. 이상이면 풀페이지 Swiper 복구.

7. **About 스와이퍼**  
   `.about-swiper` — IntersectionObserver로 보일 때만 생성. 슬라이드별 텍스트(신뢰/긍정/성장/소통), GSAP로 텍스트/이미지 전환.

8. **인트로 시퀀스** (devSkipIntro false일 때)  
   TypeIt으로 `.intro-txt` 타이핑 → 완료 후 카드 등장(GSAP) → `.dynamic-text` 순환 문구 + ellipsis 애니메이션 → 캐릭터 비디오 호버 시 재생/역재생 → "더 알아보기" 클릭 시 confetti → "연결 성공!" → `showMainAfterConnect()`: 카드 뒤집기 + 넓히기 + About 영역 등장 애니메이션.

9. **포트폴리오 모달**  
   `.work-item-btn` 클릭 시 `portfolioData[itemN]` 기준으로:  
   - 미디어: iframe 단일 / iframe-tabs(탭+여러 iframe) / image.  
   - `scrollHint` 있으면 "스크롤 해보세요!" 딤드 추가, 휠/터치 시 제거.  
   - 제목·설명·태그(TAG_MAP으로 클래스 매핑) 채운 뒤 Bootstrap 모달 표시.  
   - `hidden.bs.modal` 시 iframe 제거.  
   - `message` 이벤트로 iframe 내부 `navigate` 시 모달 iframe `src`만 변경(HTTPS 유지).

### 2-3. CDN JS (외부)

| URL | 라이브러리 | 사용처 |
|-----|------------|--------|
| gsap@3.12.5 | GSAP | 인트로·카드·네비·About·모달 등 애니메이션. |
| canvas-confetti@1.6.0 | Confetti | "더 알아보기" 클릭 후 연결 성공 시. |
| typeit@8.7.1 | TypeIt | 인트로 문구 타이핑. |
| particles.js@2.0.0 | Particles.js | 배경 파티클 (particles-app.js가 설정). |
| @emailjs/browser@3 | EmailJS | contact-form.js에서 폼 전송. |

---

## 3. 데이터/설정 요약

- **모달 데이터**: `modal-data.js`의 `portfolioData.item1` ~ `item8` — type, URL/이미지, tags, title, description. 새 작업 추가 시 여기 항목 추가 + HTML에 `.work-item` 순서 맞추기.
- **인트로 문구**: `index.js` 내 TypeIt 호출부 (예: `'깃액션 연동 테스트 중.'`) 및 `dynamicTexts` 배열.
- **About My Values 텍스트**: `index.js`의 `aboutTexts` 배열 (신뢰/긍정/성장/소통 제목·설명).
- **Contact**: EmailJS — `contact-form.js`의 `emailjs.init` 키, `sendForm`의 service ID / template ID.

---

## 4. 수정 시 자주 보게 될 파일

- **스타일 전반**: `asset/css/style.css`
- **레이아웃/인트로/슬라이더/모달 로직**: `asset/js/index.js`
- **작업 목록/모달 내용**: `asset/js/modal-data.js`
- **연락 폼 전송**: `asset/js/contact-form.js`
- **배경 파티클**: `asset/js/particles-app.js`

이제 "OO 어디서 해?"라고 물어보시면 이 참조를 기준으로 파일명·블록 단위로 바로 안내할 수 있습니다.
