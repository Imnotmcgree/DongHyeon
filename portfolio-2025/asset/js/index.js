$(document).ready(function() {
    // --- Mobile 100vh fix ---
    const setRealVH = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setRealVH();
    window.addEventListener('resize', setRealVH);

    const devSkipIntro = true;// ✅ 개발 모드 스위치
    let swiper = null;
    let aboutSwiper = null;
    let worksSwiper = null;
    let isSwiperActive = false;
    let afterIntro = false; // A flag to ensure layout management runs only after the intro animation.

    // --- Core Functions for Layout Management ---
    function updateActiveSlider(swiper, isInitial) {
        if (!swiper || swiper.destroyed) return;
        const navItems = document.querySelectorAll('.main-nav .nav-item');
        const slider = document.querySelector('.main-nav .active-background');
        const slideToNavIndexMapping = [0, 0, 1, 2];
        const activeNavIndex = slideToNavIndexMapping[swiper.activeIndex];
        const activeNavItem = navItems[activeNavIndex];
        if (activeNavItem && slider) {
            navItems.forEach(item => item.classList.remove('active'));
            activeNavItem.classList.add('active');
            gsap.to(slider, {
                duration: isInitial ? 0 : 0.4,
                x: activeNavItem.offsetLeft,
                width: activeNavItem.offsetWidth,
                ease: 'power3.inOut'
            });
        }
    }

    function setupCustomPagination(swiper, isInitial) {
        const navItems = document.querySelectorAll('.main-nav .nav-item');
        const slideIndexMapping = [0, 2, 3];
        navItems.forEach((item, navIndex) => {
            item.addEventListener('click', () => {
                if (swiper && !swiper.destroyed) {
                    swiper.slideTo(slideIndexMapping[navIndex]);
                }
            });
        });
        updateActiveSlider(swiper, isInitial);
    }

    let readyToLeaveWorks = false;
    let isWorkScrolling = false;
    let worksSectionElement = null;
    let worksWheelHandler = null;

    function playBoundaryFeedbackAnimation(direction) {
        const y_move = direction === 'down' ? -15 : 15;
        // Prevent animation overlap
        if (gsap.isTweening('.works-swiper')) return;
        gsap.fromTo(".works-swiper", 
            { y: 0 }, 
            { y: y_move, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" }
        );
    }

    function initWorksSwiper() {
        if (worksSwiper || window.innerWidth <= 1200) return;
        
        worksSwiper = new Swiper(".works-swiper", {
            direction: 'vertical',
            speed: 800,
            allowTouchMove: false,
        });

        worksSwiper.on('slideChange', function() {
            readyToLeaveWorks = false;
        });

        worksSectionElement = document.querySelector('[data-hash="works"]');
        
        worksWheelHandler = function (event) {
            event.preventDefault();

            if (isWorkScrolling) return;

            const isScrollingDown = event.deltaY > 0;

            if (worksSwiper.isEnd && isScrollingDown) {
                if (readyToLeaveWorks) {
                    swiper.mousewheel.enable();
                    swiper.slideNext();
                } else {
                    playBoundaryFeedbackAnimation('down');
                    readyToLeaveWorks = true;
                }
            } else if (worksSwiper.isBeginning && !isScrollingDown) {
                if (readyToLeaveWorks) {
                    swiper.mousewheel.enable();
                    swiper.slidePrev();
                } else {
                    playBoundaryFeedbackAnimation('up');
                    readyToLeaveWorks = true;
                }
            } else {
                readyToLeaveWorks = false;
                isWorkScrolling = true;
                if (isScrollingDown) {
                    worksSwiper.slideNext();
                } else {
                    worksSwiper.slidePrev();
                }
                setTimeout(() => {
                    isWorkScrolling = false;
                }, worksSwiper.params.speed + 50);
            }
        };
        
        worksSectionElement.addEventListener('wheel', worksWheelHandler, { passive: false });
    }

    function destroyWorksSwiper() {
        if (worksSectionElement && worksWheelHandler) {
            worksSectionElement.removeEventListener('wheel', worksWheelHandler);
            worksSectionElement = null;
            worksWheelHandler = null;
        }
        if (worksSwiper) {
            worksSwiper.destroy(true, true);
            worksSwiper = null;
        }
    }

    function initSwiper() {
        if (isSwiperActive) return;
        swiper = new Swiper('.main-swiper', {
            direction: 'vertical',
            speed: 1000,
            mousewheel: true,
            keyboard: true,
            allowTouchMove: false,
            pagination: { el: '.swiper-pagination' },
            on: {
                init: (s) => {
                    s.slideTo(0, 0);
                    setupCustomPagination(s, true);
                    const cardBack = document.querySelector('.card-back');
                    if (cardBack) cardBack.classList.remove('card-back--values-bg');
                },
                slideChange: (s) => {
                    updateActiveSlider(s, false);
                    const worksSlideIndex = 2;

                    if (s.activeIndex === worksSlideIndex) {
                        swiper.mousewheel.disable();
                    } else {
                        swiper.mousewheel.enable();
                    }

                    const cardBack = document.querySelector('.card-back');
                    if (cardBack) {
                        cardBack.classList.toggle('card-back--values-bg', s.activeIndex === 1);
                    }
                }
            }
        });
        isSwiperActive = true;
    }

    function destroySwiper() {
        if (!isSwiperActive) return;
        swiper.destroy(true, true);
        swiper = null;
        isSwiperActive = false;
    }

    function manageLayout() {
        if (!afterIntro) return; // Only run after the intro sequence is complete.
        const isMobileView = window.innerWidth <= 1200;
        if (isMobileView) {
            destroySwiper();
            destroyWorksSwiper();
            document.body.classList.add('mobile-scroll-view');
            const cardBack = document.querySelector('.card-back');
            if (cardBack) cardBack.classList.remove('card-back--values-bg');
        } else {
            initSwiper();
            initWorksSwiper();
            document.body.classList.remove('mobile-scroll-view');
        }
    }

    function initAboutSwiperObserver() {
        const aboutSection = document.querySelector('[data-hash="about"] .about-swiper');
        if (!aboutSection) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !aboutSwiper) {
                    initAboutSwiper();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(aboutSection);
    }

    function initAboutSwiper() {
        if (aboutSwiper) return;

        const textContents = [
            {
                title: "신뢰",
                description: "기본을 지키고, 맡은 일에 책임을 다하여 <br> 신뢰받는 사람이 되고 싶습니다."
            },
            {
                title: "긍정",
                description: "긍정적인 마음으로 즐겁게 일하는 과정 속에서 <br> 가장 좋은 결과물이 나온다고 믿습니다."
            },
            {
                title: "성장",
                description: "작은 배움들이 모여 결국 <br> 큰 성장을 이룬다고 믿습니다."
            },
            {
                title: "소통",
                description: "동료들과 유연하게 소통하며 <br> 함께 최고의 결과를 만들고 싶습니다."
            }
        ];
    
        const textContainer = document.querySelector('.about-text-content');
        const textWrapper = textContainer.querySelector('.about-texts');
        const titleEl = textWrapper.querySelector('h3');
        const descEl = textWrapper.querySelector('p');
    
        const updateTextContent = (swiper) => {
            const content = textContents[swiper.realIndex];
            if (content) {
                gsap.to(textWrapper, {
                    duration: 0.2,
                    opacity: 0,
                    onComplete: () => {
                        titleEl.innerHTML = content.title;
                        descEl.innerHTML = content.description;
                        gsap.to(textWrapper, { duration: 0.3, opacity: 1 });
                    }
                });
            }
        };

        const animateActiveImage = (swiper) => {
            // Deactivate animations on all images first
            swiper.slides.forEach(slide => {
                const img = slide.querySelector('.about-slide-content-img img');
                if (img) {
                    gsap.set(img, { clearProps: "all" }); // Reset any inline styles from previous animations
                }
            });

            // Animate just the active one
            const activeSlide = swiper.slides[swiper.activeIndex];
            const activeImage = activeSlide.querySelector('.about-slide-content-img img');
            if (activeImage) {
                gsap.fromTo(activeImage, 
                    { scale: 0.5, opacity: 0 }, 
                    {
                        duration: 1.2,
                        scale: 1,
                        opacity: 1,
                        ease: 'elastic.out(1, 0.75)'
                    }
                );
            }
        };
    
        aboutSwiper = new Swiper(".about-swiper", {
            loop: true,
            centeredSlides: true,
            initialSlide: 0,
            navigation: {
                nextEl: ".about-text-content .swiper-button-next",
                prevEl: ".about-text-content .swiper-button-prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            on: {
                init: function(swiper) {
                    setTimeout(() => {
                        animateActiveImage(swiper);
                        updateTextContent(swiper);
                    }, 300);
                },
                slideChangeTransitionStart: function (swiper) {
                    animateActiveImage(swiper);
                    updateTextContent(swiper);
                }
            }
        });
    }

    // --- Unified Resize Handler ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            manageLayout();
            if (isSwiperActive) {
                updateActiveSlider(swiper, true);
            }
        }, 150);
    });

    // --- Intro / Dev Mode Logic ---
    if (!devSkipIntro) {
        let pulseTimeline;
        let ellipsisInterval = null;
        let textInterval = null;

        AOS.init();
        const introText = '.intro-txt';
        const cardWrap = '.card-section-wrap';
        const characterArea = '.character-area';
        const profile = '.profile';
        const $moreButton = $('.more');
        const connectBox = '.connect';

        gsap.set(cardWrap, { opacity: 0, scale: 0.8 });
        gsap.set([characterArea, profile, $moreButton, connectBox], { opacity: 0, y: 30 });
        gsap.set(introText, { opacity: 1 });

        new TypeIt(introText, {
            speed: 200,
            startDelay: 900,
            afterComplete: function (instance) {
                instance.destroy();
                gsap.to(introText, {
                    duration: 0.2, opacity: 0, ease: "power2.in", delay: 1,
                    onComplete: () => {
                        const tl = gsap.timeline();
                        tl.to(cardWrap, { duration: 0.8, opacity: 1, scale: 1, ease: "elastic.out(1, 0.5)" })
                          .to(characterArea, { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }, "-=0.4")
                          .to(profile, { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }, "-=0.3")
                          .to(connectBox, { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }, "-=0.2")
                          .to($moreButton, { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }, "+=1");

                        pulseTimeline = gsap.timeline({ 
                            delay: 1.5, 
                            repeat: -1, 
                            repeatDelay: 2,
                            onStart: () => {
                                // 파티클 배경 나타나게 하기
                                document.getElementById('particles-js').style.opacity = '1';
                            }
                        })
                            .to($moreButton, { duration: 0.2, scale: 1.05, ease: "power1.inOut" })
                            .to($moreButton, { duration: 0.2, scale: 1, ease: "power1.inOut" })
                            .to($moreButton, { duration: 0.2, scale: 1.05, ease: "power1.inOut" }, "-=0.1")
                            .to($moreButton, { duration: 0.2, scale: 1, ease: "power1.inOut" });
                    }
                });
            }
        }).type("깃액션 연동 테스트 중.", { speed: 500 }).go();

        function splitText(element) {
            const text = element.text();
            element.empty();
            for (let i = 0; i < text.length; i++) {
                const char = (text[i] === ' ') ? '&nbsp;' : text[i];
                element.append(`<span>${char}</span>`);
            }
        }

        const dynamicTextSpan = $('.dynamic-text');
        splitText(dynamicTextSpan);

        const dynamicTexts = ['새로운 인연과', '멋진 동료들과', '새로운 경험과', '다가올 기회와'];
        let textIndex = 0;
        const ellipsisSpan = $('.ellipsis');
        let ellipsisCount = 0;
        
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
                    duration: 0.3, opacity: 0, rotationX: -90, stagger: 0.05,
                    onComplete: () => {
                        dynamicTextSpan.text(newText);
                        splitText(dynamicTextSpan);
                        const newChars = dynamicTextSpan.find('span');
                        gsap.set(newChars, { opacity: 0, rotationX: 90 });
                        gsap.to(newChars, { duration: 0.3, opacity: 1, rotationX: 0, stagger: 0.05 });
                    }
                });
            }, 5000);
        }
        startTextAnimation();

        // --- Video Hover Logic ---
        const $video = $('.character video');
        const video = $video[0];
        let animationFrameId;
        let lastTime;
        video.playbackRate = 2.0;

        const playForward = () => {
            if (!video.paused) return;
            cancelAnimationFrame(animationFrameId);
            video.playbackRate = 2.0;
            video.play();
        };

        const reverseStep = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
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

        $moreButton.on('mouseenter', () => {
            playForward();
            if (pulseTimeline) {
                pulseTimeline.pause();
                gsap.set($moreButton, { clearProps: "transform" });
            }
        });

        $moreButton.on('mouseleave', () => {
            playReverse();
            if (pulseTimeline) {
                pulseTimeline.resume();
            }
        });

        // --- Click Logic ---
        $moreButton.on('click', function(e) {
            e.preventDefault();
            $moreButton.off('mouseenter mouseleave');
            if (pulseTimeline) pulseTimeline.kill();
            gsap.set($moreButton, { scale: 1, backgroundColor: '#000000' });

            if (textInterval) clearInterval(textInterval);
            if (ellipsisInterval) clearInterval(ellipsisInterval);
            gsap.set('.spinner span', { display: 'none' });

            // Particles
            const connectImg = document.querySelector('.connect-img');
            const rect = connectImg.getBoundingClientRect();
            const originX = (rect.left + rect.width / 2) / window.innerWidth;
            const originY = (rect.top + rect.height / 2 + 40) / window.innerHeight;
            confetti({ particleCount: 150, spread: 430, origin: { x: originX, y: originY }, colors: ['#00BA00', '#33C733', '#90EE90', '#FFFFFF'] });

            // Checkmark animation
            gsap.to('.connect-img', { 
                duration: 0.8, scale: 1, opacity: 1, ease: "elastic.out(1, 0.5)",
                onComplete: () => {
                    setTimeout(() => {
                        const connectTextElement = $('.connect-text');
                        const oldSpans = connectTextElement.children();
                        gsap.to(oldSpans, {
                            duration: 0.3, opacity: 0, rotationX: -90, stagger: 0.1,
                            onComplete: () => {
                                connectTextElement.text('연결 성공 !');
                                splitText(connectTextElement);
                                const newChars = connectTextElement.find('span');
                                gsap.set(newChars, { opacity: 0, rotationX: 90 });
                                gsap.to(newChars, {
                                    duration: 0.3, opacity: 1, rotationX: 0, stagger: 0.05,
                                    onComplete: () => {
                                        setTimeout(() => {
                                            const cardSection = '.card-section';
                                            const targetHeight = window.innerHeight;
                                            const tl = gsap.timeline({
                                                onComplete: () => {
                                                    $('.card-front').hide();
                                                    afterIntro = true;
                                                    manageLayout();
                                                    initAboutSwiperObserver();
                                                    const mainNavList = document.querySelector('.main-nav-list');
                                                    gsap.to(mainNavList, {
                                                        duration: 0.5, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)', delay: 0.3,
                                                        onStart: () => mainNavList.classList.remove('init')
                                                    });
                                                }
                                            });
                                            tl.to(cardSection, { duration: 1.5, rotationY: 180, ease: "expo.inOut" })
                                              .to(cardSection, { duration: 1.2, width: "100vw", height: targetHeight, borderRadius: 0, borderWidth: 0, ease: "expo.inOut" }, "-=0.8");
                                        }, 500);
                                    }
                                });
                            }
                        });
                    }, 500);
                }
            });
        });

    } else { // --- Dev Mode ---
        gsap.set('.intro-txt, .card-front', { display: 'none' });
        gsap.set('.card-section-wrap', { opacity: 1, scale: 1 });
        gsap.set('.card-section', {
            rotationY: 180,
            width: "100vw",
            height: 'calc(var(--vh, 1vh) * 100)',
            borderRadius: 0,
            borderWidth: 0,
        });

        afterIntro = true;
        manageLayout();
        initAboutSwiperObserver();

        const mainNavList = document.querySelector('.main-nav-list');
        gsap.set(mainNavList, { opacity: 1, scale: 1, y: 0 });
        mainNavList.classList.remove('init');
    }

    // --- Portfolio Modal Logic ---
    const portfolioModalEl = document.getElementById('portfolioModal');
    const portfolioModal = new bootstrap.Modal(portfolioModalEl);
    const workItems = document.querySelectorAll('.work-item');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    modalCloseBtn.addEventListener('click', () => {
        portfolioModal.hide();
    });

    workItems.forEach((item, index) => {
        const button = item.querySelector('.work-item-btn');
        const itemKey = `item${index + 1}`;
        
        button.addEventListener('click', () => {
            const data = portfolioData[itemKey];
            if (data) {
                // Get modal elements
                const mediaContainer = portfolioModalEl.querySelector('.modal-img-container');
                const modalTags = portfolioModalEl.querySelector('#modal-tags');
                const modalTitle = portfolioModalEl.querySelector('#portfolioModalLabel');
                const modalDesc = portfolioModalEl.querySelector('#modal-desc');

                // Always clear previous content
                mediaContainer.innerHTML = '';
                modalTags.innerHTML = '';

                // Populate based on type
                if (data.type === 'iframe') {
                    const iframe = document.createElement('iframe');
                    iframe.src = data.iframeSrc;
                    iframe.setAttribute('frameborder', '0');
                    mediaContainer.appendChild(iframe);
                } else if (data.type === 'iframe-tabs' && data.iframeTabs && data.iframeTabs.length) {
                    const wrap = document.createElement('div');
                    wrap.className = 'modal-iframe-tabs';
                    const view = document.createElement('div');
                    view.className = 'modal-iframe-tabs-view';
                    data.iframeTabs.forEach((tab, i) => {
                        const iframe = document.createElement('iframe');
                        iframe.src = tab.src;
                        iframe.setAttribute('frameborder', '0');
                        iframe.className = 'modal-iframe-tab-pane';
                        if (i > 0) iframe.classList.add('is-hidden');
                        view.appendChild(iframe);
                    });
                    const btns = document.createElement('div');
                    btns.className = 'modal-iframe-tab-btns';
                    data.iframeTabs.forEach((tab, i) => {
                        const btn = document.createElement('button');
                        btn.type = 'button';
                        btn.className = 'modal-iframe-tab-btn' + (i === 0 ? ' is-active' : '');
                        btn.textContent = tab.label;
                        btn.addEventListener('click', () => {
                            view.querySelectorAll('.modal-iframe-tab-pane').forEach((p, j) => {
                                p.classList.toggle('is-hidden', j !== i);
                            });
                            btns.querySelectorAll('.modal-iframe-tab-btn').forEach((b, j) => b.classList.toggle('is-active', j === i));
                        });
                        btns.appendChild(btn);
                    });
                    wrap.appendChild(view);
                    wrap.appendChild(btns);
                    mediaContainer.appendChild(wrap);
                } else { // 'image' or default
                    const img = document.createElement('img');
                    img.src = data.imgSrc;
                    img.alt = `${data.title} project image`;
                    img.className = 'img-fluid';
                    mediaContainer.appendChild(img);
                }

                // Populate common info
                modalTitle.textContent = data.title;
                modalDesc.innerHTML = data.description;

                // tags: ['html', 'css', 'js'] → 자동으로 표시 텍스트 + 클래스 매핑
                const TAG_MAP = {
                    html: { text: 'HTML5', class: 'tag-html' },
                    css: { text: 'CSS3', class: 'tag-css' },
                    js: { text: 'JavaScript', class: 'tag-js' },
                    jquery: { text: 'jQuery', class: 'tag-jquery' },
                    scss: { text: 'Sass', class: 'tag-sass' },
                    sass: { text: 'Sass', class: 'tag-sass' },
                    react: { text: 'React', class: 'tag-react' },
                    vue: { text: 'Vue', class: 'tag-vue' }
                };
                const tagList = Array.isArray(data.tags) ? data.tags : Object.keys(data.tags || {});
                tagList.forEach((key) => {
                    const mapped = TAG_MAP[key.toLowerCase()];
                    const text = mapped ? mapped.text : key;
                    const className = mapped ? mapped.class : 'tag-' + key.toLowerCase();
                    const li = document.createElement('li');
                    const span = document.createElement('span');
                    span.className = className;
                    span.textContent = text;
                    li.appendChild(span);
                    modalTags.appendChild(li);
                });
                
                portfolioModal.show();
            }
        });
    });

    // Stop iframe content (videos, etc.) when modal is closed
    portfolioModalEl.addEventListener('hidden.bs.modal', function () {
        const mediaContainer = portfolioModalEl.querySelector('.modal-img-container');
        mediaContainer.innerHTML = ''; // Clear the container to stop iframe
    });

   
});
