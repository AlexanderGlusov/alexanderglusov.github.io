$(document).ready(function(){function e(){t===a||t<=0||t>a?($("#sliderWrapper").css({transform:"translateX(0)"}),t=1):(translateWidth=-320*t,$("#sliderWrapper").css({transform:"translateX("+translateWidth+"px)"}),t++)}$("#header__toggle").click(function(){$(".header__nav-mob").slideToggle("fast")}),$(".go_to").click(function(){var e=$(this).attr("href");if(0!=$(e).length){var t=$(e).offset().top-79;$("html, body").animate({scrollTop:t},500)}return!1}),document.documentElement.clientWidth<768&&$(".go_to").click(function(){$(".header__nav-mob").slideUp("fast")}),document.documentElement.clientWidth>1023&&$("#full-page").fullpage({sectionSelector:".fullpage-section",anchors:["intro","features","brands","reviews","contacts"],menu:"#menu",css3:!0,scrollingSpeed:1e3,navigation:!0,loopHorizontal:!0,afterLoad:function(e,t){"intro"==e?($(".intro .section-topic").animate({opacity:"1"},1e3),$(".intro .intro__logo").delay(500).animate({opacity:"1"},1e3),$(".intro .intro__description").delay(1e3).animate({opacity:"1"},1e3),$(".intro .next-section-btn").delay(1500).animate({opacity:"1"},1e3)):"features"==e?($(".features .section-topic").animate({opacity:"1"},800),$(".features .features__main").delay(300).animate({opacity:"1"},800),$(".features .features__add-description").delay(600).animate({opacity:"1"},800),$(".features .next-section-btn").delay(900).animate({opacity:"1"},800)):"brands"==e?($(".brands .section-topic").animate({opacity:"1"},800),$(".brands .brands__wrapper").delay(500).animate({opacity:"1"},800),$(".brands .brands-toggle-desktop").delay(700).animate({opacity:"1"},800),$(".brands .next-section-btn").delay(1300).animate({opacity:"1"},800)):"reviews"==e?($(".reviews .section-topic").animate({opacity:"1"},800),$(".reviews .reviews__block").delay(500).animate({opacity:"1"},800),$(".reviews .reviews__next-btn").delay(700).animate({opacity:"1"},800),$(".reviews .next-section-btn").delay(1300).animate({opacity:"1"},800)):"contacts"==e&&($(".contacts .section-topic").animate({opacity:"1"},800),$(".contacts .contacts__phone").delay(500).animate({opacity:"1"},800),$(".contacts .contacts__mail").delay(800).animate({opacity:"1"},800),$(".contacts .contacts__address").delay(900).animate({opacity:"1"},800),$(".contacts .page-footer").delay(1200).animate({opacity:"1"},800))}}),$("#next-description-2").click(function(){$(".feature-description-2").fadeIn(1e3),$(".feature-description-add-2").delay(500).fadeIn(1e3),$(".feature-description-1").hide(),$(".feature-description-add-1").hide()}),$("#next-description-3").click(function(){$(".feature-description-3").fadeIn(1e3),$(".feature-description-add-3").delay(500).fadeIn(1e3),$(".feature-description-2").hide(),$(".feature-description-add-2").hide()}),$("#next-description-1").click(function(){$(".feature-description-1").fadeIn(1e3),$(".feature-description-add-1").delay(500).fadeIn(1e3),$(".feature-description-3").hide(),$(".feature-description-add-3").hide()}),$(".owl-carousel").owlCarousel({loop:!0,margin:40,nav:!0,dots:!0,navText:["",'<div class="reviews__next-btn" aria-hidden="true">Next review </div>'],autoplay:!1,smartSpeed:500,autoplayTimeout:2e3,items:1}),$(".brands-toggle").click(function(){$(".hidden-brands").fadeIn("fast"),$(this).fadeOut("fast")});var t=1,a=$("#sliderWrapper").children().length-2;$(".brands-toggle-desktop").click(function(){e()})});