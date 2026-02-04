$(function(){

    $(document).on('keydown', ':focus', function(event) {
    if (event.key === "Enter") {
        $(this).click(); // 엔터 키가 눌렸을 때 포커싱된 요소를 클릭처럼 동작
    }
    });

    var textinterval = false;
    var timeoutclear = false;
    var QuizSound = './media/intro/Quiz.mp3';
    let currentStep = 0;
    let answeredCorrectly = false;

    const steps = ['step1', 'step2', 'step3', 'step4','step5'];
    const answers = ['make a snowman', 'make a snow angel', 'go ice fishing'];
    const positions = [
        { top: '479px', left: '358px' }, // step1 위치
        { top: '479px', left: '518px' }, // step2 위치
        { top: '780px', left: '1480px' }, // step3 위치
        { top: '280px', left: '1230px' },  // step4 위치
        { top: '479px', left: '358px' }  // step5 위치
    ];

    // 전역 Audio 객체 생성
    let audioPlayer = new Audio();

    function updatePosition() {
        $('.click-icon').css({ top: positions[currentStep].top, left: positions[currentStep].left });
    }

    $('.answers button').hover(
        function() {
            if (!$(this).hasClass('correct')) {
                var index = $(this).parent().index();
                $(this).find('img').attr('src', './img/intro/' + (index + 1) + '-hover.png');
            }
        },
        function() {
            if (!$(this).hasClass('correct')) {
                var index = $(this).parent().index();
                $(this).find('img').attr('src', './img/intro/' + (index + 1) + '-default.png');
            }
        }
    );

    $('.click-icon').click(function() {
        if (currentStep < steps.length) {
            $('#stage1').addClass(steps[currentStep]);
            $('.btn-area').fadeIn(1000);
            if(steps.includes($('#stage1').attr('class').split(' ').pop())) {
                $(this).hide();
            }
            updatePosition();
        }
        console.log(currentStep)
        if (currentStep == 0){
            $('.stage1-motion').addClass('active');
            $('.snowman').hide();
            $('.answers').hide();
            // $('.answer').hide();
            $('.audio-btn').addClass('active');
            // $('.answer-text').contents().filter(function() {
            //     return this.nodeType === 3;
            // }).first().replaceWith('I want to have a snowball fight');
            // $('.stage1-motion').addClass('active');

            playAudio('./media/1.mp3');
        }
    });

    $(".answers button").click(function () {
        $('.next-btn').removeClass('active');
        let selectedAnswer = $(this).data("answer");

        if (selectedAnswer === currentStep) {
            // 정답시
            $('.answer').text(answers[currentStep - 1]);
            answeredCorrectly = true;
            $('.answer').removeClass('wrong');
            $('.answer').addClass('correct');
            $(this).addClass('correct')
            var index = $(this).parent().index();
            $(this).find('img').attr('src', './img/intro/' + (index + 1) + '-disable.png');
            $('.audio-btn').addClass('active');

            playAudio('./common/media/answer.mp3');
        } else {
                // 오답시
                $('.audio-btn').removeClass('active');
                playAudio('../common/media/wrong_answer.mp3');
                $('.btn-area').one('animationend', function() {
                    $('.btn-area').css({animation: ''}); // 애니메이션 초기화
                });
                $('.answer').removeClass('correct');

                $('.answer').removeClass('correct').addClass('wrong');
                
                $('.answers').css('animation', 'none'); // 애니메이션 초기화
                setTimeout(() => {
                    $('.answers').css('animation', 'nope .3s'); // 다시 애니메이션 적용
                }, 10);

                answeredCorrectly = false; // 오답을 눌렀을 때 정답 여부를 초기화

                playAudio('./common/media/wrong_answer.mp3');
        }

        if($(this).hasClass('correct')) {
            $('.answers').css('pointer-events', 'none');
        }
    });

    $('.answer-text').click(function(){
        if(currentStep === 0){
            $('.answer').text('have a snowball fight')
        }
        if ($(this).find('.audio-btn').hasClass('active')) {
            $(this).css({cursor: 'pointer'});
            $(this).addClass('active');

            var audioFiles = [
                './media/16_lee_8-1.mp3',
                './media/16_lee_8-2.mp3',
                './media/16_lee_8-3.mp3',
                './media/16_lee_8-4.mp3',
            ];

            // 현재 클릭된 요소를 저장
            var $currentElement = $(this);

            // 이전 이벤트 리스너 제거
            audioPlayer.removeEventListener('ended', null);

            // 새로운 오디오 소스 설정 및 재생
            audioPlayer.src = audioFiles[currentStep];
            audioPlayer.play();

            // 오디오 재생 완료 시 active 클래스 제거 및 .next-btn에 active 클래스 활성화
            audioPlayer.addEventListener('ended', function() {
                $currentElement.removeClass('active');
                $('.next-btn').addClass('active');
            });

            // .audio-btn의 애니메이션 제거
            $(this).find('.audio-btn').css('animation', 'none');
        }
    });

    // $(".answer-text").hover(function(){
    //     if ($(this).find('.audio-btn').hasClass('active')) {
    //         $(this).css("color", "red");
    //     }
    // }, function(){
    //     if ($(this).find('.audio-btn').hasClass('active')) {
    //         $(this).css("color", "");
    //     }
    // });


    $('.retry-btn button').click(function () {
        // $('.audio-btn').removeClass('active');
        $('.click-icon').show();
        $('#stage1').removeClass(steps.join(' '));
        $('.btn-area').fadeOut(500);


        // answeredCorrectly = false;
        // $('.answer').text('');
        // $('.answer').removeClass('correct');
        // $('.answer').removeClass('wrong');
        // $('.answers button').removeClass('correct');
        // $('.answers button img').each(function() {
        //     var index = $(this).parent().parent().index();
        //     $(this).attr('src', './img/intro/' + (index + 1) + '-default.png');
        // });
        updatePosition();
    });

    $('.next-btn button').click(function () {
        $('.next-btn').removeClass('active');
        $('.answers').css('pointer-events', 'auto');
        $('.audio-btn').removeClass('active');
        $('.answers li button').removeClass('correct');
        $('.answers li button img').each(function() {
            var index = $(this).parent().parent().index();
            $(this).attr('src', './img/intro/' + (index + 1) + '-default.png');
        });
        if (currentStep === 0 || (answeredCorrectly && currentStep < steps.length)) {
            $('#stage1').removeClass(steps[currentStep]).addClass(steps[currentStep + 1]);
            $('.answer').text('');
            currentStep++;
            answeredCorrectly = false;
            $('.answers').show();
            $('.answer').show();
            $('.answer-text').contents().filter(function() {
                return this.nodeType === 3;
            }).first().replaceWith('I want to');

            // .audio-btn의 css 효과를 원래대로 돌려줌
            $('.audio-btn').css('animation', '');
        }
        else if (!answeredCorrectly) {
            playAudio('../common/media/wrong_answer.mp3');
            // 애니메이션이 끝난 후 원래 상태로 돌아가도록 설정
            $('.answer').removeClass('correct').addClass('wrong');
            $('.answer').css('animation', 'none'); // 애니메이션 초기화
            setTimeout(() => {
                $('.answer').css('animation', 'nope .3s'); // 다시 애니메이션 적용
            }, 10);
        }

        for (let i = 0; i <= 3; i++) {
            if (currentStep === i) {
                if (i === 0 || i === 1) {
                    $('.stage1-motion').addClass('active');
                } else if (i === 2) {
                    $('.stage3-motion').addClass('active');
                } else if (i === 3) {
                    $('.stage2-motion').addClass('active');
                }
            } else {
                if (i === 0 || i === 1) {
                    $('.stage1-motion').removeClass('active');
                } else if (i === 2) {
                    $('.stage3-motion').removeClass('active');
                } else if (i === 3) {
                    $('.stage2-motion').removeClass('active');
                }
            }
        }

        if(currentStep === 1){
            $('.snowman').show();
            $('.snowballfight').hide();
        }

        if(currentStep === 2){
            $('.snowman').show();
            $('.snowballfight').show();
            playAudio('./media/2.mp3');
        }

        if(currentStep === 3){
            playAudio('./media/3.mp3');
        }

        if($('#stage1').hasClass('step5')){
            setTimeout(function() {
                $('#finalModal').modal('show');
            }, 1000); // 약간의 딜레이 후 모달 표시
            console.log('끝끝끝')
            $('.btn-area').fadeOut();
            $('.btn-reset').fadeIn();
        }

        updatePosition();
        console.log(currentStep);
    });

    $('.click-icon').click(function() {
        updatePosition();
    });

    updatePosition();



    var intro = {
        init: function(){
            mediaStop();
            textinterval = false;
            timeoutclear = false;
            $('#ct>div').find('.active').removeClass('active');
            $('#ct>div').find('.finish').removeClass('finish');
            $('#ct').find('input, button').attr('tabindex','-1');
            $('input[type=text]').val('');
            $('.modal').modal('hide');
        },
        start: function(){
            intro.init();
            $('#ct').attr('data-step' , 'start');
            $('#ct>div#start').addClass('active');
            setTimeout(() => {
				$("#stage1").removeClass("first-count");
                $('#startModal').modal('show');
            }, 1000);
        },
        stage1: function(){
            playAudio('./media/bg.mp3');
            $('#startModal').modal('hide');
            timeoutclear = true;
            if (timeoutclear) {
                $('#stage1').addClass('active');
                $('.click-icon').delay(600).fadeIn();
            }
        },
    };

    intro.start();

    // stage 전환 active
    $('[data-active]').on('click' , function(){
        var stage = $(this).attr('data-active'),
            hint = "#hint1" ,
            nextStage = $('#'+stage).next('div').attr('id');
        $('#messageModal .text-message').text('');

        switch (stage) {
            case 'start':
                intro.start();
                break;

            case 'stage1':
                intro.stage1();
                break;
        }

        $('#ct').attr('data-step' , stage);
        $('#ct>#'+stage).addClass('active').siblings().removeClass('active');
    });

    $('[data-input]').on('click , keypress' , function(e){
        e.preventDefault(); e.stopPropagation(); // keypress 시 click 중복방지
        // console.log(e.type)
        var tg = $(this).data('input') ,
            inputval = $(this).data('value');
        $(tg).val(inputval);

        playAudio(clickSound);
    });

    // 리셋버튼튼

    $('.btn-reset').on('click', function() {
        console.log('reset 활성화');

        currentStep = 0; // 단계 초기화

        intro.start();
        $('#stage1').removeClass('step5')

        $('.answers button img').each(function() {
            var index = $(this).parent().parent().index();
            $(this).attr('src', './img/intro/' + (index + 1) + '-default.png');
        });

        $('.tab-pane').removeClass('active')
        $('.nav-link').removeClass('active')

        $('.answers li button').removeClass('correct');
        $(this).hide();
    });


    // 눈 효과
    let snowflakeCount = 20; // 눈송이 개수
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    let $snowContainer = $("#snow-container"); // 부모 요소 선택
    let snowflakes = [];

    function createSnowflake() {
        let size = Math.random() * 20 + 10;
        let startPosX = Math.random() * windowWidth;
        let duration = Math.random() * 5 + 3;
        let opacity = Math.random();

        let $snowflake = $('<div class="snowflake">❄</div>').css({
            left: startPosX + 'px',
            fontSize: size + 'px',
            opacity: opacity
        });

        $snowContainer.append($snowflake); // 부모 요소에 추가
        snowflakes.push($snowflake);

        function animateSnowflake() {
            let endPosX = startPosX + (Math.random() * 100 - 50);
            $snowflake.animate(
                {
                    top: windowHeight + 'px',
                    left: endPosX + 'px'
                },
                duration * 1000,
                'linear',
                function () {
                    // 눈송이 위치 초기화 후 재사용
                    $snowflake.css({
                        top: '-10px',
                        left: Math.random() * windowWidth + 'px',
                        opacity: Math.random()
                    });
                    animateSnowflake();
                }
            );
        }

        animateSnowflake();
    }

    for (let i = 0; i < snowflakeCount; i++) {
        setTimeout(createSnowflake, Math.random() * 2000);
    }
});