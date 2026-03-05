const portfolioData = {
    item1: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson01/E50_01002P01/index.html',
        tags: ['html', 'css', 'js', 'jQuery'],
        title: '듣고! 달려! 스피드런',
        description: `
        <p>
            음성 또는 문장을 확인하고 알맞은 그림이나 정답을 선택하는 방식의 학습형 <br> 미니게임입니다. <br>
            전체 기획·비주얼 디자인과 주요 이미지 리소스는 클라이언트로부터 제공받은 산출물을 기반으로 하였으며,
            퍼블리싱(HTML, CSS 마크업)과 JavaScript(jQuery) 기반 인터랙션 로직 구현을 담당하여 화면 제어와 게임 진행을 구성하였습니다.
            모달 내부에서는 iframe을 활용해 실제 플레이 화면을 직접 확인할 수 있도록 구성하였으며,
            <strong>해당 구조는 미니게임 3종 모두 동일하게 적용되었습니다.</strong>
        </p>
      
        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
            <li>
                <strong class="d-block">캐릭터 DOM 재사용 구조</strong>
                홈 화면에 존재하는 캐릭터 DOM을 기준으로 <code>clone()</code> 방식으로 복제하여
                플레이어, NPC, 엔딩 화면에 동적으로 배치하였습니다.
                하나의 캐릭터 구조를 단계별로 재활용해 마크업 중복을 줄이고 유지보수성을 확보하였습니다.
            </li>

            <li>
                <strong class="d-block">클래스 기반 애니메이션 트리거 구조</strong>
                캐릭터의 달리기·땀 방울 등 연출은 모두 CSS <code>@keyframes</code>로 정의하고,
                jQuery의 <code>addClass()</code>, <code>removeClass()</code>로
                필요한 시점에만 클래스(<code>.show</code>, <code>.active</code>, <code>.playing</code> 등)를 부여해
                애니메이션을 실행하도록 구성하였습니다.
                스크립트는 “언제 재생할지”만 제어하고, 구체적인 동작과 지속 시간은 스타일에서 담당하도록
                스크립트 로직과 스타일 로직을 분리해 구조를 단순화하였습니다.
            </li>

            <li>
                <strong class="d-block">키보드 접근성 및 포커스 제어</strong>
                Enter·Space 키로 선택이 가능하도록 이벤트를 분기 처리하고,
                동적 UI 변경 시 <code>tabindex</code>와 <code>aria</code> 속성을 함께 갱신해
                키보드 및 스크린리더 환경에서도 흐름이 유지되도록 구성하였습니다.
            </li>
        </ul>
       
        `


    },
    item2: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson01/E50_01002P04/index.html',
        tags: ['html', 'css', 'js', 'jQuery'],
        title: '읽기 모험가 : 동굴편',
        description: ` 
        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
    
        <li>
            <strong class="d-block">정답 상태 시각화 처리</strong>
            정답 여부에 따라 대상 요소에 상태 클래스를 분기 적용해,
            결과가 즉시 시각적으로 구분되도록 구성하였습니다.
        </li>

        <li>
            <strong class="d-block">시간 선택 및 타이머 초기화 로직</strong>
            시간 옵션을 배열로 관리하고, 사용자가 선택한 값을
            <code>startTimer()</code> 실행 시점에 게임 시간으로 할당하도록 구성하였습니다.
            내부에서는 <code>setInterval()</code> 기반으로 남은 시간을 계산하고,
            게이지 UI와 함께 실시간으로 갱신되도록 처리하였습니다.
        </li>

        <li>
            <strong class="d-block">UI 상태 감지 기반 타이머 제어</strong>
            <code>MutationObserver</code>를 활용해 문제 영역 DOM의 상태 변화를 감지하고,
            사용자 입력이 불가능한 구간에서는 타이머가 자동으로 정지되도록 구성하였습니다.
            화면 전환, 애니메이션 구간에서도 시간 계산이 어긋나지 않도록
            UI 상태와 로직을 동기화하였습니다.
        </li>
      
        <li>
            <strong class="d-block">키보드 접근성 및 포커스 제어</strong>
            Enter·Space 키로 선택이 가능하도록 이벤트를 분기 처리하고,
            동적 UI 변경 시 <code>tabindex</code>와 <code>aria</code> 속성을 함께 갱신해
            키보드 및 스크린리더 환경에서도 흐름이 유지되도록 구성하였습니다.
        </li>
        </ul>

        <p>
        프로젝트 특성상 소스 코드는 공개하지 않으며,
        모달 내 미니 플레이 화면을 통해 실제 동작 구조와 인터랙션 흐름을 확인할 수 있습니다.
        </p>
        `
    },
    item3: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson10/E50_10002P04/index.html',
        tags: ['html', 'css', 'js','jQuery','Lottie'],
        title: '읽기모험가:설산편',
        description:  ` 
        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">클래스 기반 동적 애니메이션 제어</strong>
            정답·오답 상태에 따라 캐릭터 요소에 클래스를 동적으로 적용하고,
            CSS <code>@keyframes</code> 애니메이션이 자동으로 실행되도록 구성하였습니다.
            스크립트 로직과 스타일 로직을 분리해 이동 연출과 상태 표현을
            안정적으로 관리할 수 있도록 설계하였습니다.
        </li>

        <li>
            <strong class="d-block">Lottie 기반 배경 애니메이션 속도 연동</strong>
            JSON 기반 벡터 애니메이션을 배경에 적용하고,
            게임 진행에 따라 <code>animation.setSpeed()</code>로 재생 속도를 제어하여
            현재 속도 변화가 시각적으로 자연스럽게 반영되도록 구성하였습니다.
        </li>

        <li>
            <strong class="d-block">키보드 접근성 및 포커스 제어</strong>
            Enter·Space 키 입력으로 선택이 가능하도록 이벤트를 분기 처리하고,
            동적 UI 변경 시 <code>tabindex</code>와 <code>aria-label</code> 속성을 함께 갱신해
            키보드 및 스크린리더 환경에서도 흐름이 유지되도록 구성하였습니다.
        </li>
        </ul>

        <p>
        프로젝트 특성상 소스 코드는 공개하지 않으며,
        모달 내 미니 플레이 화면을 통해 실제 동작 구조와 인터랙션 흐름을 확인할 수 있습니다.
        </p>
        `
    },
    item4: {
        type: 'iframe-tabs',
        iframeTabs: [
            {
                label: '유형 1',
                src: 'https://webdonghyeon.dothome.co.kr/portfolio/intro/lesson01-2/frame.html',
                description: `
                <p>
                    그림 속 친구들과 어울리는 스티커를 붙여 완성하는 단원 도입 페이지입니다.
                    모달 순서(<code>Modal1</code>~<code>Modal5</code>)에 따라 클릭 아이콘 위치가 전환됩니다.
                </p>
                <p>주요 구현 내용은 다음과 같습니다.</p>
                <ul>
                <li>
                    <strong class="d-block">모달·클릭 아이콘 연동</strong>
                    <code>modalOrder</code> 배열과 <code>clickIconPositions</code>로 단계별 모달 노출과 클릭 아이콘 좌표를 관리하고, 클릭 시 해당 순서의 모달을 띄우도록 구성하였습니다.
                </li>
                <li>
                    <strong class="d-block">스티커 드롭·노출 제어</strong>
                    정답 스티커(<code>.sticker-1</code>~<code>5</code>) 클릭 시 <code>data-target-pos</code>·<code>data-target-size</code>로 목표 위치·크기를 읽어 이동 애니메이션을 주고, <code>moved</code> 클래스로 완료 상태를 구분하였습니다.
                </li>
                <li>
                    <strong class="d-block">접근성·포커스</strong>
                    Bootstrap 모달 <code>shown</code>/<code>hidden</code> 시 <code>inert</code> 속성을 토글하여 모달 밖 스티커 포커스 접근을 제어하였습니다.
                </li>
                </ul>
                `
            },
            {
                label: '유형 2',
                src: 'https://webdonghyeon.dothome.co.kr/portfolio/intro/lesson08-2/frame.html',
                description: `
                <p>
                    겨울에 해 보고 싶은 활동을 찾는 단원 도입 페이지입니다.
                    하나의 큰 배경 이미지 위에서 시점이 눈싸움·눈사람·눈썰매·낚시 영역 순으로 이동합니다.
                </p>
                <p>주요 구현 내용은 다음과 같습니다.</p>
                <ul>
                <li>
                    <strong class="d-block">시점 이동 구조</strong>
                    <code>#stage1</code>에 <code>step1</code>~<code>step5</code> 클래스를 부여하고, CSS <code>transform</code>(<code>scale</code>·<code>translate</code>)을 1.5초 <code>transition</code>으로 전환하여 큰 캔버스를 확대·이동하는 방식으로 시점을 옮기도록 구성하였습니다.
                </li>
                <li>
                    <strong class="d-block">motion 영역 노출</strong>
                    단계에 맞는 영역만 보이도록 <code>stage1-motion</code>, <code>stage2-motion</code>, <code>stage3-motion</code>을 클래스 토글로 제어하였습니다.
                </li>
                <li>
                    <strong class="d-block">하단 UI·오디오 연동</strong>
                    문장 완성·정답 선택·다음 버튼 흐름을 단계와 맞추고, 단계 진입·정답 시점에 오디오 재생을 트리거하도록 구성하였습니다.
                </li>
                </ul>
                `
            }
        ],
        tags: ['html', 'css', 'js', 'jQuery'],
        title: '단원 도입 인터렉션 페이지',
        description: ''
    },
    item5: {
        type: 'iframe',
        iframeSrc: 'https://webdonghyeon.dothome.co.kr/portfolio/markup/_markup.html',
        tags: ['html', 'css', 'scss', 'figma'],
        title: 'SCSS 스킨 프로젝트',
        description: `
        <p>
            피그마 커뮤니티에 공개된 UI Kit / 디자인 시스템을 참고하여, 실제 서비스 구조를 가정한 레이아웃 구성 및 마크업 연습 프로젝트를 제작하였습니다. SCSS를 활용한 스킨(마크업) 프로젝트이며, <code>$변수</code>·<code>@mixin</code>·중첩을 사용하여 스타일 구조를 정리하고 유지보수성을 높였습니다.
        </p>

        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">시맨틱 HTML 구조 설계</strong>
            기본적으로 시맨틱한 구조의 HTML 설계를 위해 노력하였습니다. <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code> 등 의미에 맞는 요소를 사용하여 문서 구조와 접근성을 고려하였습니다.
        </li>
        <li>
            <strong class="d-block">SCSS 구조 설계</strong>
            <code>$변수</code>로 색상·간격·폰트를 관리하고, <code>@mixin</code>·<code>@include</code>로 반복 패턴을 분리해 재사용하였습니다. <code>@import</code> 또는 <code>@use</code>로 파일을 나누어 유지보수하였습니다.
        </li>
        <li>
            <strong class="d-block">컴포넌트 단위 스타일</strong>
            헤더·네비·카드·폼 등 영역별로 선택자를 중첩(<code>&</code>)해 묶고, <code>@extend</code>로 공통 스타일을 상속해 가독성을 확보하였습니다.
        </li>
        <li>
            <strong class="d-block">반응형 레이아웃</strong>
            <code>@media</code>와 <code>display: grid</code>·<code>flex</code>로 브레이크포인트별 배치를 조정해 다양한 해상도에 대응하였습니다.
        </li>
        </ul>

        <p>
        모달 내 페이지 목록 테이블을 통해 실제 퍼블리싱 결과물을 확인할 수 있습니다.
        </p>
        `
    },
    item6: {
        type: 'iframe-tabs',
        iframeTabs: [
            {
                label: '새탭에서 보기',
                src: 'https://webdonghyeon.dothome.co.kr/portfolio/humanmade/viewer.html',
                newTabUrl: 'https://webdonghyeon.dothome.co.kr/portfolio/humanmade/index.html'
            }
        ],
        scrollHint: true,
        tags: ['html', 'css', 'js','jquery', 'xd','photoshop'],
        title: '휴먼메이드 웹사이트 퍼블리싱',
        description: `
        <p>
            HUMAN MADE 컨셉 웹사이트를 Adobe XD 디자인한 뒤 퍼블리싱한 개인 프로젝트입니다. 미니멀한 디자인으로 구성하였습니다. 메인·서브(ABOUT) 구성이며, 모달 안에서는 ABOUT 링크 클릭 시 <code>postMessage</code>로 iframe 주소만 바꾸어 서브로 전환되도록 하였습니다.
        </p>

        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">레이아웃</strong>
            그리드 시스템을 12컬럼~4컬럼 구간별로 적용하고, <code>@media</code> 브레이크포인트에서 컬럼 수를 줄여 반응형으로 맞추었습니다. <code>display: flex</code>로 헤더·섹션 내 배치를 처리하였습니다.
        </li>
        <li>
            <strong class="d-block">마크업</strong>
            문서의 상·하위 정보 구조를 기준으로 <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;footer&gt;</code> 등의 시맨틱 요소를 배치하고, 메인·서브 페이지를 섹션 단위로 구분하여 설계하였습니다. 각 섹션은 실제 서비스의 정보 구조를 가정해 비주얼, 콘텐츠 소개, 컬렉션, 뉴스, 매장 정보 등 역할에 따라 구분하였으며, 제목 계층과 내비게이션 흐름이 자연스럽게 이어지도록 구성하였습니다.
        </li>
        <li>
            <strong class="d-block">JS·라이브러리</strong>
            <code>AOS</code>의 속성들을 사용하여 스크롤 시 섹션 등장 효과를 구성하였으며,
            <code>data-aos-delay</code>). <code>Swiper</code>는 LOOKBOOK 1개,
            STORE는 지역 탭(JAPAN·KOREA 등)마다 별도 인스턴스 + jQuery로 탭 클릭 시
            해당 슬라이더만 노출·pagination 전환하게 구성하였습니다.
            (<code>toggleClass</code>), ABOUT 메뉴 점멸은 동적 <code>@keyframes</code>으로 주입하였습니다.
        </li>
        </ul>
        `
    },
    item7: {
        type: 'iframe-tabs',
        iframeTabs: [
            {
                label: '새탭에서 보기',
                src: 'https://webdonghyeon.dothome.co.kr/portfolio/liverpool/viewer.html',
                newTabUrl: 'https://webdonghyeon.dothome.co.kr/portfolio/liverpool/index.html'
            }
        ],
        scrollHint: true,
        tags: ['html', 'css', 'js', 'jquery', 'xd','photoshop'],
        title: 'Liverpool FC 웹사이트 퍼블리싱',
        description: `
        <p>
            리버풀 FC 공식 사이트를 참고해 Adobe XD로 디자인한 뒤 퍼블리싱한 개인 프로젝트입니다. 클럽의 정체성인 red 색상을 포인트컬러로 최대한 살리려고 하였습니다.
        </p>

        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">레이아웃</strong>
            12컬럼~4컬럼 그리드로 디자인하고, <code>@media</code> 브레이크포인트에서 컬럼 수를 줄여 반응형 처리. <code>display: flex</code>로 섹션·블록 배치를 맞추었습니다.
        </li>
        <li>
            <strong class="d-block">마크업</strong>
            경기 정보, 뉴스, 선수단, 우승 기록 등 주요 콘텐츠 블록을 기준으로 문서의 정보 구조를 설계하고, 이에 맞추어 <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code> 등의 시맨틱 요소를 배치하였습니다. 각 섹션은 클럽 소개, 경기 하이라이트, 최신 기사, 득점 순위, 선수 소개 등 역할별로 구분되며, 상·하위 제목 계층과 내비게이션 흐름이 자연스럽게 이어지도록 구성하였습니다.
        </li>
        <li>
            <strong class="d-block">JS·라이브러리</strong>
            <code>AOS</code>의 속성들을 사용하여 스크롤 시 섹션 등장 효과를 구성하였으며,
            비주얼 섹션은 <code>Swiper</code>로 구성하였습니다.
        </li>
        </ul>
        `
    },
    item8: {
        type: 'text',
        tags: ['html', 'css', 'js', 'jQuery','scss','GSAP','Figma','emailjs'],
        title: '포트폴리오 페이지',
        description: `
        <p>
            이 포트폴리오는 하나의 싱글 페이지 안에서 인트로 카드, About, Values, Works, Contact까지
            자연스럽게 이어지도록 구성한 프로젝트입니다. 전체 화면 전환 구조와 인터랙션 컨셉,
            레이아웃·컴포넌트 디자인은 모두 Figma로 직접 기획·설계하였습니다.
            <a href="https://www.figma.com/design/kUIrgRVxUq2pcDnGrtFKzU/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&t=LwueJp1Or7rQAyw8-1" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">
                Figma 디자인 시안 바로가기
            </a>
        </p>

        <p>주요 구현 내용은 다음과 같습니다.</p>
        <ul>
            <li>
                <strong class="d-block">작업물 썸네일 및 인트로 영상 제작</strong>
                Works 섹션에 사용된 미니게임·웹사이트 썸네일 영상은 Premiere Pro로 실제 화면을 캡처·편집하여
                짧은 하이라이트 형태로 재가공하였으며, 인트로 영역 캐릭터 영상은 생성형 AI로 기본 동작을 생성한 뒤
                필요한 구간만 추출·보정하여 사용하였습니다. 이후 자연스럽게 배경과 어우러질 수 있도록
                Premiere Pro에서 mp4 → mov 변환 과정을 거쳐, 최종적으로 webm 포맷으로 인코딩하면서 투명 배경을
                유지하도록 세팅하여 구현했습니다.
            </li>
            <li>
                <strong class="d-block">GSAP 기반 풀페이지 인터랙션</strong>
                카드 뒤집기, 섹션별 진입 애니메이션, 네비게이션 하이라이트 등은 GSAP 타임라인으로 제어하였으며,
                모바일에서는 AOS 기반 스크롤 인터랙션으로 분리하여 환경별 경험을 다르게 구성하였습니다.
            </li>
            <li>
                <strong class="d-block">Swiper · 모달 구조 설계</strong>
                메인/서브 슬라이더와 Works 세로 슬라이더를 Swiper로 구성하고,
                Bootstrap 모달과 연동하여 프로젝트별 상세 정보(iframe, 탭, 텍스트 전용)를
                재사용 가능한 데이터 구조로 관리하였습니다.
            </li>
            <li>
                <strong class="d-block">SCSS 설계 및 컴포넌트화</strong>
                SCSS 변수와 믹스인으로 색상·타이포·그리드를 관리하고, 섹션·컴포넌트 단위로 스타일을 모듈화하여
                유지보수성과 확장성을 고려한 스타일 구조를 설계하였습니다.
            </li>
            <li>
                <strong class="d-block">폼 처리 및 이메일 전송</strong>
                Contact 섹션은 유효성 검사와 함께 EmailJS를 활용하여 실제 메일 발송 흐름을 구성함으로써,
                단순한 데모가 아닌 실사용 가능한 문의 폼을 구현하였습니다.
            </li>
           <li>
                <strong class="d-block">GitHub Actions 기반 자동 배포</strong>
                작업물은 Git 저장소로 관리하였으며, Sourcetree를 통해 수정 사항을 푸시하면 GitHub Actions 워크플로가 자동으로 실행되도록 구성하였습니다. 
                워크플로에서는 빌드 완료 후 FTP 서버로 파일을 업로드하도록 설정하여, 별도의 수동 작업 없이도 포트폴리오가 항상 최신 상태로 배포되도록 자동화하였습니다.
            </li>
        </ul>
        `
    }
};

