//= require _console-fix.js
//= require _reactornav.js
//= require _jquery.fitvids.js
//= require _jquery.flexslider-min.js

/*
*	Site Name
*	Author: Author Name @ http://www.reactive.com
*   Copyright © 2012, http://www.reactive.com
*   All rights reserved.
*/
  
var REACTOR = REACTOR || {};

$(function(){
	REACTOR.modernizr();
	REACTOR.init();
	REACTOR.slider();
    REACTOR.responsiveImages();
    REACTOR.tabs();
    REACTOR.toggle();
});


REACTOR.modernizr = function() {
    //load scripts for <= IE8 - :nth-child
    Modernizr.load({
        test: Modernizr.borderradius,
        nope: ['/shared/js/libs/selectivizr-min.js']
    });
    Modernizr.load({
        test: Modernizr.input.placeholder,
        nope: ['/shared/js/libs/placeholder.min.js']
    });
};



REACTOR.init = function() {

    var winHeight = $(window).height()+"px";
    function setHeight() {
        $('.location').css('min-height',winHeight);
    }
    setHeight();

    // Acessible navigation
    // $('.site-navigation').reactornav();

    $('.mobile-navigation-handle').on('click', function() {
        $('.site-navigation > ul').slideToggle();
    });

    $('.sub-nav-header').on('click', function() {
        $(this).next('ul').slideToggle();
    });

    // Responsive videos
    $('.wysiwyg iframe').wrap('<figure></figure>').parent().fitVids();


    // Add class to body for breakpoint size
    resized();
    function resized() {
        windowWidth = $(window).width();
        removeClasses = $('body').removeClass('mobile desktop tablet phablet');

        if(windowWidth < 550) {
            removeClasses;
            $('body').addClass('mobile');
        } else if(windowWidth < 767) {
            removeClasses;
            $('body').addClass('phablet');
        } else if(windowWidth < 1024) {
            removeClasses;
            $('body').addClass('tablet');
        } else {
            removeClasses;
            $('body').addClass('desktop');
        }

        winHeight = $(window).height()+"px";
        setHeight();
    }
    $(window).bind('resize', resized);
    

};

REACTOR.slider = function() {
    $slider = $('.flexslider');
    if (!$slider.length) return;

    // Carousel
    $('.flexslider').flexslider({
        animation: "slide"
        // slideshowSpeed: 7000
    });

};

REACTOR.responsiveImages = function() {
    var $responsive = $('[data-full]');
    if (!$responsive.length) return;

    windowWidth = $(window).width();

    if(windowWidth > 767) {
        $('[data-full]').each(function() {
            var $this = $(this);
            var fullSize = $this.data('full');
            if($this.data('bg')) {
                $this.css('background-image','url('+fullSize+')');
            } else {
                $this.attr('src', fullSize);
            }
        });
    }
    
};

REACTOR.tabs = function() {
    $tabs = $('.tab-nav');
    if (!$tabs.length) return;

    // Tabs
    // Hide all tab-content
    $('.tab-content').hide();
    // Tabs function
    $('.tab-nav a').on('click', function(e) {
        e.preventDefault();
        // Active class to tav nav
        $('.tab-nav li').removeClass('active');
        $(this).parent().addClass('active');
        // Get tab ID
        var tabID = $(this).attr('href');
        // Display selected tab
        $('.tab-content').hide();
        $(tabID).fadeIn('fast');
    });
    // Activate first tab
    $('.tab-nav .active a').click();

};

REACTOR.toggle = function() {
    $toggle = $('.toggle-content');
    if (!$toggle.length) return;

    // Toggle
    $('.toggle-content').hide();
    $('.toggle-handle').on('click', function(e) {
        e.preventDefault(); 
        if($(this).hasClass('expanded')) {
            $(this).removeClass('expanded').next('.toggle-content').hide();
            $(this).children('span').attr('data-icon', 'f');
        } else {
            $(this).addClass('expanded').next('.toggle-content').fadeIn();
            $(this).children('span').attr('data-icon', 'd');
        }
    });

};