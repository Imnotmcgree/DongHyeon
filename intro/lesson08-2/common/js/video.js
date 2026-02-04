var Button = videojs.getComponent('Button');

// 정지버튼
var stopButton = videojs.extend(Button, {
    constructor: function() {
        Button.apply(this, arguments);
        this.controlText('정지');
        this.addClass('vjs-stop-control');
    },
    handleClick: function() {
        this.player_.pause();
        this.player_.currentTime(0);
        //this.player_.posterImage.show();
        this.player_.hasStarted(false);
    }
});
videojs.registerComponent('stopButton', stopButton);

// 토글버튼
var ControlToggle  = videojs.extend(Button, {
    constructor: function() {
        Button.apply(this, arguments);
        this.controlText('숨기기');
        this.addClass('vjs-toggle-control');
        this.showing = false;
    },
    handleClick: function() {
        this.player_.toggleClass('vjs-toggle-inactive');
        (!this.showing) ? this.controlText('펼치기') : this.controlText('숨기기');
        this.showing = !this.showing;
    }
});
videojs.registerComponent('controlToggle', ControlToggle);

$(function(){
    $('.video-js').each(function(i){
        var t = $(this);
        t.attr('id','smart-video'+i);
        videojs(document.querySelector('#'+this.id),{
            controls: true,
            width: 1234,
            height: 694,
            controlBar: {
                volumePanel: {inline: false},
                children: [
                    'playToggle',
                    'stopButton',
                    'progressControl',
                    'volumeMenuButton',
                    'currentTimeDisplay',
                    'durationDisplay',
                    'volumePanel',
                    'fullscreenToggle',
                    'controlToggle',
                    'remainingTimeDisplay'
                ]
            }
        });
    });
});
