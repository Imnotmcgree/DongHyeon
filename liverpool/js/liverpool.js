$(document).ready(function () {

   AOS.init({
            offset: 90,
            duration: 600,
            easing: 'ease-in-out',
            once: false, 
            mirror: true,
			});


     $('.hamburger_btn').click(function (event) {
        event.preventDefault();
        $(this).toggleClass('btn_active');
        $('nav').toggleClass('nav_active');
     });
    
    var mySwiper1 = new Swiper('.visual_wrap', {
       pagination: {
          el: ".visual_indi.swiper-pagination",
          clickable: true,
       },
       autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    });
   
   var mySwiper2 = new Swiper(".headeline_slider_wrap", {
      slidesPerView: "auto",
      spaceBetween: 23,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".next1.swiper-button-next",
        prevEl: ".prev1.swiper-button-prev",
      },
      
      
   });
   
   var mySwiper3 = new Swiper(".womens_slider_wrap", {
       
      slidesPerView: "auto",
      spaceBetween: 23,

      autoplay: {
         delay: 2500,
         disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".next2.swiper-button-next",
        prevEl: ".prev2.swiper-button-prev",
      },

      
      
   });
    


})