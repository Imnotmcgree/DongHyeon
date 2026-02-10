const portfolioData = {
    item1: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson01/E50_01002P01/index.html',
        tags: ['html', 'css', 'js', 'jQuery'],
        title: '듣고! 달려! 스피드런',
        description: `
       <p>
            음성 또는 문장을 확인하고 알맞은 그림이나 정답을 선택하는 방식의 학습형 <br> 미니게임입니다. <br>
            기획 및 디자인, 이미지 리소스는 클라이언트로부터 제공받은 자료를 사용했으며,
            HTML, CSS, JavaScript 기반으로 인터랙션 로직과 화면 제어를 구현했습니다.
            학습 이력 기록을 위한 xAPI 통신 구조는 기존 프로젝트 공통 프레임워크를 활용하고,
            게임 흐름에 맞게 일부 로직을 연동·확장하는 방식으로 적용했습니다.
            모달 내부에서는 iframe을 활용해 실제 플레이 화면을 직접 확인할 수 있도록 구성했으며,
            <strong>해당 구조는 미니게임 3종 모두 동일하게 적용되었습니다.</strong>
        </p>
      
        <p>주요 구현 내용은 다음과 같습니다.</p>

        <ul>
        <li>
            <strong class="d-block">캐릭터 DOM 재사용 구조</strong>
            홈 화면에 존재하는 캐릭터 DOM을 기준으로 <code>clone()</code> 방식으로 복제하여
            플레이어, NPC, 엔딩 화면에 동적으로 배치했습니다.
            하나의 캐릭터 구조를 단계별로 재활용해 마크업 중복을 줄이고 유지보수성을 확보했습니다.
        </li>

        <li>
            <strong class="d-block">문제 흐름 제어 및 오답 재출제 로직</strong>
            문제 배열을 랜덤으로 섞어 진행하고, 오답 문제는 별도의 배열에 저장한 뒤
            기존 문제가 모두 소진되면 다시 재출제되도록 구성했습니다.
            라운드·스텝·종료 상태를 분리 관리해 게임 흐름이 안정적으로 유지되도록 제어했습니다.
        </li>

        <li>
            <strong class="d-block">클래스 기반 애니메이션 트리거 구조</strong>
            jQuery의 <code>addClass()</code>, <code>removeClass()</code>로
            캐릭터 상태를 제어하고,
            CSS animation이 클래스 변경에 따라 실행되도록 구성했습니다.
            스크립트 로직과 스타일 로직을 분리해 구조를 단순화했습니다.
        </li>

        <li>
            <strong class="d-block">키보드 접근성 및 포커스 제어</strong>
            Enter·Space 키로 선택이 가능하도록 이벤트를 분기 처리하고,
            동적 UI 변경 시 <code>tabindex</code>와 <code>aria</code> 속성을 함께 갱신해
            키보드 및 스크린리더 환경에서도 흐름이 유지되도록 구성했습니다.
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
            별도의 화면 전환 없이도 결과가 즉시 시각적으로 구분되도록 구성했습니다.
        </li>

        <li>
            <strong class="d-block">시간 선택 및 타이머 초기화 로직</strong>
            시간 옵션을 배열로 관리하고, 사용자가 선택한 값을
            <code>startTimer()</code> 실행 시점에 게임 시간으로 할당하도록 구성했습니다.
            내부에서는 <code>setInterval()</code> 기반으로 남은 시간을 계산하고,
            게이지 UI와 함께 실시간으로 갱신되도록 처리했습니다.
        </li>

        <li>
            <strong class="d-block">UI 상태 감지 기반 타이머 제어</strong>
            <code>MutationObserver</code>를 활용해 문제 영역 DOM의 상태 변화를 감지하고,
            사용자 입력이 불가능한 구간에서는 타이머가 자동으로 정지되도록 구성했습니다.
            화면 전환, 애니메이션 구간에서도 시간 계산이 어긋나지 않도록
            UI 상태와 로직을 동기화했습니다.
        </li>
      
        <li>
            <strong class="d-block">키보드 접근성 및 포커스 제어</strong>
            Enter·Space 키로 선택이 가능하도록 이벤트를 분기 처리하고,
            동적 UI 변경 시 <code>tabindex</code>와 <code>aria</code> 속성을 함께 갱신해
            키보드 및 스크린리더 환경에서도 흐름이 유지되도록 구성했습니다.
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
            CSS <code>@keyframes</code> 애니메이션이 자동으로 실행되도록 구성했습니다.
            스크립트 로직과 스타일 로직을 분리해 이동 연출과 상태 표현을
            안정적으로 관리할 수 있도록 설계했습니다.
        </li>

        <li>
            <strong class="d-block">Lottie 기반 배경 애니메이션 속도 연동</strong>
            JSON 기반 벡터 애니메이션을 배경에 적용하고,
            게임 진행에 따라 <code>animation.setSpeed()</code>로 재생 속도를 제어하여
            현재 속도 변화가 시각적으로 자연스럽게 반영되도록 구성했습니다.
        </li>

        <li>
            <strong class="d-block">키보드 접근성 및 포커스 제어</strong>
            Enter·Space 키 입력으로 선택이 가능하도록 이벤트를 분기 처리하고,
            동적 UI 변경 시 <code>tabindex</code>와 <code>aria-label</code> 속성을 함께 갱신해
            키보드 및 스크린리더 환경에서도 흐름이 유지되도록 구성했습니다.
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
        tags: ['html', 'css', 'js','jQuery'],
        title: '단원 도입 인터렉션 페이지',
        description: `<p>단원 도입 인터렉션 페이지 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item5: {
        type: 'iframe',
        iframeSrc: 'https://webdonghyeon.dothome.co.kr/portfolio/markup/_markup.html',
        tags: ['html', 'css', 'scss'],
        title: 'AIFD 웹사이트 퍼블리싱',
        description: `<p>AIFD 웹사이트 퍼블리싱 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item6: {
        type: 'iframe',
        iframeSrc: 'https://webdonghyeon.dothome.co.kr/humanmade/viewer.html',
        tags: ['html', 'css', 'js'],
        title: '가로세로 낱말 퀴즈 인터렉션',
        description: `<p>가로세로 낱말 퀴즈 인터렉션 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item7: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Humanmade',
        tags: ['html', 'css', 'js'],
        title: '휴먼메이드 퍼블리싱',
        description: `<p>휴먼메이드 퍼블리싱 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item8: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Liverpool+FC',
        tags: ['react', 'scss'],
        title: '리버풀 웹사이트 퍼블리싱',
        description: `<p>리버풀 웹사이트 퍼블리싱 프로젝트에 대한 상세 설명입니다.</p>`
    }
};
