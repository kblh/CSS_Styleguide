$( document ).ready(function() {



/*********************
  jQuery UI - selectmenu
*********************/
/*
$.widget( "custom.iconselectmenu", $.ui.selectmenu, {
  _renderItem: function( ul, item ) {
    var li = $( "<li>" ),
      wrapper = $( "<div>", { text: item.label } );

    if ( item.disabled ) {
      li.addClass( "ui-state-disabled" );
    }

    $( "<span>", {
      style: item.element.attr( "data-style" ),
      "class": "ui-icon " + item.element.attr( "data-class" )
    })
      .appendTo( wrapper );

    return li.append( wrapper ).appendTo( ul );
  }
});
*/

// $(".j-ui-select select").selectmenu({width:'auto'});
//$(".j-ui-select-rounded select").selectmenu({width:'auto'}).addClass("sx-select-roundedXXX");
// $(".j-ui-select-rounded select").iconselectmenu().iconselectmenu("menuWidget").addClass("sx-ui-select-rounded");
/* jQuery UI - selectmenu (end) */



/*********************
  jQuery UI - datepicker
*********************/

// $(".j-ui-datepicker input").datepicker();




/*********************
  Datepicker
  http://fengyuanchen.github.io/datepicker/
*********************/

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('datepicker.cs-CZ', ['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  $.fn.datepicker.languages['cs-CZ'] = {
    format: 'dd. mm. yyyy',
    days: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
    daysShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    daysMin: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
    weekStart: 2,
    months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
    monthsShort: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer', 'Čec', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro']
  };
});


$(".j-datepicker input").datepicker();

$(".j-datepicker-cz input").datepicker({
  offset: -1,
  autoHide: true,
  language: 'cs-CZ'
});

$(".j-datepicker-container-cz").datepicker({
  container: '.j-datepicker-container',
  autoHide: true,
  inline: true,
  weekStart: 1,
  language: 'cs-CZ'
});




/*********************
  Selectric
  http://selectric.js.org/
*********************/

$('.j-selectric select').selectric();







/*********************
  File input
*********************/

$(".j-form-file input").change( function(event) {
  var input = $(this);
  var span = $('.j-form-file span');
  span.text(input.val());
  event.stopPropagation();
});




/*********************
  skrollr
*********************/

(function($) {
  // Init Skrollr
  var s = skrollr.init({
    smoothScrolling: false,
    forceHeight: false,
    render: function(data) {
      //Debugging - Log the current scroll position.
      //console.log(data.curTop);
    }
  });
})(jQuery);


/*  skrollr.init({
    smoothScrolling: true
  }); */




/*********************
  Magnific popup
*********************/

$('.j-mfp-image-link').magnificPopup({type:'image'});
$('.j-mfp-inline-link').magnificPopup({type:'inline'});
$('.j-mfp-iframe-link').magnificPopup({type:'iframe'});

$('.j-mfp-gallery').magnificPopup({
  type: 'image',
  delegate: 'a',
  closeOnContentClick: false,
  closeBtnInside: false,
  mainClass: 'mfp-with-zoom mfp-img-mobile',
  gallery:{
    enabled:true
  },
  zoom: {
    enabled: true,
    duration: 300, // don't foget to change the duration also in CSS
    opener: function(element) {
      return element.find('img');
    }
  }  
});

$('.j-mfp-video').magnificPopup({
  disableOn: 700,
  delegate: 'a',
  type: 'iframe',
  mainClass: 'mfp-fade',
  removalDelay: 160,
  preloader: false,

  fixedContentPos: false
});


$('.j-mfp-modal-link').magnificPopup({
  type: 'inline',
  preloader: false,
  modal: true
});


$('.j-mfp-non-modal-link').magnificPopup({
  type: 'inline',
  preloader: false,
  modal: false
});


$(document).on('click', '.j-mfp-modal-dismiss', function (e) {
  e.preventDefault();
  $.magnificPopup.close();
});






/*********************
  Form inputs - label as placeholder
*********************/
/*
$('.sx-form input[type="text"], .sx-form input[type="email"], .sx-form input[type="password"], .sx-form textarea').focus( function(event) {
  var label = $("label[for='"+$(this).attr('id')+"']");
  label.hide();
});
$('.sx-form input[type="text"], .sx-form input[type="email"], .sx-form input[type="password"], .sx-form textarea').blur( function(event) {
  var label = $("label[for='"+$(this).attr('id')+"']");
  var input = $(this);
  if (!$(this).val()) { label.show(); }
});
*/






/*********************
  Collapsible
*********************/

$(".j-collapsible-trigger").click(function (event) { 
  var trigger = $(this);
  var container = trigger.closest(".j-collapsible-container");
  var content = container.find('.j-collapsible-content');
  content.slideToggle();
  container.toggleClass("sx-collapsible-active");
  event.stopPropagation();
});




/*********************
  Universal toggler 
*********************/

$(".j-toggle-trigger").click( function(event) {
  var trigger = $(this);
  var target = $(trigger.attr("data-target"));
  var effect = $(trigger.attr("data-effect"));
  var activeClass = $(trigger.attr("data-active"));

  if (effect.selector == "slide") { 
    target.slideToggle(); 
  } else {
    target.fadeToggle();
  }
  
  if (activeClass.selector) { 
    trigger.toggleClass(activeClass.selector);
  } else {
    trigger.toggleClass("sx-toggle-active");
  }

  event.stopPropagation();
});




/*********************
  CSS class toggler 
*********************/

$(".j-class-toggle").click( function(event) {
  var trigger = $(this);
  var CssClass = $(trigger.attr("data-class"));
  trigger.toggleClass(CssClass.selector);
  event.stopPropagation();
});




