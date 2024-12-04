$(document).ready(function() {


    /* Scroll hire me button to contact page */
    $('.hire-me').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    /* For Bootstrap current state on portfolio sorting */

    $('ul.nav-pills li a').click(function(e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    })

    /* portfolio mixitup */

    $(window).load(function() {
        var $container = $('.grid-wrapper');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.grid-controls li a').click(function() {
            $('.grid-controls .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });


    /* Magnific Popup */
    //$('.grid-wrapper').magnificPopup({
    //    delegate: 'a',
    //    type: 'image',
    //    gallery: {
    //        enabled: true
    //    }
    //});


    /* Sticky menu */
    $(".navbar").sticky({
        topSpacing: 0
    });


    /* Scroll spy and scroll filter */
    $('#main-menu').onePageNav({
        currentClass: "active",
        changeHash: true,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: ":not(.external)",
        easing: "swing"
    });

    // go to section
    if(window.location.hash !== ''){
        var hash = window.location.hash;
        $('#main-menu a[href="'+hash+'"]').click();
    }

    /* Charts*/

    $('.chart').waypoint(function() {
        $(this).easyPieChart({
            barColor: '#9a0000',
            size: '150',
            easing: 'easeOutBounce',
            //onStep: function(from, to, percent) {
            //    //$(this.el).find('.percent').text(Math.round(percent));
            //}
        });
    }, {
        triggerOnce: true,
        offset: 'bottom-in-view'
    });


});
