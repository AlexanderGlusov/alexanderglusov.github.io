$(window).scroll(function() {

    var $scrollHeight = $(window).scrollTop();
    if ($scrollHeight > 600) {
        $('.page-header').slideDown(400);
    } else {
        $('.page-header').slideUp(400);
    }

});