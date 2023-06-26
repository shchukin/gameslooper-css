(function($) {
    $(function() {

        /* scrollbar init */

        $('.scroll').scrollbar();



        /* logo */

        $('.logo').on('mouseenter', function(){
            if ( ! $('.logo').hasClass('logo_rotate') ) {
                $('.logo').addClass('logo_rotate');
                setTimeout(function(){
                    $('.logo').removeClass('logo_rotate');
                },1500);
            }
        });



        /* panel hide */

        var panelHideElement = document.querySelector('.page__hide-panel');

        if ( panelHideElement ) {
            panelHideElement.addEventListener('click', function () {
                this.parentNode.parentNode.classList.add('page__column_hidden');
            });
        }


        /* Show/Hide popover */
        // page__popover_visible

        $('[data-popover]').on('click', function (event) {
            event.preventDefault();
            $('.page__popover_visible').removeClass('page__popover_visible');
            $( $(this).data('popover') ).addClass('page__popover_visible');

            /* Give focus there */
            $this = $(this);
            setTimeout(function () {
                $( $this.data('popover') ).find('input').first().focus();
            }, 1000)
        });


        $('.page__hide-popover').on('click', function (event) {
            event.preventDefault();
            $(this).parents('.page__popover').removeClass('page__popover_visible');
        });

        $(document).on('keyup', function (event) {
            if (event.keyCode == 27) {
                $('.page__popover_visible').removeClass('page__popover_visible');
            }
        });

        /* Input */



        // Dropdowns

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
            $(this).parents('.input').find('.input__option_current').removeClass('input__option_current');
        });

        // show dropdown for select widget only
        $('.input_widget_select .input__text, .input_widget_select .input__arrow').on('mousedown', function () {
            $(this).parent('.input').addClass('input_drop');
        });


        // hide dropdown by ESC click
        $(document).on('keyup', function (event) {
            if (event.keyCode == 27) {
                $('.input').removeClass('input_drop');
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


        // choose value from dropdown
        $('.input__option').on('click', function () {
            if( ! $(this).hasClass('input__option_clear') ) {
                var value = $(this).html();
                $(this).parents('.input').find('.input__text').val( value ).focus().scrollLeft(-1000);
                $(this).addClass('input__option_current');
            } else {
                $(this).parents('.input').find('.input__text').val( '' ).focus().scrollLeft(-1000);
            }
            $(this).siblings('.input__option').removeClass('input__option_current');
            $(this).parents('.input').removeClass('input_drop').removeClass('input_error').addClass('input_fill');
            $(this).parents('.input').find('.input__tooltip').remove();
        });


        /*
         * User
         */

        // first try

        // $('.user__profile').on('click', function (event) {
        //
        //     // most likely it is a touch device
        //     if( window.outerWidth < 1340 ) {
        //         event.preventDefault();
        //         $('.user').toggleClass('user_drop');
        //     }
        //
        // });

        $('.user__profile').on('click', function (event) {

            if( $('.user').hasClass('user_drop') ) {
                event.preventDefault();
                $('.user').removeClass('user_drop');
            } else if( $('.user__actions').css('display') == 'none' ) {
                event.preventDefault();
                $('.user').addClass('user_drop');
            }

        });


        /*
         * Fold
         */

        $('.fold__handler').on('click', function () {
            $(this).parents('.fold').toggleClass('fold_drop');
        });

        // hide dropdown by ESC click
        $(document).on('keyup', function (event) {
            if (event.keyCode == 27) {
                $('.fold').removeClass('fold_drop');
            }
        });

        // hide dropdown by click out
        // https://css-tricks.com/dangers-stopping-event-propagation/
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.fold').length) {
                $('.fold').removeClass('fold_drop');
            }
        });


      /*
       * unit
       */

        // case of no hover, touch device or something
        $('.unit_has-overlay').on('click', function(event) {

             if ( ! $(this).hasClass('unit__overlay') && $(this).find('.unit__overlay').css('display') != 'block' ) {
                 if ( event.target.classList[0] != 'unit__switch') {
                     event.preventDefault();
                     $(this).addClass('unit_drop');
                 }
             }
        });


        $('.unit__switch').on('click', function (event) {
            event.preventDefault();

            var switchTo =  $(this).index();

            $(this).parents('.unit').find('.unit__switch_current').removeClass('unit__switch_current');
            $(this).parents('.unit').find('.unit__switch:eq('+ switchTo +')').addClass('unit__switch_current');


            $(this).parents('.unit').find('.unit__boxart_current').removeClass('unit__boxart_current');
            $(this).parents('.unit').find('.unit__boxart:eq('+ switchTo +')').addClass('unit__boxart_current');
        });


        /*
         * Info
         */

        $('.info').on('click', function (event) {

            if ( ! $(this).hasClass('info_drop') ) {

                // if tablet
                if ( $(this).find('.info__operations').css('display') == 'none' ) {
                    // show popover
                    $('.page__popover_visible').removeClass('page__popover_visible');
                    $( '.page__popover_id_info-actions' ).addClass('page__popover_visible');
                    event.preventDefault();
                }

                // else desktop
                else {
                    // if no hover
                    if( $(this).find('.info__operations').css('opacity') == 0 ) {
                        $(this).addClass('info_drop');
                        event.preventDefault();
                    }

                }

            }
            else {
                $(this).removeClass('info_drop');
            }

        });

        // hide by ESC click
        $(document).on('keyup', function (event) {
            if (event.keyCode == 27) {
                $('.info_drop').removeClass('info_drop');
            }
        });



        $('.info__action:first-child').on('click', function () {
            $(this).parents('.info').toggleClass('info_stopped');
        });


        /* Chat */

        $('.chat__body').scrollTop( 1000000 );

        $('.chat__input .input__text').on('keypress', function () {
            var footHeight = parseInt( $('.chat__foot').css('height'), 10 ) + parseInt( $('.chat__foot').css('padding-top'), 10 );
            $('.chat__ribbon').css('padding-bottom', footHeight + 'px');

            $('.chat__body').scrollTop( 1000000 );
        });


        /*
         * Notification animation
         */

        // $('.notification__delete').on('click', function (event) {
        //     event.preventDefault();
        //     var thisItem = $(this).parents('.notification');
        //     var thisHeight = thisItem.outerHeight() + parseInt(thisItem.css('margin-top'), 10 );
        //
        //
        //     thisItem.removeClass('notification_effect_show');
        //     thisItem.addClass('notification_effect_hide');
        //
        //     thisItem.prev('.notification').css('transform', 'translateY(' + thisHeight + 'px)').addClass('notification_effect_move');
        //     thisItem.prev('.notification').prev('.notification').css('transform', 'translateY(' + thisHeight + 'px)').addClass('notification_effect_move');
        //                           thisItem.prev('.notification').prev('.notification').prev('.notification').css('transform', 'translateY(' + thisHeight + 'px)').addClass('notification_effect_move');
        //     thisItem.prev('.notification').prev('.notification').prev('.notification').prev('.notification').css('transform', 'translateY(' + thisHeight + 'px)').addClass('notification_effect_move');
        //
        //
        //     setTimeout(function () {
        //         thisItem.prev('.notification').css('transform', 'translateY(0px)').removeClass('notification_effect_move');
        //         thisItem.prev('.notification').prev('.notification').css('transform', 'translateY(0px)').removeClass('notification_effect_move');
        //         thisItem.prev('.notification').prev('.notification').prev('.notification').css('transform', 'translateY(0px)').removeClass('notification_effect_move');
        //         thisItem.prev('.notification').prev('.notification').prev('.notification').prev('.notification').css('transform', 'translateY(0px)').removeClass('notification_effect_move');
        //         thisItem.remove();
        //     }, 350);
        // });


        /*
         * Games
         */
        
        $('#add-game-01').on('click', function () {

            var game01 = document.createElement('div');
            game01.classList.add('fade');
            game01.classList.add('fade_animation_in');

            game01.innerHTML = '<a class="fade__content preview" href="#" style="background-image: url(../temp/preview_01.jpg);">' +
                                    '<div class="preview__delete cancel" tabindex="0">' +
                                        '<span class="cancel__icon">Удалить</span>' +
                                    '</div>' +
                                    '<div class="preview__category">PlayStation 4</div>' +
                                    '<div class="preview__title">Street Fighter V</div>' +
                                '</a>';

            $('#temp-container-for-games').html('');
            $('#temp-container-for-games').append(game01);

            var game01Inner = game01.querySelector('.fade__content');
            var game01Height = game01Inner.offsetHeight;

            game01.style.height = game01Height + 'px';
            game01.style.opacity = 1;

            setTimeout(function () {
                game01.classList.remove('fade_animation_in');
            }, 500);

            var game01Delete = game01.querySelector('.preview__delete');
            game01Delete.addEventListener('click', function (event) {
                event.preventDefault();
                game01.classList.add('fade_animation_out');
                game01.style.height = 0;
                game01.style.opacity = 0;

                setTimeout(function () {
                    game01.remove();
                }, 500);
            });

        });

        $('#add-game-02').on('click', function () {

            var game02 = document.createElement('div');
            game02.classList.add('fade');
            game02.classList.add('fade_animation_in');

            game02.innerHTML = '<a class="fade__content preview" href="#" style="background-image: url(../temp/preview_02.jpg);">' +
                                    '<div class="preview__delete cancel" tabindex="0">' +
                                        '<span class="cancel__icon">Удалить</span>' +
                                    '</div>' +
                                    '<div class="preview__category">PlayStation 3</div>' +
                                    '<div class="preview__title">No More Heroes: Heroes Paradise Limited Edition</div>' +
                                '</a>';

            $('#temp-container-for-games').prepend(game02);

            var game02Inner = game02.querySelector('.fade__content');
            var game02Height = game02Inner.offsetHeight;

            game02.style.height = game02Height + 'px';
            game02.style.opacity = 1;

            setTimeout(function () {
                game02.classList.remove('fade_animation_in');
            }, 500);

            var game02Delete = game02.querySelector('.preview__delete');
            game02Delete.addEventListener('click', function (event) {
                event.preventDefault();
                game02.classList.add('fade_animation_out');
                game02.style.height = 0;
                game02.style.opacity = 0;

                setTimeout(function () {
                    game02.remove();
                }, 500);

            });

        });



        /*
         * Trends
         */

        $('#add-trend-01').on('click', function () {

            var trend01 = document.createElement('div');
            trend01.classList.add('fade');
            trend01.classList.add('fade_animation_in');

            trend01.innerHTML = '<a class="fade__content preview" href="#" style="background-image: url(../temp/preview_02.jpg);">' +
                                    '<div class="preview__category">PlayStation 3</div>' +
                                    '<div class="preview__title">No More Heroes: Heroes Paradise Limited Edition</div>' +
                                '</a>';

            $('#temp-container-for-trends').prepend(trend01);

            var trend01Inner = trend01.querySelector('.fade__content');
            var trend01Height = trend01Inner.offsetHeight;

            trend01.style.height = trend01Height + 'px';
            trend01.style.opacity = 1;

            setTimeout(function () {
                trend01.classList.remove('fade_animation_in');
            }, 500);

        });

        $('#add-trend-02').on('click', function () {

            var trend02 = document.createElement('div');
            trend02.classList.add('fade');
            trend02.classList.add('fade_animation_in');

            trend02.innerHTML = '<a class="fade__content preview" href="#" style="background-image: url(../temp/preview_03.jpg);">' +
                                    '<div class="preview__category">PlayStation 3</div>' +
                                    '<div class="preview__title">Strong Bads Cool Game for Attractive People Episode 4 - Dangeresque 3: The Criminal Projective</div>' +
                                '</a>';

            $('#temp-container-for-trends').prepend(trend02);

            var trend02Inner = trend02.querySelector('.fade__content');
            var trend02Height = trend02Inner.offsetHeight;

            trend02.style.height = trend02Height + 'px';
            trend02.style.opacity = 1;

            setTimeout(function () {
                trend02.classList.remove('fade_animation_in');
            }, 500);

        });


        var trendContainer = document.querySelector('#temp-container-for-trends');

        if (trendContainer) {
            var allOfTrends = trendContainer.querySelectorAll('.fade');
            [].forEach.call(allOfTrends, function (element) {
                var elementHeight = element.querySelector('.fade__content').offsetHeight;
                element.style.height = elementHeight + 'px';
                element.style.opacity = 1;
            });
        }



        $('#delete-trend').on('click', function () {

            var trendContainer = document.querySelector('#temp-container-for-trends');
            var trendToDelete = trendContainer.querySelector('.fade');

            trendToDelete.classList.add('fade_animation_out');
            trendToDelete.style.height = 0;
            trendToDelete.style.opacity = 0;

            setTimeout(function () {
                trendToDelete.remove();
            }, 500);

        });


        /*
         * Notifications
         */

        $('#add-notification-01').on('click', function () {

            var notification01 = document.createElement('div');
            notification01.classList.add('fade');
            notification01.classList.add('fade_animation_in');

            notification01.innerHTML = '<div class="fade__content informer"><a class="notification_effect_show notification notification_kind_alert" href="#"><span class="notification__title title link link_decoration_inverted">Достижение</span><div class="notification__body">Новобранец</div><span class="notification__delete clear"><span class="clear__icon">Удалить</span></span></a></div>';

            $('.alerts').prepend(notification01);

            var notification01Inner = notification01.querySelector('.fade__content');
            var notification01Height = notification01Inner.offsetHeight;

            notification01.style.height = notification01Height + 'px';
            notification01.style.opacity = 1;

            setTimeout(function () {
                notification01.classList.remove('fade_animation_in');
            }, 500);

            var notification01Delete = notification01.querySelector('.notification__delete');
            notification01Delete.addEventListener('click', function (event) {
                event.preventDefault();
                notification01.classList.add('fade_animation_out');
                notification01.style.height = 0;
                notification01.style.opacity = 0;

                setTimeout(function () {
                    notification01.remove();
                }, 500);
            });

        });

        $('#add-notification-02').on('click', function () {

            var notification02 = document.createElement('div');
            notification02.classList.add('fade');
            notification02.classList.add('fade_animation_in');

            notification02.innerHTML = '<div class="fade__content informer"><a class="notification notification_kind_alert" href="#"><span class="notification__title title link link_decoration_inverted">Gabe Newell</span><div class="notification__body">Цены хорошие, буду дальше покупать.</div><span class="notification__delete clear"><span class="clear__icon">Удалить</span></span></a></div>';

            $('.alerts').prepend(notification02);

            var notification02Inner = notification02.querySelector('.fade__content');
            var notification02Height = notification02Inner.offsetHeight;

            notification02.style.height = notification02Height + 'px';
            notification02.style.opacity = 1;

            setTimeout(function () {
                notification02.classList.remove('fade_animation_in');
            }, 500);

            var notification02Delete = notification02.querySelector('.notification__delete');
            notification02Delete.addEventListener('click', function (event) {
                event.preventDefault();
                notification02.classList.add('fade_animation_out');
                notification02.style.height = 0;
                notification02.style.opacity = 0;

                setTimeout(function () {
                    notification02.remove();
                }, 500);
            });

        });

    });
})(jQuery);










