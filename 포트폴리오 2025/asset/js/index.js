$(document).ready(function() {
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
});
