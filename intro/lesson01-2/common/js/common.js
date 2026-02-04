
// 오디오 재생
var isPaused;


var correctSound = './common/media/answer.mp3';
var wrongSound = './common/media/wrong_answer.mp3';
var clickSound = './common/media/click.mp3';
var successSound = './common/media/cheers.mp3';

function playAudio(src){
    audioStop();
	$('#audio')[0].pause();
	$('#audio').find('source').attr('src', src);
	$('#audio')[0].load();
	$('#audio')[0].oncanplaythrough = $('#audio')[0].play();
}
//  멈춤
function audioStop(){
	$('audio').each(function(){
		this.pause();
		$(this).find('source').removeAttr('src');
		if (!isNaN(this.duration)) {
			this.currentTime = 0;
		}
        $(this).attr('loop',false) ;
	});
}
	
function videoStop(){
    $('.video-js').each(function(i){
        var videoid = $(this).attr('id'); 
        var player = videojs(videoid); 
        // console.log(videoid) ;
        player.pause();
        player.currentTime(0);
    }); 
}


function mediaStop(){
    audioStop() ;
    videoStop() ;
}


function actAudio(src , tg){
    playAudio(src) ;
    tg.addClass('active') ;
    $('#audio').off().on('play', function(){
        // console.log('play') ;
    }).on('timeupdate', function(){
        var currentTime = this.currentTime;
        // console.log(currentTime) ;
    }).on('pause', function(){
        // console.log('pause') ;
    }).on('ended', function(){
        // console.log('ended') ;
        tg.removeClass('active') ;
    });
}

$(function(){
	// 오디오
	$('body').append('<audio id="audio" controls class="position-absolute d-none"><source src="" type="audio/mpeg"></audio>');

    // 나레이션 오디오 재생 
    $('[data-audio]').on('click',function(){
        var src = $(this).data('audio') ;
        $('[data-audio]').removeClass('active') ;
        if ($(this).hasClass('active')) {
            audioStop();
        } else {
            actAudio(src , $(this)) ;
        }
    });

    /* 기능제거됨
    // 모달 오디오 재생 
    $('.modal').on('shown.bs.modal', function (e) {
        if ( $(this).find('[data-audio]').length ){
            var audiosrc = $(this).find('[data-audio]').data('audio'),
                nextact =  $(this).find('[data-audio]').data('audio-next') ;
            playAudio(audiosrc);
            if (nextact) {
                actAudio(nextact) ;
            }
        }
    }) ;
    */
    
    // 모달 비디오 
    $('.modal-vod').on('hidden.bs.modal', function (e) { 
        mediaStop();
    });

    $('.modal-vod').on('shown.bs.modal', function (e) {
        var videoid = $(this).find('video').attr('id') ;
        var player = videojs(videoid); 
        player.ready(function() { player.play() });
    });

    // class toggle
    $('[data-toggleclass]').on('click , keypress',function(e){
        e.preventDefault(); e.stopPropagation(); // keypress 시 click 중복방지
        // console.log(e.type)
        if(e.type=='click' || e.keyCode == 13){
            var togglecss = $(this).data('toggleclass');
            $(this).toggleClass(togglecss) ;

            //  케이스 처리
            switch (togglecss) {
                case 'muted':
                    // 사운드 토글 
                    var soundmute = true;
                    if ( $(this).hasClass('muted')) {
                        soundmute = true; 
                    } else {
                        soundmute = false; 
                    }
                    $('video, audio').each(function(){
                        this.muted = soundmute; 
                    });
                    break;
            
                default:
                    break;
            } 
        }
    });
    

    // main vod 자막등
    var textTracks = $('#mainVod .vjs-text-track-display') ;
    var mode = 'hidden' ;
    textTracks.hide() ;
    
    $('#vodModal .icon-vod').on('click',function(){
        $(this).toggleClass('on') ;
    });
    $('#vodModal .icon-vtt').on('click',function(){
        if (mode == "showing") {
            textTracks.hide() ;
            mode = 'hidden' ;
        } else {
            textTracks.show() ;
            mode = 'showing' ;
        }
    }) ;
    $('#vodModal .icon-script').on('click',function(){
        $('.vod-script').toggleClass('active') ;
    });

    $('.hd-btns .hd-close').on('click',function(){
        window.parent.close() ;
        window.close() ;
    });
    
});


function messageModal(msg){
    $('#messageModal .text-message').html("")
    $('#messageModal .text-message').append(msg) ;
    $('#messageModal').modal('show');
}