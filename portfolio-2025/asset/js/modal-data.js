const portfolioData = {
    item1: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson01/E50_01002P01/index.html',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'JavaScript': 'tag-js' },
        title: '듣고! 달려! 스피드런',
        description: `
            <p>본 컨텐츠는 초등학생 교육 목적 인터랙션 웹페이지입니다.<br>
            기획 및 디자인, 이미지 자료는 클라이언트 측에서 제공되었으며, HTML, CSS, JavaScript를 활용해 마크업 및 인터렉션 구현을 담당하였습니다.</p>
            <p>주요 구현 내용은 다음과 같습니다.</p>
            <ul>
                <li>
                    <strong class="d-block">
                        캐릭터 선택 및 동적 생성:
                    </strong>
                    사용자가 남자 또는 여자 캐릭터를 선택하면, 해당 캐릭터의 DOM 요소를 clone() 메서드를 사용하여 복제하고 게임의 각 단계(플레이어, NPC, 엔딩 등)에 동적으로 배치했습니다. 이를 통해 코드
                    중복을 최소화하고 유지보수성을 높였습니다.
                </li>
                <li>
                    <strong class="d-block">
                        CSS 및 비디오를 활용한 애니메이션 최적화:
                    </strong>
                    배경 스크롤은 CSS 애니메이션 대신 video 태그를 사용하여 자연스러운 움직임을 구현했습니다. 또한, 캐릭터의 달리기 모션은 분리된 이미지들을 CSS의 transform과
                    animation으로 제어하여 JavaScript의 부담을 줄이고 렌더링 성능을 향상시켰습니다.
                </li>
                <li>
                    <strong class="d-block">
                        웹 접근성(Accessibility) 준수:
                    </strong>
                    모든 인터랙티브 요소에 role 속성과 aria-label을 명시하고, 이미지에는 alt 태그를 제공하는 등 웹 접근성 지침을 준수하여 스크린 리더 사용자도 원활하게 게임을 즐길 수 있도록
                    구현했습니다.
                </li>
            </ul>
        `
    },
    item2: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson01/E50_01002P04/index.html',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'JavaScript': 'tag-js' },
        title: '읽기 모험가 : 동굴편',
        description: ` 
        <p>본 컨텐츠는 초등학생 교육 목적 인터랙션 웹페이지입니다. 기획 및 디자인, 이미지 자료는 클라이언트 측에서 제공되었으며, HTML, CSS, JavaScript를 활용해 마크업 및 인터렉션 구현을 담당하였습니다.</p>
            <p>주요 구현 내용은 다음과 같습니다:</p>
            <ul>
                <li>
                * 캐릭터 선택 및 동적 생성: 사용자가 남자 또는 여자 캐릭터를 선택하면, 해당 캐릭터의 DOM 요소를 clone() 메서드를 사용하여 복제하고 게임의 각 단계(플레이어, NPC, 엔딩 등)에 동적으로 배치했습니다. 이를 통해 코드
                중복을 최소화하고 유지보수성을 높였습니다.
                </li>
                <li>정답/오답 로직에 따른 이벤트 동작 구현</li>
                <li>캐릭터 선택에 따라 cloneNode 메서드를 활용한 플레이어 및 NPC 동작 생성</li>
            </ul>
        `
    },
    item3: {
        type: 'iframe',
        iframeSrc: 'https://web.idigrow.com/donga_ele_eng_minigame/ele/5th_grade/contents/lesson10/E50_10002P04/index.html',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'JavaScript': 'tag-js' },
        title: '읽기모험가:설산편',
        description:  ` 
        <p>본 컨텐츠는 초등학생 교육 목적 인터랙션 웹페이지입니다. 기획 및 디자인, 이미지 자료는 클라이언트 측에서 제공되었으며, HTML, CSS, JavaScript를 활용해 마크업 및 인터렉션 구현을 담당하였습니다.</p>
            <p>주요 구현 내용은 다음과 같습니다:</p>
            <ul>
                <li>캐릭터의 러닝 모션 애니메이션 처리</li>
                <li>정답/오답 로직에 따른 이벤트 동작 구현</li>
                <li>캐릭터 선택에 따라 cloneNode 메서드를 활용한 플레이어 및 NPC 동작 생성</li>
            </ul>
        `
    },
    item4: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Interaction+Page',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'JavaScript': 'tag-js' },
        title: '단원 도입 인터렉션 페이지',
        description: `<p>단원 도입 인터렉션 페이지 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item5: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=AIFD+Publishing',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'Sass': 'tag-sass' },
        title: 'AIFD 웹사이트 퍼블리싱',
        description: `<p>AIFD 웹사이트 퍼블리싱 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item6: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Word+Quiz',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'JavaScript': 'tag-js' },
        title: '가로세로 낱말 퀴즈 인터렉션',
        description: `<p>가로세로 낱말 퀴즈 인터렉션 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item7: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Humanmade',
        tags: { 'HTML5': 'tag-html', 'CSS3': 'tag-css', 'JavaScript': 'tag-js' },
        title: '휴먼메이드 퍼블리싱',
        description: `<p>휴먼메이드 퍼블리싱 프로젝트에 대한 상세 설명입니다.</p>`
    },
    item8: {
        type: 'image',
        imgSrc: 'https://via.placeholder.com/800x600/e9e9e9/BDBDBD?text=Liverpool+FC',
        tags: { 'React': 'tag-react', 'Sass': 'tag-sass' },
        title: '리버풀 웹사이트 퍼블리싱',
        description: `<p>리버풀 웹사이트 퍼블리싱 프로젝트에 대한 상세 설명입니다.</p>`
    }
};