/*********************
  Scroll to top
*********************/

$(".j-scroll-to-top").click( function(event) {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});



/*********************
  Smooth scroll to target
*********************/

$('.j-scroll-to-target').click(function (event) {
  var body = $('body');
  var target;

  if (body.is(".IE") || body.is(".Gecko")) {
    target = $('html');
  } else {
    target = $('body');
  }

  target.animate({
    scrollTop: eval($($(this).attr('href')).offset().top - 10)
  }, 1000);

  event.stopPropagation();
  return false;
});



/*********************
  Scroll - links
*********************/

$('.j-scroll').each(function() {
  $elem =  $(this);
  var $content = $elem.find('.j-scroll-content');
  
  $elem.find(".j-scroll-link-left").click(function() {
    $content.animate({scrollLeft: "-="+250});
  });

  $elem.find(".j-scroll-link-right").click(function() {
    $content.animate({scrollLeft: "+="+250});
  });
});

/*
$(".j-scroll-link-left").click(function(){
    $(".j-scroll").animate({scrollLeft: "-="+250});
});
$(".j-scroll-link-right").click(function(){
    $(".j-scroll").animate({scrollLeft: "+="+250});
});   
*/





/*********************
  Tabs
*********************/

$(".j-tab-trigger").click( function(event) {
  var trigger = $(this);
  var allTriggers = $(".j-tab-trigger");
  var target = $(trigger.attr("href"));
  var content = $(".j-tab-conent");

  allTriggers.removeClass("sx-tab-active");
  trigger.addClass("sx-tab-active");
  content.hide();
  target.show();

  event.stopPropagation();
});





/*********************
  CountTo
  https://codepen.io/syedrafeeq/pen/rcfsJ
*********************/

jQuery(function ($) {
  // custom formatting example
  $('.j-timer-number').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
    }
  });
  
  // start all the timers
  $('.j-timer').each(count);  
  
  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});





/*********************
  easyPieChart
  https://rendro.github.io/easy-pie-chart/
*********************/

$('.j-easyPieChart80').easyPieChart({
  scaleColor: false,
  trackColor: '#eee',
  barColor: '#0172c2',
  lineWidth: 4,
  lineCap: 'round',
  size: 80
}); 

$('.j-easyPieChart120').easyPieChart({
  scaleColor: false,
  trackColor: '#eee',
  barColor: '#0172c2',
  lineWidth: 6,
  lineCap: 'round',
  size: 120
}); 




/*********************
  Progress Bar
  http://w3lessons.info/2013/06/04/skill-bar-with-jquery-css3/
  https://codepen.io/tamak/pen/hzEer
*********************/

$('.j-progress').each(function(){
  var bar = $(this).find('.sx-progress-bar');

  bar.animate({
    width:jQuery(this).attr('data-percent')
  },2000);

});





/*********************
  Sticky header
  http://codepen.io/AdobeWordPress/pen/tigrx
*********************/

$(function(){ 
  var bar_level = $(document).scrollTop();
  var header_height = 90;

  $(window).scroll(function() {
    var scroll_bar = $(document).scrollTop();
    if (scroll_bar > header_height) {
      $('.j-header').addClass('sx-header-sticky');$('body').addClass('sx-sticky-activated');
    } else {
      $('.j-header').removeClass('sx-header-sticky');$('body').removeClass('sx-sticky-activated');
    }
   });
});





/*********************
  MOUSEOVER (HOVER) ON TOUCH DEVICES
  http://www.hnldesign.nl/work/code/mouseover-hover-on-touch-devices-using-jquery/
*********************/

$('a.j-taphover').on("touchstart", function (e) {
  "use strict"; //satisfy the code inspectors
  var link = $(this); //preselect the link
  if (link.hasClass('hover')) {
    return true;
  } else {
    link.addClass("hover");
    $('a.j-taphover').not(this).removeClass("hover");
    e.preventDefault();
    return false; //extra, and to make sure the function has consistent return points
  }
});




/*********************
  Owl Carousel 2
  http://owlcarousel2.github.io/OwlCarousel2/
*********************/


var initCarousel = function(selector, settings) {

  var defaultSettings = {
    items: 6,
    dots: false,
    lazyLoad:true,
    margin: 0,
    loop: false,
    rewind: true,
    autoWidth: false,
    nav: false,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplayHoverPause: true
  };

  $.extend(defaultSettings, settings);


  $(selector).each(function() {
    $elem =  $(this);
    var inlineSetting = JSON.parse($elem.attr("data-carousel-settings") || "{}");
    var mySettings = $.extend({}, defaultSettings, inlineSetting);
    var $carousel = $elem.find('.j-owl2');
    
    $carousel.owlCarousel(mySettings);

    $elem.find(".j-owl2-nav-prev").click(function() {
      $carousel.trigger('prev.owl.carousel');
    });

    $elem.find(".j-owl2-nav-next").click(function() {
      $carousel.trigger('next.owl.carousel');
    });

  });
}


initCarousel(".j-owl2-1");

initCarousel(".j-owl2-6",{
  responsiveClass: true,
  responsive:{
    0: { items: 1 },
    400: { items: 2 },
    600: { items: 3 },
    800: { items: 4 },
    1000: { items: 5 },
    1200: { items: 6 }
  }
});

initCarousel(".j-owl2-5",{
  responsiveClass: true,
  responsive:{
    0: { items: 1 },
    400: { items: 2 },
    600: { items: 3 },
    800: { items: 4 },
    1000: { items: 5 }
  }
});




});
