$(document).ready(function() {
    // --- Intro Animation Logic ---
    AOS.init();
    const introText = '.intro-txt';
    const cardWrap = '.card-section-wrap';
    gsap.set(cardWrap, { opacity: 0, scale: 0.8 });
    // Make the empty intro text element visible before typing starts
    gsap.set(introText, { opacity: 1 }); 

    new TypeIt(introText, {
        speed: 200, // Overall typing speed
        startDelay: 900,
        afterComplete: function (instance) {
            instance.destroy();
            // Hide intro text and show the card after 1 second
            gsap.to(introText, {
                duration: 0.2,
                opacity: 0,
                ease: "power2.in",
                delay: 1, // Add 1-second delay here
                onComplete: () => {
                     // "Pop" in the card section
                    gsap.to(cardWrap, {
                        duration: 0.8,
                        opacity: 1,
                        scale: 1,
                        ease: "elastic.out(1, 0.5)",
                        delay: 0.2
                    });
                }
            });
        }
    })
    .type("준비된 퍼블리셔,", { speed: 1500 })
    .pause(1000) // Pause for 700ms
    .type(" 김동현 입니다.", { speed: 1000 })
    .go();


    // --- Video Hover Logic (existing code) ---
    const $video = $('.character video');
    const video = $video[0];
    const $moreButton = $('.more');
    let animationFrameId;

    // 정방향 재생 속도 설정
    video.playbackRate = 2.0;

    const playForward = () => {
        // 실행 중인 역방향 애니메이션이 있다면 취소
        cancelAnimationFrame(animationFrameId);
        video.playbackRate = 2.0;
        video.play();
    };

    const reverseStep = () => {
        // 처음 지점에 도달했다면 정지
        if (video.currentTime <= 0) {
            cancelAnimationFrame(animationFrameId);
            video.currentTime = 0;
            video.pause();
            return;
        }
        // 시간을 뒤로 이동
        video.currentTime -= 0.04; // 더 부드럽고/빠른 역방향을 위해 조정
        // 애니메이션 계속 진행
        animationFrameId = requestAnimationFrame(reverseStep);
    };

    const playReverse = () => {
        // 정방향 재생을 중지하고 대기 중인 애니메이션 프레임 취소
        cancelAnimationFrame(animationFrameId);
        video.pause();
        // 역방향 애니메이션 루프 시작
        animationFrameId = requestAnimationFrame(reverseStep);
    };

    // 비디오 메타데이터가 로드되면 첫 번째 프레임으로 설정
    video.addEventListener('loadedmetadata', () => {
        video.currentTime = 0;
        video.pause();
    });

    $moreButton.on('mouseenter', playForward);
    $moreButton.on('mouseleave', playReverse);
    
    // --- GSAP Flip and Expand Logic ---
    $moreButton.on('click', function(e) {
        e.preventDefault(); // prevent any default button behavior

        // Prevent hover effects from interfering with the animation
        $moreButton.off('mouseenter mouseleave');

        const cardSection = '.card-section';

        // Create a GSAP timeline
        const tl = gsap.timeline({
            onComplete: () => {
                // Animation is complete, you can now interact with the new layout
                console.log("Animation Complete!");
            }
        });

        tl.to(cardSection, {
            duration: 1.5,
            rotationY: 180,
            ease: "power4.inOut"
        })
        .to(cardSection, {
            duration: 1.2,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            borderWidth: 0,
            ease: "power4.inOut"
        }, "-=1.0"); // Overlap the start of this animation by 1.0s

    });
});
