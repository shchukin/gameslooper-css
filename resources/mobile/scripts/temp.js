(function($) {
    $(function() {

        /*
         * Page
         */

        $('.page__navigate').on('click', function () {
            $('.page').toggleClass('page_drop');
        });
        
        $('[data-popover]').on('click', function (event) {
            event.preventDefault();
            $('.page').removeClass('page_drop'); // hide dropdown
            $('.page__popover_visible').removeClass('page__popover_visible'); // hide another popovers
            $( $(this).data('popover') ).addClass('page__popover_visible');

            /* Give focus there */
            $this = $(this);
            setTimeout(function () {
                $( $this.data('popover') ).find('input').first().focus();
            }, 1000);

            /* Expanding Textareas again */
            $('.input_resize_auto .input__text').expanding();

            /* Chat */
            $('html, body').scrollTop( 1000000 );

        });

        $('.page__hide-popover').on('click', function (event) {
            $(this).parents('.page__popover').removeClass('page__popover_visible');
        });


        /*
         * Input
         */

        // show dropdown for suggest widget only
        $('.input_widget_suggest .input__text').on('input', function () {

            var $this = $(this);

            if( $this.length >= 1) {
                $this.parents('.input_widget_suggest').addClass('input_loading');
                setTimeout(function () {
                    $this.parents('.input_widget_suggest').addClass('input_drop').removeClass('input_loading');
                }, 2000);
            } else {
                $(this).parents('.input_widget_suggest').removeClass('input_drop')
            }
        });

        // hide dropdown by click out
        // https://css-tricks.com/dangers-stopping-event-propagation/
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.input').length) {
                $('.input').removeClass('input_drop');
            }
        });

        // hide dropdown by cleartype click
        $('.input__cleartype').on('click', function () {
            $(this).parents('.input').removeClass('input_drop');
        });


        // show dropdown for select widget only
        $('.input__data').on('focusin', function () {
            $(this).parents('.input').addClass('input_drop').addClass('input_focus');
        });
        //doesn't work
        $('.input__data').on('focusout', function () {
            $(this).parents('.input').removeClass('input_drop');
        });


        // choose value from select
        
        $('.input__data').on('input', function () {
            if( $(this).val() != 'clear' ) {
                var value = $(this).val();
                $(this).parents('.input').find('.input__text').val( value ).focus().scrollLeft(-1000);
            } else {
                $(this).parents('.input').find('.input__text').val( '' ).focus().scrollLeft(-1000);
            }
            $(this).parents('.input').removeClass('input_drop').removeClass('input_error').addClass('input_fill');
            $(this).parents('.input').find('.input__tooltip').remove();
        });



        /* Chat */
        
        var chatPopoverBottomPadding = parseInt( $('.page__popover_id_chat').css('padding-bottom') , 10 ); // original popover padding: http://prntscr.com/bo7khs

        $('.chat__input .input__text').on('keypress', function () {
            var footHeight = parseInt( $('.chat__foot').outerHeight() , 10 );
            $('.chat__ribbon').css('padding-bottom', (footHeight - chatPopoverBottomPadding) + 'px');
            $('html, body').scrollTop( 1000000 );
        });


        /* Location steps */

        $('.location__action').on('click', function () {
            $(this).parents('.location__section').removeClass('location__section_active');
            $(this).parents('.location__section').next('.location__section').addClass('location__section_active');
            $(this).parents('.location__section').next('.location__section').find('input').focus();
        });


    });
})(jQuery);










