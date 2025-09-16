$(document).ready(function() {
    // --- Mobile 100vh fix ---
    const setRealVH = () => {
        // window.innerHeight를 사용하여 실제 뷰포트 높이를 계산하고 CSS 변수 --vh에 저장합니다.
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    window.addEventListener('resize', setRealVH);
    setRealVH(); // 페이지 로드 시 즉시 실행

    // ✅ 인트로 애니메이션 사용 여부 스위치 (true: 사용 / false: 사용 안 함)
    const useIntroAnimation = true;
    let pulseTimeline; // ✅ pulseTimeline을 더 넓은 범위에서 선언
    let ellipsisInterval = null;
    let textInterval = null;

    if (useIntroAnimation) {
        // --- Intro Animation Logic ---
        AOS.init();
        const introText = '.intro-txt';
        const cardWrap = '.card-section-wrap';
        const characterArea = '.character-area';
        const profile = '.profile';
        const moreButton = '.more';
        const connectBox = '.connect'; // ✅ .connect 선택자 추가

        // 1. 초기 상태 설정
        gsap.set(cardWrap, { opacity: 0, scale: 0.8 });
        gsap.set([characterArea, profile, moreButton, connectBox], { opacity: 0, y: 30 }); // ✅ .connect도 초기에 숨김
        gsap.set(introText, { opacity: 1 });

        new TypeIt(introText, {
            speed: 200,
            startDelay: 900,
            afterComplete: function (instance) {
                instance.destroy();
                gsap.to(introText, {
                    duration: 0.2,
                    opacity: 0,
                    ease: "power2.in",
                    delay: 1,
                    onComplete: () => {
                        // 2. GSAP 타임라인
                        const tl = gsap.timeline();
                        
                        tl.to(cardWrap, {
                            duration: 0.8,
                            opacity: 1,
                            scale: 1,
                            ease: "elastic.out(1, 0.5)",
                        })
                        .to(characterArea, {
                            duration: 0.5,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out"
                        }, "-=0.4")
                        .to(profile, { // ✅ 프로필만 먼저 나타나도록 수정
                            duration: 0.5,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        }, "-=0.3")
                        .to(connectBox, {
                            duration: 0.5,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out"
                        }, "-=0.2")
                        .to(moreButton, { // ✅ moreButton을 1초 뒤에 별도로 애니메이션
                            duration: 0.5,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        }, "+=1"); // 앞선 애니메이션 흐름이 끝나고 1초 뒤
                        
                        // More 버튼 애니메이션 타임라인 생성 및 할당
                        pulseTimeline = gsap.timeline({
                            delay: 1.5, // moreButton 등장(1초) + 기존 delay(0.5초)
                            repeat: -1,
                            repeatDelay: 2,
                            onStart: () => {
                                // 파티클 배경 나타나게 하기
                                document.getElementById('particles-js').style.opacity = '1';
                            }
                        })
                        .to(moreButton, { duration: 0.2, scale: 1.05, ease: "power1.inOut" })
                        .to(moreButton, { duration: 0.2, scale: 1, ease: "power1.inOut" })
                        .to(moreButton, { duration: 0.2, scale: 1.05, ease: "power1.inOut" }, "-=0.1")
                        .to(moreButton, { duration: 0.2, scale: 1, ease: "power1.inOut" });
                    }
                });
            }
        })
        .type("안녕하세요,", { speed: 1500 })
        .pause(500)
        .type(" 김동현입니다.", { speed: 1000 })
        .go();
    } else {
        gsap.set('.card-section-wrap', { opacity: 1, scale: 1 });
    }

    // --- Video Hover Logic ---
    const $video = $('.character video');
    const video = $video[0];
    const $posterImage = $('.character-poster');
    let videoRevealed = false;
    const $moreButton = $('.more');
    let animationFrameId;
    let lastTime;
    video.playbackRate = 2.0;

    const playForward = () => {
        if (!videoRevealed) {
            $posterImage.css('opacity', 0);
            $video.css('opacity', 1);
            videoRevealed = true;
        }
        if (!video.paused) return;
        cancelAnimationFrame(animationFrameId);
        video.playbackRate = 2.0;
        video.play();
    };

    const reverseStep = (timestamp) => {
        const elapsed = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        video.currentTime -= video.playbackRate * elapsed;
        if (video.currentTime <= 0) {
            cancelAnimationFrame(animationFrameId);
            video.currentTime = 0;
            video.pause();
            return;
        }
        animationFrameId = requestAnimationFrame(reverseStep);
    };

    const playReverse = () => {
        cancelAnimationFrame(animationFrameId);
        video.pause();
        if (video.currentTime >= video.duration) {
            video.currentTime = video.duration - 0.01;
        }
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(reverseStep);
    };

    // iOS 비디오 초기 프레임 표시 문제 해결을 위한 함수
    const setInitialFrame = () => {
        // iOS Safari가 포스터/첫 프레임을 렌더링하도록 강제하는 트릭입니다.
        // 비디오 시간을 0으로 설정하고, 브라우저가 해당 프레임으로 성공적으로 이동('seeked')하면
        // 그 때 비디오를 일시정지시켜 첫 프레임이 화면에 그려지도록 합니다.
        const forceRender = () => {
            video.pause();
            video.removeEventListener('seeked', forceRender);
        };
        video.addEventListener('seeked', forceRender);
        video.currentTime = 0;
    };

    // 비디오 메타데이터가 이미 로드되었는지 확인하고, 그렇지 않다면 이벤트 리스너를 추가합니다.
    // readyState 1 (HAVE_METADATA)는 비디오의 메타데이터(크기, 길이 등)가 로드되었음을 의미합니다.
    if (video.readyState >= 1) {
        setInitialFrame();
    } else {
        video.addEventListener('loadedmetadata', setInitialFrame);
    }

    // --- Click Logic ---
    $moreButton.on('click', function(e) {
        e.preventDefault();
        $moreButton.off('mouseenter mouseleave');
        if (pulseTimeline) {
            pulseTimeline.kill(); // 반복 애니메이션 완전 제거
        }
        // 클릭 시 호버 효과가 남아있지 않도록 원래 스타일로 즉시 복구
        gsap.set($moreButton, { scale: 1, backgroundColor: '#000000' });

        // 진행중인 텍스트 애니메이션 정지
        if (textInterval) clearInterval(textInterval);
        if (ellipsisInterval) clearInterval(ellipsisInterval);

        // 스피너 막대 즉시 숨기기
        gsap.set('.spinner span', {
            display: 'none'
        });

        // 1. 체크 이미지 애니메이션
        gsap.to('.connect-img', {
            duration: 0.8,
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
                // 2. 0.5초 후 텍스트 변경
                setTimeout(() => {
                    const connectTextElement = $('.connect-text');
                    const oldSpans = connectTextElement.children();

                    gsap.to(oldSpans, {
                        duration: 0.3,
                        opacity: 0,
                        rotationX: -90,
                        stagger: 0.1,
                        onComplete: () => {
                            connectTextElement.text('연결 성공 !');
                            splitText(connectTextElement);
                            const newChars = connectTextElement.find('span');
                            gsap.set(newChars, { opacity: 0, rotationX: 90 });
                            gsap.to(newChars, {
                                duration: 0.3,
                                opacity: 1,
                                rotationX: 0,
                                stagger: 0.05,
                                onComplete: () => {
                                    // 3. 0.5초 후 카드 뒤집기
                                    setTimeout(() => {
                                        const cardSection = '.card-section';
                                        const tl = gsap.timeline({ onComplete: () => console.log("Animation Complete!") });
                                        tl.to(cardSection, {
                                            duration: 1.5,
                                            rotationY: 180,
                                            ease: "power4.inOut"
                                        }).to(cardSection, {
                                            duration: 1.2,
                                            width: "100vw",
                                            height: "100vh",
                                            borderRadius: 0,
                                            borderWidth: 0,
                                            ease: "power4.inOut"
                                        }, "-=1.0");
                                    }, 500); // 0.5초 딜레이
                                }
                            });
                        }
                    });
                }, 500); // 0.5초 딜레이
            }
        });
    });

    // --- Dynamic Text Animation ---
    const dynamicTexts = [
        '새로운 인연과',
        '일상의 순간과',
        '색다른 관점과',
        '멋진 동료들과',
        '가벼운 유머와',
        '솔직한 소통과',
        '의외의 발견과'];
    let textIndex = 0;
    const ellipsisSpan = $('.ellipsis');
    let ellipsisCount = 0;
    const dynamicTextSpan = $('.dynamic-text');


    function startTextAnimation() {
        if (ellipsisInterval) clearInterval(ellipsisInterval);
        if (textInterval) clearInterval(textInterval);
        ellipsisInterval = setInterval(() => {
            ellipsisCount = (ellipsisCount + 1) % 4;
            ellipsisSpan.text('.'.repeat(ellipsisCount || 1).padEnd(3, '\u00A0'));
        }, 2000);
        textInterval = setInterval(() => {
            textIndex = (textIndex + 1) % dynamicTexts.length;
            const newText = dynamicTexts[textIndex];
            const oldChars = dynamicTextSpan.find('span');
            const tl = gsap.timeline();
            tl.to(oldChars, {
                duration: 0.3,
                opacity: 0,
                rotationX: -90,
                stagger: 0.05,
                onComplete: () => {
                    dynamicTextSpan.text(newText);
                    splitText(dynamicTextSpan);
                    const newChars = dynamicTextSpan.find('span');
                    gsap.set(newChars, { opacity: 0, rotationX: 90 });
                    gsap.to(newChars, {
                        duration: 0.3,
                        opacity: 1,
                        rotationX: 0,
                        stagger: 0.05
                    });
                }
            });
        }, 5000);
    }

    function splitText(element) {
        const text = element.text();
        element.empty();
        for (let i = 0; i < text.length; i++) {
            const char = (text[i] === ' ') ? '&nbsp;' : text[i];
            element.append(`<span>${char}</span>`);
        }
    }

    splitText(dynamicTextSpan);
    startTextAnimation();

    // --- Final Hover Handlers ---
    $moreButton.on('mouseenter', () => {
        playForward();
        if (pulseTimeline) {
            pulseTimeline.pause();
            gsap.to($moreButton, {
                duration: 0.3,
                scale: 1.05,
                backgroundColor: '#1D64F1', // 호버 시 변경될 색상
                color: '#fff', // 호버 시 변경될 색상
                boxShadow: '0 0 0 3px #fff, 0 0 30px rgba(29,100,241,0.6)',
                ease: 'power2.out'
            });
        }
    });

    $moreButton.on('mouseleave', () => {
        playReverse();
        if (pulseTimeline) {
            gsap.to($moreButton, {
                duration: 0.3,
                scale: 1,
                backgroundColor: '#000000', // 원래 배경색
                boxShadow: '0 0 0 3px #fff',
                ease: 'power2.out',
                onComplete: () => {
                    pulseTimeline.resume();
                }
            });
        }
    });
});
