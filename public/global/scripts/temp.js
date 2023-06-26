(function($) {
    $(function() {


      /* Bricklayer */

      var brickElements = $('.bricklayer');
      var brickObjects = [];

      brickElements.each(function (i) {
        brickObjects[i] = new Bricklayer(this);
      });


      $('[data-popover], .page__hide-popover').on('click', function () {

        for (var i=0; i < brickObjects.length; i++) {
          brickObjects[i].destroy();
        }

        setTimeout(function () {

          brickElements.each(function (i) {
            brickObjects[i] = new Bricklayer(this);
          });

        }, 100);

      });


      /* Expanding Textareas */

      $('.input_resize_auto .input__text').expanding();


      
      /* Input */


      // Fake focus state

      $('.input__text').on('focusin', function () {
        $(this).parents('.input').addClass('input_focus');
      });
      $('.input__text').on('focusout', function () {
        $(this).parents('.input').removeClass('input_focus');
      });



      // Clear type

      $('.input__text').on('input', function () {
        if ( $(this).val().length ) {
          $(this).parents('.input').addClass('input_fill');
        } else  {
          $(this).parents('.input').removeClass('input_fill');
        }
      });

      // do not lose focus
      $('.input__cleartype').on('mousedown', function (event) {
        event.preventDefault();
      });

      // clean
      $('.input__cleartype').on('click', function () {
        $(this).parents('.input').find('.input__text').val('').focus();
        $(this).parents('.input_error').find('.input__tooltip').remove();
        $(this).parents('.input_error').removeClass('input_error');
        $(this).parents('.input_fill').removeClass('input_fill');
      });


      // error

      $('.input__text').on('input', function () {
        $(this).parents('.input').removeClass('input_error')
      });



      /* playback states */

      $('.playback').on('click', function () {
        $(this).toggleClass('playback_active');
      });


      /* like */

      $('.like').on('click', function(event) {
        $(this).toggleClass('like_checked');
      });


      /* faq */

      $('.contents__link').on('click', function (event) {
        event.preventDefault();
        $('.contents__link_current').removeClass('contents__link_current');
        $(this).addClass('contents__link_current');

        var index = $(this).parent('.contents__item').index();

        $('.faq__item_current').removeClass('faq__item_current');

        $('.faq__item').eq(index).addClass('faq__item_current');

      });

    });
})(jQuery);










