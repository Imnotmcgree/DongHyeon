$(document).ready(function() {
    // ========== 1. 모바일 화면 높이 보정 (100vh) ==========
    function setRealVH() {
        const vh = window.innerHeight * 0.01;
        $('html').css('--vh', vh + 'px');
    }
    setRealVH();
    $(window).on('resize', setRealVH);

    // ========== 공통 변수 ==========
    const devSkipIntro = true;  // true: 인트로 건너뛰기(개발용), false: 인트로 재생
    let swiper = null;
    let aboutSwiper = null;
    let worksSwiper = null;
    let isSwiperActive = false;
    let afterIntro = false;  // 인트로가 끝난 뒤에만 레이아웃 전환 실행

    // ========== 2. 메인 네비게이션 (슬라이드 ↔ 메뉴 동기화) ==========
    // 슬라이드 인덱스에 따라 어느 메뉴가 활성인지: [홈, 홈, 어바웃, 워크스]
    const SLIDE_TO_NAV = [0, 0, 1, 2];
    // 메뉴 클릭 시 이동할 슬라이드 인덱스: [홈, 어바웃, 워크스]
    const NAV_TO_SLIDE = [0, 2, 3];

    function updateActiveSlider(swiper, isInitial) {
        if (!swiper || swiper.destroyed) return;

        const $navItems = $('.main-nav .nav-item');
        const $slider = $('.main-nav .active-background');
        const navIndex = SLIDE_TO_NAV[swiper.activeIndex];
        const $activeItem = $navItems.eq(navIndex);

        if (!$activeItem.length || !$slider.length) return;

        $navItems.removeClass('active');
        $activeItem.addClass('active');

        const duration = isInitial ? 0 : 0.4;
        const el = $activeItem[0];
        gsap.to($slider[0], {
            duration: duration,
            x: el.offsetLeft,
            width: el.offsetWidth,
            ease: 'power3.inOut'
        });
    }

    function setupCustomPagination(swiper, isInitial) {
        $('.main-nav .nav-item').each(function (navIndex) {
            $(this).on('click', function () {
                if (swiper && !swiper.destroyed) {
                    swiper.slideTo(NAV_TO_SLIDE[navIndex]);
                }
            });
        });
        updateActiveSlider(swiper, isInitial);
    }

    // ========== 3. Works 섹션 (세로 스와이퍼 + 휠) ==========
    let readyToLeaveWorks = false;
    let isWorkScrolling = false;
    let worksSectionElement = null;
    let worksWheelHandler = null;

    // 워크스 맨 끝/맨 앞에서 한 번 더 휠 시 살짝 흔드는 효과
    function playBoundaryFeedbackAnimation(direction) {
        if (gsap.isTweening('.works-swiper')) return;
        const yMove = (direction === 'down') ? -15 : 15;
        gsap.fromTo('.works-swiper', { y: 0 }, { y: yMove, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    }

    function initWorksSwiper() {
        if (worksSwiper || window.innerWidth <= 1200) return;

        worksSwiper = new Swiper('.works-swiper', {
            direction: 'vertical',
            speed: 800,
            allowTouchMove: false
        });

        worksSwiper.on('slideChange', function () {
            readyToLeaveWorks = false;
        });

        worksSectionElement = $('[data-hash="works"]')[0];

        worksWheelHandler = function (event) {
            event.preventDefault();
            if (isWorkScrolling) return;

            const isDown = event.deltaY > 0;

            // 맨 아래에서 아래로 휠 → 다음 메인 슬라이드로 나가거나, 아니면 흔들기
            if (worksSwiper.isEnd && isDown) {
                if (readyToLeaveWorks) {
                    swiper.mousewheel.enable();
                    swiper.slideNext();
                } else {
                    playBoundaryFeedbackAnimation('down');
                    readyToLeaveWorks = true;
                }
                return;
            }

            // 맨 위에서 위로 휠 → 이전 메인 슬라이드로 나가거나, 아니면 흔들기
            if (worksSwiper.isBeginning && !isDown) {
                if (readyToLeaveWorks) {
                    swiper.mousewheel.enable();
                    swiper.slidePrev();
                } else {
                    playBoundaryFeedbackAnimation('up');
                    readyToLeaveWorks = true;
                }
                return;
            }

            // 그 외: 워크스 슬라이드만 이동
            readyToLeaveWorks = false;
            isWorkScrolling = true;
            if (isDown) {
                worksSwiper.slideNext();
            } else {
                worksSwiper.slidePrev();
            }
            setTimeout(function () {
                isWorkScrolling = false;
            }, worksSwiper.params.speed + 50);
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

    // ========== 4. 메인 세로 슬라이더 (홈 / 어바웃 / 워크스) ==========
    const WORKS_SLIDE_INDEX = 2;  // 메인 슬라이드에서 워크스가 몇 번째인지

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
                init: function (s) {
                    s.slideTo(0, 0);
                    setupCustomPagination(s, true);
                    $('.card-back').removeClass('card-back--values-bg');
                },
                slideChange: function (s) {
                    updateActiveSlider(s, false);

                    if (s.activeIndex === WORKS_SLIDE_INDEX) {
                        swiper.mousewheel.disable();
                    } else {
                        swiper.mousewheel.enable();
                    }

                    const isValuesSlide = (s.activeIndex === 1);
                    $('.card-back').toggleClass('card-back--values-bg', isValuesSlide);
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

    // ========== 5. 화면 크기에 따른 레이아웃 (모바일 ↔ 데스크톱) ==========
    function manageLayout() {
        if (!afterIntro) return;

        const isMobile = (window.innerWidth <= 1200);

        if (isMobile) {
            destroySwiper();
            destroyWorksSwiper();
            $('body').addClass('mobile-scroll-view');
            $('.card-back').removeClass('card-back--values-bg');
        } else {
            initSwiper();
            initWorksSwiper();
            $('body').removeClass('mobile-scroll-view');
        }
    }

    // ========== 6. About 섹션 (화면에 보일 때만 스와이퍼 생성) ==========
    function initAboutSwiperObserver() {
        const $aboutSection = $('[data-hash="about"] .about-swiper');
        if (!$aboutSection.length) return;

        const observer = new IntersectionObserver(function (entries, obs) {
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (entry.isIntersecting && !aboutSwiper) {
                    initAboutSwiper();
                    obs.unobserve(entry.target);
                    break;
                }
            }
        }, { threshold: 0.1 });

        observer.observe($aboutSection[0]);
    }

    function initAboutSwiper() {
        if (aboutSwiper) return;

        // 슬라이드 순서: 신뢰, 긍정, 성장, 소통
        const aboutTexts = [
            { title: '신뢰', description: '기본을 지키고, 맡은 일에 책임을 다하여 <br> 신뢰받는 사람이 되고 싶습니다.' },
            { title: '긍정', description: '긍정적인 마음으로 즐겁게 일하는 과정 속에서 <br> 가장 좋은 결과물이 나온다고 믿습니다.' },
            { title: '성장', description: '작은 배움들이 모여 결국 <br> 큰 성장을 이룬다고 믿습니다.' },
            { title: '소통', description: '동료들과 유연하게 소통하며 <br> 함께 최고의 결과를 만들고 싶습니다.' }
        ];

        const $textWrapper = $('.about-text-content .about-texts');
        const $titleEl = $textWrapper.find('h3');
        const $descEl = $textWrapper.find('p');

        function updateTextContent(s) {
            const content = aboutTexts[s.realIndex];
            if (!content) return;
            gsap.to($textWrapper[0], { duration: 0.2, opacity: 0, onComplete: function () {
                $titleEl.html(content.title);
                $descEl.html(content.description);
                gsap.to($textWrapper[0], { duration: 0.3, opacity: 1 });
            }});
        }

        function animateActiveImage(s) {
            const slides = s.slides;
            for (let i = 0; i < slides.length; i++) {
                const img = slides[i].querySelector('.about-slide-content-img img');
                if (img) gsap.set(img, { clearProps: 'all' });
            }
            const activeSlide = slides[s.activeIndex];
            const activeImg = activeSlide.querySelector('.about-slide-content-img img');
            if (activeImg) {
                gsap.fromTo(activeImg, { scale: 0.5, opacity: 0 }, { duration: 1.2, scale: 1, opacity: 1, ease: 'elastic.out(1, 0.75)' });
            }
        }

        aboutSwiper = new Swiper('.about-swiper', {
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
                init: function (s) {
                    setTimeout(function () {
                        animateActiveImage(s);
                        updateTextContent(s);
                    }, 300);
                },
                slideChangeTransitionStart: function (s) {
                    animateActiveImage(s);
                    updateTextContent(s);
                }
            }
        });
    }

    // ========== 7. 리사이즈 시 레이아웃 다시 계산 ==========
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            manageLayout();
            if (isSwiperActive) {
                updateActiveSlider(swiper, true);
            }
        }, 150);
    });

    // ========== 8. 인트로 (타이핑 → 카드 등장 → 더보기 클릭 시 메인 전환) ==========
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
                gsap.to(introText, { duration: 0.2, opacity: 0, ease: 'power2.in', delay: 1, onComplete: function () {
                    const tl = gsap.timeline();
                    tl.to(cardWrap, { duration: 0.8, opacity: 1, scale: 1, ease: 'elastic.out(1, 0.5)' })
                      .to(characterArea, { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.4')
                      .to(profile, { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.3')
                      .to(connectBox, { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.2')
                      .to($moreButton, { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }, '+=1');

                    pulseTimeline = gsap.timeline({ delay: 1.5, repeat: -1, repeatDelay: 2, onStart: function () {
                        $('#particles-js').css('opacity', '1');
                    }});
                    pulseTimeline.to($moreButton, { duration: 0.2, scale: 1.05, ease: 'power1.inOut' })
                        .to($moreButton, { duration: 0.2, scale: 1, ease: 'power1.inOut' })
                        .to($moreButton, { duration: 0.2, scale: 1.05, ease: 'power1.inOut' }, '-=0.1')
                        .to($moreButton, { duration: 0.2, scale: 1, ease: 'power1.inOut' });
                }});
            }
        }).type('깃액션 연동 테스트 중.', { speed: 500 }).go();

        // 글자 단위로 span 감싸기 (애니메이션용)
        function splitText($el) {
            const text = $el.text();
            $el.empty();
            for (let i = 0; i < text.length; i++) {
                const char = (text[i] === ' ') ? '&nbsp;' : text[i];
                $el.append('<span>' + char + '</span>');
            }
        }

        const $dynamicText = $('.dynamic-text');
        splitText($dynamicText);

        const dynamicTexts = ['새로운 인연과', '멋진 동료들과', '새로운 경험과', '다가올 기회와'];
        let textIndex = 0;
        const $ellipsis = $('.ellipsis');
        let ellipsisCount = 0;

        function startTextAnimation() {
            if (ellipsisInterval) clearInterval(ellipsisInterval);
            if (textInterval) clearInterval(textInterval);

            ellipsisInterval = setInterval(function () {
                ellipsisCount = (ellipsisCount + 1) % 4;
                const dotCount = ellipsisCount || 1;
                const dots = '.'.repeat(dotCount);
                $ellipsis.text(dots.padEnd(3, '\u00A0'));
            }, 2000);

            textInterval = setInterval(function () {
                textIndex = (textIndex + 1) % dynamicTexts.length;
                const newText = dynamicTexts[textIndex];
                const $oldChars = $dynamicText.find('span');
                gsap.to($oldChars, { duration: 0.3, opacity: 0, rotationX: -90, stagger: 0.05, onComplete: function () {
                    $dynamicText.text(newText);
                    splitText($dynamicText);
                    const $newChars = $dynamicText.find('span');
                    gsap.set($newChars, { opacity: 0, rotationX: 90 });
                    gsap.to($newChars, { duration: 0.3, opacity: 1, rotationX: 0, stagger: 0.05 });
                }});
            }, 5000);
        }
        startTextAnimation();

        // 마우스 오버 시 영상 재생, 나가면 역재생
        const video = $('.character video')[0];
        let animationFrameId;
        let lastTime;
        video.playbackRate = 2;

        function playForward() {
            if (!video.paused) return;
            cancelAnimationFrame(animationFrameId);
            video.playbackRate = 2;
            video.play();
        }

        function reverseStep(timestamp) {
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
        }

        function playReverse() {
            cancelAnimationFrame(animationFrameId);
            video.pause();
            if (video.currentTime >= video.duration) {
                video.currentTime = video.duration - 0.01;
            }
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(reverseStep);
        }

        $moreButton.on('mouseenter', function () {
            playForward();
            if (pulseTimeline) {
                pulseTimeline.pause();
                gsap.set($moreButton, { clearProps: 'transform' });
            }
        });

        $moreButton.on('mouseleave', function () {
            playReverse();
            if (pulseTimeline) pulseTimeline.resume();
        });

        // 더보기 클릭 → 연결 성공 연출 → 카드 뒤집고 메인 화면 표시
        $moreButton.on('click', function (e) {
            e.preventDefault();
            $moreButton.off('mouseenter mouseleave');
            if (pulseTimeline) pulseTimeline.kill();
            gsap.set($moreButton, { scale: 1, backgroundColor: '#000000' });

            if (textInterval) clearInterval(textInterval);
            if (ellipsisInterval) clearInterval(ellipsisInterval);
            gsap.set('.spinner span', { display: 'none' });

            const $connectImg = $('.connect-img');
            const rect = $connectImg[0].getBoundingClientRect();
            const originX = (rect.left + rect.width / 2) / window.innerWidth;
            const originY = (rect.top + rect.height / 2 + 40) / window.innerHeight;
            confetti({ particleCount: 150, spread: 430, origin: { x: originX, y: originY }, colors: ['#00BA00', '#33C733', '#90EE90', '#FFFFFF'] });

            gsap.to('.connect-img', { duration: 0.8, scale: 1, opacity: 1, ease: 'elastic.out(1, 0.5)', onComplete: function () {
                setTimeout(function () {
                    const $connectText = $('.connect-text');
                    const $oldSpans = $connectText.children();
                    gsap.to($oldSpans, { duration: 0.3, opacity: 0, rotationX: -90, stagger: 0.1, onComplete: function () {
                        $connectText.text('연결 성공 !');
                        splitText($connectText);
                        const $newSpans = $connectText.find('span');
                        gsap.set($newSpans, { opacity: 0, rotationX: 90 });
                        gsap.to($newSpans, { duration: 0.3, opacity: 1, rotationX: 0, stagger: 0.05, onComplete: function () {
                            setTimeout(function () {
                                showMainAfterConnect();
                            }, 500);
                        }});
                    }});
                }, 500);
            }});
        });

        // 연결 성공 후: 카드 뒤집기 + 전체 화면 + 메인 네비 표시
        function showMainAfterConnect() {
            const cardSection = '.card-section';
            const targetHeight = window.innerHeight;
            const tl = gsap.timeline({
                onComplete: function () {
                    $('.card-front').hide();
                    afterIntro = true;
                    manageLayout();
                    initAboutSwiperObserver();
                    const $mainNavList = $('.main-nav-list');
                    gsap.to($mainNavList[0], {
                        duration: 0.5, opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)', delay: 0.3,
                        onStart: function () { $mainNavList.removeClass('init'); }
                    });
                }
            });
            tl.to(cardSection, { duration: 1.5, rotationY: 180, ease: 'expo.inOut' })
              .to(cardSection, { duration: 1.2, width: '100vw', height: targetHeight, borderRadius: 0, borderWidth: 0, ease: 'expo.inOut' }, '-=0.8');
        }

    } else {
        // ========== 개발 모드: 인트로 없이 바로 메인 ==========
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

        const $mainNavList = $('.main-nav-list');
        gsap.set($mainNavList[0], { opacity: 1, scale: 1, y: 0 });
        $mainNavList.removeClass('init');
    }

    // ========== 9. 포트폴리오 모달 (작업 클릭 시 상세 보기) ==========
    const $portfolioModal = $('#portfolioModal');
    const portfolioModal = new bootstrap.Modal($portfolioModal[0]);
    const $workItems = $('.work-item');
    const $modalCloseBtn = $('#modal-close-btn');

    $modalCloseBtn.on('click', function () {
        portfolioModal.hide();
    });

    // 태그 키 → 화면 텍스트 + CSS 클래스 (modal-data.js 의 tags 와 연동)
    const TAG_MAP = {
        html: { text: 'HTML5', class: 'tag-html' },
        css: { text: 'CSS3', class: 'tag-css' },
        js: { text: 'JavaScript', class: 'tag-js' },
        jquery: { text: 'jQuery', class: 'tag-jquery' },
        scss: { text: 'Sass', class: 'tag-sass' },
        sass: { text: 'Sass', class: 'tag-sass' },
        react: { text: 'React', class: 'tag-react' },
        vue: { text: 'Vue', class: 'tag-vue' },
        lottie: { text: 'Lottie', class: 'tag-lottie' }
    };

    $workItems.each(function (index) {
        const $item = $(this);
        const $button = $item.find('.work-item-btn');
        const itemKey = 'item' + (index + 1);

        $button.on('click', function () {
            const data = portfolioData[itemKey];
            if (!data) return;

            const $mediaContainer = $portfolioModal.find('.modal-img-container');
            const $modalTags = $portfolioModal.find('#modal-tags');
            const $modalTitle = $portfolioModal.find('#portfolioModalLabel');
            const $modalDesc = $portfolioModal.find('#modal-desc');

            $mediaContainer.empty();
            $modalTags.empty();

            // 타입에 따라 미디어 넣기: iframe 한 개 / iframe 탭 여러 개 / 이미지
            if (data.type === 'iframe') {
                const $iframe = $('<iframe>').attr('src', data.iframeSrc).attr('frameborder', '0');
                $mediaContainer.append($iframe);
            } else if (data.type === 'iframe-tabs' && data.iframeTabs && data.iframeTabs.length > 0) {
                const $wrap = $('<div>').addClass('modal-iframe-tabs');
                const $view = $('<div>').addClass('modal-iframe-tabs-view');
                const $btns = $('<div>').addClass('modal-iframe-tab-btns');

                for (let i = 0; i < data.iframeTabs.length; i++) {
                    const tab = data.iframeTabs[i];
                    const $iframe = $('<iframe>').attr('src', tab.src).attr('frameborder', '0').addClass('modal-iframe-tab-pane');
                    if (i > 0) $iframe.addClass('is-hidden');
                    $view.append($iframe);
                }

                for (let j = 0; j < data.iframeTabs.length; j++) {
                    const tabLabel = data.iframeTabs[j].label;
                    const $btn = $('<button>').attr('type', 'button').text(tabLabel).addClass('modal-iframe-tab-btn');
                    if (j === 0) $btn.addClass('is-active');

                    (function (clickedIndex) {
                        $btn.on('click', function () {
                            $view.find('.modal-iframe-tab-pane').each(function (k) {
                                $(this).toggleClass('is-hidden', k !== clickedIndex);
                            });
                            $btns.find('.modal-iframe-tab-btn').each(function (k) {
                                $(this).toggleClass('is-active', k === clickedIndex);
                            });
                        });
                    })(j);
                    $btns.append($btn);
                }

                $wrap.append($view).append($btns);
                $mediaContainer.append($wrap);
            } else {
                const $img = $('<img>').attr('src', data.imgSrc).attr('alt', data.title + ' project image').addClass('img-fluid');
                $mediaContainer.append($img);
            }

            $modalTitle.text(data.title);
            $modalDesc.html(data.description);

            // 태그 목록 만들기 (data.tags 가 배열이면 그대로, 객체면 키 목록 사용)
            const tagList = Array.isArray(data.tags) ? data.tags : Object.keys(data.tags || {});
            for (let t = 0; t < tagList.length; t++) {
                const key = tagList[t].toLowerCase();
                const info = TAG_MAP[key];
                const tagText = info ? info.text : tagList[t];
                const tagClass = info ? info.class : 'tag-' + key;
                const $li = $('<li>');
                const $span = $('<span>').addClass(tagClass).text(tagText);
                $li.append($span);
                $modalTags.append($li);
            }

            portfolioModal.show();
        });
    });

    // 모달 닫을 때 iframe 제거 (영상 등 중단)
    $portfolioModal.on('hidden.bs.modal', function () {
        $portfolioModal.find('.modal-img-container').empty();
    });

    // 모달 안 뷰어(휴먼메이드 등)에서 'navigate' 메시지 오면 모달 iframe 주소만 변경
    window.addEventListener('message', function (e) {
        var data = e.data;
        if (!data || data.type !== 'navigate' || !data.url) return;
        var $modalIframe = $portfolioModal.find('.modal-img-container iframe');
        if ($modalIframe.length) $modalIframe.attr('src', data.url);
    }, false);
});
