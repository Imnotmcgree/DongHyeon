$(document).ready(function () {

    AOS.init({
    offset: 90,
    duration: 600,
    easing: 'ease-in-out',
    once: false, 
    mirror: false,
    });
    

    $('.hamburger_btn').click(function (event) {
    event.preventDefault();
    $(this).toggleClass('btn_active')
     })

    $('.hamburger_btn').click(function (event) {
    event.preventDefault();
    $('nav').toggleClass('nav_active')
    })

    
})