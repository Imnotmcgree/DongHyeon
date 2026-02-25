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
            <strong class="d-block">문제 흐름 제어 및 오답 재출제 로직</strong>
            문제 배열을 랜덤으로 섞어 진행하고, 오답 문제는 별도의 배열에 저장한 뒤
            기존 문제가 모두 소진되면 다시 재출제되도록 구성하였습니다.
            라운드·스텝·종료 상태를 분리 관리해 게임 흐름이 안정적으로 유지되도록 제어하였습니다.
        </li>

        <li>
            <strong class="d-block">클래스 기반 애니메이션 트리거 구조</strong>
            jQuery의 <code>addClass()</code>, <code>removeClass()</code>로
            캐릭터 상태를 제어하고,
            CSS animation이 클래스 변경에 따라 실행되도록 구성하였습니다.
            스크립트 로직과 스타일 로직을 분리해 구조를 단순화하였습니다.
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
            별도의 화면 전환 없이도 결과가 즉시 시각적으로 구분되도록 구성하였습니다.
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
            { label: '유형 1', src: 'https://webdonghyeon.dothome.co.kr/portfolio/intro/lesson01-2/frame.html' },
            { label: '유형 2', src: 'https://webdonghyeon.dothome.co.kr/portfolio/intro/lesson08-2/frame.html' }
        ],
        tags: ['html', 'css', 'js', 'jQuery'],
        title: '단원 도입 인터렉션 페이지',
        description: `
        <p>
            전자저작물 단원 도입용 인터렉션 페이지 2종입니다. <br>
            유형 1·유형 2는 각각 다른 주제와 화면 흐름으로, 학습자가 단원에 자연스럽게 진입할 수 있도록 구성하였습니다.
        </p>

        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">유형별 페이지 구조 및 콘텐츠 구성</strong>
            각 유형마다 단원 도입에 맞는 섹션을 나누어 마크업하였고, 이미지·텍스트·버튼 등 요소를 단계별로 배치하였습니다. 공통 레이아웃은 유지하면서 유형별로 다른 콘텐츠만 교체하기 쉽게 구성하여 재사용성을 높였습니다.
        </li>
        <li>
            <strong class="d-block">상황별 오디오 트리거 설계</strong>
            단원 도입 흐름에 맞춰 <strong>상황에 맞는 트리거에서만 오디오가 재생되도록</strong> 설계하였습니다. HTML5 <code>&lt;audio&gt;</code> 또는 <code>new Audio()</code>로 소스를 관리하고, 특정 단계 진입·클릭·다음 버튼 등 이벤트 시점에 <code>play()</code>·<code>pause()</code>를 호출해, 화면 전환과 나레이션·효과음이 맞물리도록 연동하였습니다.
        </li>
        <li>
            <strong class="d-block">자연스러운 애니메이션 연출</strong>
            <code>@keyframes</code>와 <code>transition</code>으로 요소 등장·전환·강조를 넣되, <code>ease-in-out</code>·<code>cubic-bezier</code>로 타이밍을 조정해 움직임이 부드럽게 보이도록 하였습니다. 단계가 바뀔 때는 duration을 맞추어 오디오·화면 전환과 어긋나지 않게 하였고, 필요한 구간에는 <code>animation-delay</code>로 순차 등장 효과를 주어 흐름에 맞는 자연스러운 연출을 적용하였습니다.
        </li>
        <li>
            <strong class="d-block">인터랙션 및 시각 연출</strong>
            단원 도입 흐름에 맞춰 사용자의 클릭·호버에 반응하도록 <code>click</code>, <code>mouseenter</code> / <code>mouseleave</code> 이벤트를 연결하였습니다. 위 애니메이션과 연동해 단계별로 요소가 반응하도록 하였습니다.
        </li>
        <li>
            <strong class="d-block">반응형 대응</strong>
            <code>@media</code> 쿼리로 브레이크포인트를 나누고, <code>flex</code>·<code>grid</code>를 활용해 뷰포트에 따라 레이아웃·요소 크기·간격이 달라지도록 하였습니다. 태블릿·모바일에서도 단원 도입 흐름이 깨지지 않도록 배치와 타이포를 조정하였습니다.
        </li>
        </ul>

        <p>
        모달 내에서 유형 1·2 각각의 화면과 인터랙션 흐름을 확인할 수 있습니다.
        </p>
        `
    },
    item5: {
        type: 'iframe',
        iframeSrc: 'https://webdonghyeon.dothome.co.kr/portfolio/markup/_markup.html',
        tags: ['html', 'css', 'scss'],
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
        tags: ['html', 'css', 'js'],
        title: '휴먼메이드 웹사이트 퍼블리싱',
        description: `
        <p>
            HUMAN MADE 컨셉 웹사이트를 <strong>Adobe XD 디자인부터 퍼블리싱까지 직접 진행</strong>한 개인 프로젝트입니다. 미니멀한 디자인으로 구성하였습니다. 메인·서브(ABOUT) 구성이며, 모달 안에서는 ABOUT 링크 클릭 시 <code>postMessage</code>로 iframe 주소만 바꾸어 서브로 전환되도록 하였습니다.
        </p>

        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">레이아웃</strong>
            그리드 시스템을 12컬럼~4컬럼 구간별로 적용하고, <code>@media</code> 브레이크포인트에서 컬럼 수를 줄여 반응형으로 맞추었습니다. <code>display: flex</code>로 헤더·섹션 내 배치를 처리하였습니다.
        </li>
        <li>
            <strong class="d-block">마크업</strong>
            문서의 상·하위 정보 구조를 기준으로 <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;footer&gt;</code> 등의 시맨틱 요소를 배치하고, 메인·서브 페이지를 섹션 단위로 구분하여 설계하였습니다. 각 섹션은 실제 서비스의 정보 구조를 가정해 비주얼, 콘텐츠 소개, 컬렉션, 뉴스, 매장 정보 등 역할에 따라 구분하였으며, 제목 계층과 내비게이션 흐름이 자연스럽게 이어지도록 구성하였습니다. 또한 스크린리더와 검색엔진에서 영역의 의미와 관계가 명확히 드러나도록 마크업하였습니다.
        </li>
        <li>
            <strong class="d-block">JS·라이브러리</strong>
            <code>AOS</code>로 스크롤 시 섹션 등장(<code>data-aos</code>, <code>data-aos-delay</code>). <code>Swiper</code>는 LOOKBOOK 1개, STORE는 지역 탭(JAPAN·KOREA 등)마다 별도 인스턴스 + jQuery로 탭 클릭 시 해당 슬라이더만 노출·pagination 전환. jQuery로 햄버거 클릭 시 네비 열고 닫기(<code>toggleClass</code>), ABOUT 메뉴 점멸은 동적 <code>@keyframes</code> 주입.
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
        tags: ['html', 'css', 'js'],
        title: '리버풀 FC 웹사이트 퍼블리싱',
        description: `
        <p>
            리버풀 FC 공식 사이트를 참고해 <strong>Adobe XD로 디자인한 뒤 퍼블리싱까지 직접 진행</strong>한 개인 프로젝트입니다. 클럽의 정체성인 red 색상을 포인트컬러로 최대한 살리려고 하였습니다.
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
            <code>AOS</code>로 스크롤 시 섹션 등장(<code>data-aos</code>, <code>data-aos-delay</code>). <code>Swiper</code>는 비주얼(4장·pagination·autoplay), HEADLINES(4장·prev/next), WOMEN'S(4장·prev/next) 3개 인스턴스. jQuery로 햄버거 클릭 시 네비 열고 닫기(<code>toggleClass</code>).
        </li>
        </ul>
        `
    },
    item8: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Liverpool+FC',
        tags: ['react', 'scss'],
        title: '미완성 프로젝트',
        description: `<p></p>`
    }
};
