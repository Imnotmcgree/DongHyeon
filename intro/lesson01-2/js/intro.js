$(function(){

    $(document).on('keydown', ':focus', function(event) {
        if (event.key === "Enter") {
          $(this).click(); // 엔터 키가 눌렸을 때 포커싱된 요소를 클릭처럼 동작
        }
      });

    $(".modal").attr("inert", ""); // 모든 모달 기본적으로 inert 적용

    $(".modal").on("shown.bs.modal", function () {
        $(this).removeAttr("inert"); // 모달이 열리면 inert 제거
        $(this).removeAttr("aria-hidden"); // aria-hidden 강제 제거

        if ($(this).hasClass('modal-q')) {
            $('.sticker-popup .click-obj').removeAttr('inert'); // inert 속성 제거
        } 
    });

    $(".modal").on("hidden.bs.modal", function () {
        $(this).attr("inert", ""); // 모달이 닫히면 inert 다시 적용
        $(this).removeAttr("aria-hidden"); // aria-hidden 강제 제거
        setTimeout(() => {
            $("body").focus(); // 포커스를 body로 강제 이동
        }, 10);
        $('.sticker-popup .click-obj').attr('inert', ''); // inert 속성 추가
    });

    // $(".modal").on("shown.bs.modal", function () {
    //     if ($(this).hasClass('modal-q')) {
    //         $('.sticker-popup .click-obj').removeAttr('inert'); // inert 속성 제거
    //     } else {
    //         $('.sticker-popup .click-obj').attr('inert', ''); // inert 속성 추가
    //     }
    // });

    var textinterval = false;
    var timeoutclear = false;
    var timeID;
    var QuizSound = './media/intro/Quiz.mp3';
    var modalOrder = ["Modal1", "Modal2", "Modal3", "Modal4", "Modal5"]; // 모달 순서
    var currentModalIndex = 0; // 현재 모달 인덱스
    
    // 모달별 click-icon 위치 (각 모달마다 위치 다르게 설정)
    var clickIconPositions = {
        "Modal1": { top: 250, left: 690 },
        "Modal2": { top: 640, left: 780 },
        "Modal3": { top: 290, left: 1200 },
        "Modal4": { top: 650, left: 1280 },
        "Modal5": { top: 390, left: 1630 },
    };
    
    var correctStickers = {
        "Modal1": ".sticker-1",
        "Modal2": ".sticker-2",
        "Modal3": ".sticker-3",
        "Modal4": ".sticker-4",
        "Modal5": ".sticker-5"
    };


    $('.click-icon').click(function(e) {
        $('.click-obj').css('pointer-events', 'auto');
        var currentModal = modalOrder[currentModalIndex];
        if (currentModalIndex < modalOrder.length) {
            var nextModal = modalOrder[currentModalIndex];

            // 기존 모달 닫기 (중복 방지)
            $('.modal').modal('hide');

            // 클릭 아이콘 fadeOut 후 모달 열기
            $('.click-icon').fadeOut(300, function() {
                $('#' + nextModal).modal('show');
            });
        }

        // if($(this).hasClass('moved')) {
        //     $(this).css('pointer-events', 'none');
        // }
        
        $(this).hide(); // 클릭 아이콘 숨김
        // var audioFile = './media/' + (currentModalIndex + 1) + '.mp3';
        
        //팝업창이 열렸을때 효과음 재생 을 위한 것 
     if($(currentModal).modal('show')){
        timeID=setTimeout(()=>{
            console.log('오디오 나온다');
        
        var audioFile = './media/' + (currentModalIndex + 1) + '.mp3';
        playAudio(audioFile)
        },800)
     }
        




    });
    // 정답을 클릭했을 때만 currentModalIndex 증가 + 클릭 아이콘 이동
    $('.click-obj').click(function() {
        var currentModal = modalOrder[currentModalIndex]; // 현재 모달 가져오기
        var correctSticker = correctStickers[currentModal];



        if ($(this).hasClass(correctSticker.replace('.', ''))) {
            playAudio('../media/intro/answer.mp3');
            $(this).addClass('moved');

            var targetPos = $(this).data('target-pos');
            var targetSize = $(this).data('target-size');

            var animationProps = {
                top: targetPos.top,
                left: targetPos.left,
                opacity: 1
            };

            if (targetSize) {
                animationProps.width = targetSize.width + 'px';
                animationProps.height = targetSize.height + 'px';
            }

            // 정답 오디오 재생
            playAudio('./common/media/answer.mp3');

            $(this).animate(animationProps, 1000, function() {
                $('#' + currentModal).find('.text-message').addClass('active');
                $('.steps img').eq(currentModalIndex).addClass('active');

                // 정답을 맞혔을 때만 currentModalIndex 증가 + 클릭 아이콘 위치 변경
                currentModalIndex++;

                if (currentModalIndex < modalOrder.length) {
                    var nextModal = modalOrder[currentModalIndex];
                    var newPosition = clickIconPositions[nextModal];

                    $('.click-icon').css({ 
                        top: newPosition.top + "px", 
                        left: newPosition.left + "px" 
                    }).fadeIn(300);

                    if (nextModal === "Modal5") {
                        $('.click-icon').hide();
                    }
                }

                console.log(currentModalIndex);
            });

            setTimeout(function() {
                if($('.sticker-4').hasClass('moved')){
                    $('.sticker-4').children('.modal4-hand').addClass('on');
                }
            }, 1500);

        } else {
            // 오답 시
            $(this).css({animation: 'nope .3s'});
            playAudio('./common/media/wrong_answer.mp3');

            $(this).one('animationend', function() {
                $(this).css({animation: ''});
            });
        }
    });


 

// 오디오가 끝나면 , 빨간색 색자 변환 안되게 
$('.text-message').on('click',function(){
    $(this).children().addClass('red');
   $(audio).on('ended',function(){
    $('p.red').removeClass('red')
   })
})




    
    $('.modal-q .icon-close').click(function() {
        $('.click-obj').css('pointer-events','none');
        $('.click-icon').show();

        var currentModal = $(this).closest('.modal').attr('id');
        var correctSticker = correctStickers[currentModal];

        $('.click-obj.moved').hide();

        // 모바일에서 모달 닫으면 멈춤현상 발생 , 애니메이션 상태 초기화
        $('.img-wrap *').css('animation', 'none');
        setTimeout(function() {
            $('.img-wrap *').css('animation', '');
        }, 10);

        if ($('.steps img:last-child').hasClass('active')) {
            // $('.btn-reset').addClass('active');
            $('.click-icon').hide();
            
            $('.sticker-popup').removeClass('active');
            setTimeout(function() {
                $('#finalModal').modal('show');
            }, 1000); // 약간의 딜레이 후 모달 표시
        }
    });

    $('.text-message').click(function(){
        $(this).find('img').addClass('active')
    })


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
            clearTimeout(timeID)
        },
        start: function(){ 
            intro.init();
            $('#ct').attr('data-step' , 'start');
            $('#ct>div#start').addClass('active');
            setTimeout(() => {
                $('#startModal').modal('show');
            }, 1000);
        },
        stage1: function(){
            playAudio('./media/bg.mp3');
            $('#startModal').modal('hide');
            $('.sticker-popup').addClass('active')
            setTimeout(function() {
                $('.click-icon').fadeIn();
            }, 500);
            timeoutclear = true;
            if (timeoutclear) {
                $('#stage1').addClass('active');
                $('#stage1').fadeOut(400, function() {
                    $(this).css('background-image', 'url(./img/intro/bg1.jpg)').fadeIn(200);
                });
            }
        }
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
          
            default:
                break;
        }

    });
 
    $('[data-input]').on('click , keypress' , function(e){
        e.preventDefault(); e.stopPropagation(); // keypress 시 click 중복방지
        // console.log(e.type)
        var tg = $(this).data('input') ,
            inputval = $(this).data('value');
        $(tg).val(inputval);
        
        playAudio(clickSound);
    });

    $(document).on('click', '.btn-reset', function() {
        console.log('리셋버튼눌림');
    
        currentModalIndex = 0; // 단계 초기화

        $('#stage1').removeClass('active').css('background-image', 'url(./img/intro/bg.jpg)');
    
        // 초기 화면 다시 실행
        intro.start();
        
        // 스티커 위치 초기화
        $('.click-obj').css({ display: 'block' });
        $('.click-obj').removeClass('moved');
        $('.modal4-hand').removeClass('on');

        $('.sticker-1').css({ top: '469px', left: '72px', width: '85px', height: '85px' });
        $('.sticker-2').css({ top: '626px', left: '66px', width: '96px', height: '35px' });
        $('.sticker-3').css({ top: '207px', left: '89px', width: '54px', height: '91px' });
        $('.sticker-4').css({ top: '79px', left: '77px', width: '75px', height: '85px' });
        $('.sticker-5').css({ top: '344px', left: '75px', width: '80px', height: '73px' });

        $('.click-icon').css({ top: '250px', left: '690px' });

        // 모든 .modal-q .text-message 에 달려있는 active 클래스를 일괄 삭제
        $('.modal-q .text-message').removeClass('active');

        $('.click-icon').hide();

        $('.text-message').find('img').removeClass('active');
    });

    // vod 자막등
    // var videoElement = document.getElementById("mainVod");
    // var textTracks = videoElement.textTracks; 
    // var textTrack = textTracks[0]; 
    // textTrack.mode = 'hidden' ; //  hidden , showing

    // $('#vodModal .icon-vod').on('click',function(){
    //     $(this).toggleClass('on') ;
    // });
    // $('#vodModal .icon-vtt').on('click',function(){
    //     var mode = textTrack.mode 
    //     if (mode == "showing") {
    //         textTrack.mode = 'hidden' ;
    //         console.log(textTrack.mode)
    //     } else {
    //         textTrack.mode = 'showing' ;
    //         console.log(textTrack.mode)
    //     }
    // }) ;
    // $('#vodModal .icon-script').on('click',function(){
    //     $('.vod-script').toggleClass('active') ;
    // });

    // 비디오 관련 코드 수정
    var videoElement = document.getElementById("mainVod");
    if (videoElement && videoElement.textTracks) {
        var textTracks = videoElement.textTracks; 
        if (textTracks.length > 0) {
            var textTrack = textTracks[0]; 
            textTrack.mode = 'hidden';
        }
    }
    
    
    $('.hd-btns .hd-close').on('click',function(){
        window.parent.close() ;
        window.close() ;
      });

});