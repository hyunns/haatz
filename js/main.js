(function () {
    var sc = 0; // scrollTop

    // gnb 열기
    $('#header .gnb .depth1').on('mouseenter', function () {
        $('#header').addClass('on');
        $(this).find('.depth2').show();
        $('.dimm_header').stop().fadeIn(300);
    }).on('mouseleave', function () {
        $('#header').removeClass('on');
        $(this).find('.depth2').hide();
        $('.dimm_header').stop().fadeOut(300);
    });
    // depth3 열기
    $('.gnb .depth2 .plus').on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('on').next('.depth3').toggle();
    });

    $(window).resize(function () {
        var winW = $(this).outerWidth();
        
        if (winW > 1200) {
            // 검색창 pc에서 닫기
            $('#header .m_search_wrap').hide();
            $('#header .m_dimm').fadeOut(300);

        } else {
            // 전체메뉴 닫기
            $('.all_menu_box').removeClass('on');
            $('#wrap').removeClass('on');
            $('body').removeClass('hidden');


        }
    });
    
    // 검색창 열기
    $('#header .util .btn_search').on('click', function() {
        var winW = $(window).outerWidth();

        if(winW > 1200) {
            $(this).toggleClass('open');
            $('#header .search_wrap').fadeToggle();
        } else {
            $(this).addClass('open');
            $('#header .m_search_wrap').slideDown(300);
            $('#header .m_dimm').fadeIn(300);
            $('body').addClass('hidden');
        }
    });
    
    // 메인슬라이더 초기화
    var mainSlider = new Swiper('.main_slider', {
        loop: true,
        speed: 500,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false, // 안쪽 버튼 클릭시 안 멈추게 함
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 스크롤이동버튼
    $('.btn_scroll').on('click', function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.main_product').offset().top
        }, 500);
    });

    var productLeft = $('.main_product .left');
    var productRight = $('.main_product .right');

    // 메인 프로덕트
    changeWidth();

    function changeWidth() {        
        $(window).resize(function(e) {
            e.stopPropagation();
            
            var winW = $(window).outerWidth();
    
            if(winW > 1200) {
                productLeft.on('mouseenter', function() {
                    $(this).parent().addClass('big_left');
                }).on('mouseleave', function() {
                    $(this).parent().removeClass('big_left');
                });
                productRight.on('mouseenter', function() {
                    $(this).parent().addClass('big_right');
                }).on('mouseleave', function() {
                    $(this).parent().removeClass('big_right');
                });
            } else {
                productLeft.off('mouseenter mouseleave');
                productRight.off('mouseenter mouseleave');
            }
        }).trigger('resize');
    };

    // 메인 프로덕트 라인업
    productLeft.on('click', function() {
        $(this).addClass('on');
        $('.line_up').addClass('on');
    });

    $('.line_close').on('click', function() {
        productLeft.removeClass('on');
        $('.line_up').removeClass('on');
    });

    // 제품바로알기
    productRight.on('click', function() {
        productRight.off('mouseenter');

        $(this).parent().addClass('on');
        $('.main_product .know_product').addClass('on');
    });

    $('.prod_close').on('click', function() {
        $('.main_product').removeClass('on');
        $('.main_product .know_product').removeClass('on');
    });
    

    // 메인 스크롤
    $(window).scroll(function() {
        sc = $(window).scrollTop() + $(window).height() / 1.5;

        if(sc >= $('.main_support').offset().top && sc <= $('.main_news').offset().top) {
            $('.main_support').addClass('on');
        } else if(sc >= $('.main_news').offset().top && sc <= $('#footer').offset().top){
            $('.main_news').addClass('on');
        }
    });

    // 뉴스 슬라이더
    var newsSlider = new Swiper('.news_slider', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 탑버튼
    moveBtnTop();

    function moveBtnTop() {
        var btnTop = $('.top_wrap .btn_top');

        // 탑버튼 페이지상단이동
        btnTop.on('click', function(e) {
            e.preventDefault();
    
            $('html, body').animate({scrollTop:0}, 300);
        });
        
        btnTop.hide();
    
        $(window).scroll(function() {
            var footer = $('#footer');
            var winScrT = $(window).scrollTop();
            var totalH = winScrT + $(window).height();
            var footerT = footer.offset().top;
            
            sc = $(this).scrollTop();
    
            if(sc >= 75) {
                btnTop.fadeIn(300);
            } else {
                btnTop.fadeOut(300);
            }

            // 탑버튼 위치
            if(totalH >= footerT) {
                $('.top_wrap').css({ 'position': 'absolute', 'bottom': $('#footer').outerHeight(true) + 30 });
            } else {
                $('.top_wrap').css({ 'position': 'fixed', 'bottom': '30px' });
            }

        }).trigger('scroll');
    }

    // 패밀리사이트
    $('#footer .btn_family').on('click', function() {
        $(this).toggleClass('on');
        $('.family .list_family').slideToggle();
    });
        
    // 제품찾기 열기
    $('#header .util_wrap .util li.find_pd').on('click', function() {
        $('.prod_search').slideDown(600);
        $('.dimm_header').stop().fadeIn(300);
        $('#header .m_dimm').fadeIn(300);
    });
    $('.prod_search .prod_close').on('click', function() {
        $('.prod_search').slideUp(600);
        $('.dimm_header').stop().fadeOut(300);
        $('#header .m_dimm').fadeOut(300);
    });
    
    $('.prod_search .tab .btn').on('click', function() {
        var idx = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        $('.prod_inner .tab_box').show().eq(idx).siblings().hide();
    });

    $('.btn_all_menu').on('click', function() {
        $('.all_menu_box').addClass('open');
        $('#wrap').addClass('on');
        $('body').addClass('hidden');
    });
    $('.btn_close_menu').on('click', function() {
        $('.all_menu_box').removeClass('open');
        $('#wrap').removeClass('on');
        $('body').removeClass('hidden');
    });

    //******************* 태블릿분기점 ********************/
    // m_gnb열기
    $('#header .m_nav').on('click', function(e) {
        e.preventDefault();

        $(this).addClass('on');
        $('#header .m_gnb_box').addClass('open');
        $('#header .m_dimm').fadeIn(300);
        $('body').addClass('hidden');
    });
    // m_gnb닫기
    $('#header .m_btn_close').on('click', function(e) {
        e.preventDefault();

        $('#header .m_gnb_box').removeClass('open');
        $('#header .m_dimm').fadeOut(300);
        $('body').removeClass('hidden');
    });

    // m_dimm 클릭시 닫기
    $('#header .m_dimm').on('click', function() {
        $('#header .m_gnb_box').removeClass('open');
        $('#header .m_search_wrap').slideUp(300);
        $('.prod_search').slideUp(600);
        $('.dimm_header').stop().fadeOut(300);
        $('#header .m_dimm').fadeOut(300);
        $('body').removeClass('hidden');
    });

    $('.m_gnb .m_depth1>li').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('on').siblings().removeClass('on');
    });

    // m_gnb 아코디언
    $('.m_gnb .m_depth1>li>a').on('click', function(e) {
        e.preventDefault();

        $(this).addClass('active').parent().siblings().find('>a').removeClass('active');
        $(this).next().stop().slideToggle().parent().siblings().find('.m_depth2').hide();
        
    });
    
    // m_depth3 열기
    $('.m_gnb .m_depth2>li>.m_plus').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).toggleClass('active').parent().siblings().find('>.m_plus').removeClass('active');
        $(this).next().stop().slideToggle().parent().siblings().find('.m_depth3').hide();
    });

    // m_search_wrap 닫기
    $('#header .util .m_search_wrap .m_btn_close').on('click', function() {
        $('#header .util .btn_search').removeClass('.open');
        $('.m_search_wrap').slideUp(300);
    });
})();