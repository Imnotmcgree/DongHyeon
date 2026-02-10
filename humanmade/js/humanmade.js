$(document).ready(function () {
  
  $('.news_imgs > div > a').hover(function (event) {
    event.preventDefault();
    if ($(window).width() >= 1024) {
        $('.news_imgs > div:eq(0)').removeClass('news_active');
      $(this).parent().toggleClass('news_active',800);
    } else {
      $('.news_imgs > div > a').click(function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('news_active');
      });
    }
  });
  
  AOS.init({
    offset: 90,
    duration: 600,
    easing: 'ease-in-out',
    once: false, 
    mirror: true,

  });
  
  var swiper1 = new Swiper(".lookbook_right", {
      slidesPerView: "auto",
      centeredSlides: false,
      spaceBetween: 20,
      autoplay: {
      delay: 3000, // 슬라이드 전환 속도
      disableOnInteraction: true, // 호버시에 멈추는거
      },
      
  });

  var store_japan = new Swiper(".japan_slider", {
      spaceBetween: 100,
      pagination: {
        el: ".japan_indicator.swiper-pagination",
        clickable: true,
    },
      navigation: {
        nextEl: ".japan_slider > .swiper-button-next",
        prevEl: ".japan_slider > .swiper-button-prev",
    },
    });

  var store_korea = new Swiper(".korea_slider", {
      spaceBetween: 100,
      pagination: {
        el: ".korea_indicator.swiper-pagination",
        clickable: true,
    },
      navigation: {
        nextEl: ".korea_slider > .swiper-button-next",
        prevEl: ".korea_slider > .swiper-button-prev",
    },
  });
  
  var store_usa = new Swiper(".usa_slider", {
      spaceBetween: 100,
      pagination: {
        el: ".usa_indicator.swiper-pagination",
        clickable: true,
    },
      navigation: {
        nextEl: ".usa_slider > .swiper-button-next",
        prevEl: ".usa_slider > .swiper-button-prev",
    },
  });
  
  var store_uk = new Swiper(".uk_slider", {
      spaceBetween: 100,
      pagination: {
        el: ".uk_indicator.swiper-pagination",
        clickable: true,
    },
      navigation: {
        nextEl: ".uk_slider > .swiper-button-next",
        prevEl: ".uk_slider > .swiper-button-prev",
    },
  });
  
  var store_italy = new Swiper(".italy_slider", {
      spaceBetween: 100,
      pagination: {
        el: ".italy_indicator.swiper-pagination",
        clickable: true,
    },
      navigation: {
        nextEl: ".italy_slider > .swiper-button-next",
        prevEl: ".italy_slider > .swiper-button-prev",
    },
  });
  
  var store_uae = new Swiper(".uae_slider", {
      spaceBetween: 100,
      pagination: {
        el: ".uae_indicator.swiper-pagination",
        clickable: true,
    },
      navigation: {
        nextEl: ".uae_slider > .swiper-button-next",
        prevEl: ".uae_slider > .swiper-button-prev",
    },
    });


  $('.hamburger_btn').click(function (event) {
    event.preventDefault();
    $(this).toggleClass('btn_active')
  })

  $('.hamburger_btn').click(function (event) {
    event.preventDefault();
    $('nav').toggleClass('nav_active')
  })

  $('.news_imgs > div > a').click(function (event) {
    event.preventDefault();
    // $(this).parent().toggleClass('news_active')
  })


  $('.store_btn > div button').click(function (event) {
    event.preventDefault();
    $('.store_btn > div button').removeClass('btn_active');
    $(this).addClass('btn_active');
  })

  $('.store_btn button').click(function () {
    let slider_name = $(this).attr('data-slider')
    $('.'+slider_name).fadeIn().siblings('.swiper').hide();
  })

  $('.store_btn >div:eq(0)>button').click(function () {
    var btn_n = $(this).index()
    $('.store .swiper-pagination').hide()
    $('.store .swiper-pagination').eq(btn_n).show()
  })
 
  $('.store_btn >div:eq(1)>button').click(function () {
    var btn_n = $(this).index() + 3
    $('.store .swiper-pagination').hide()
    $('.store .swiper-pagination').eq(btn_n).show()
  })

  // ABOUT 메뉴만 #C0191F로 부드럽게 지속 점멸(펄스)
  ;(function () {
    if ($('#aboutPulseStyle').length === 0) {
      $('head').append([
        '<style id="aboutPulseStyle">',
        '@keyframes aboutPulse{0%,100%{color:#C0191F;opacity:1}50%{color:#C0191F;opacity:.25}}',
        'nav .nav_inner a.about-pulse{animation:aboutPulse 1.1s ease-in-out infinite}',
        '</style>'
      ].join(''))
    }

    $('nav .nav_inner a').filter(function () {
      return $.trim($(this).text()).toUpperCase() === 'ABOUT'
    }).addClass('about-pulse')
  })()

  

 



  
})