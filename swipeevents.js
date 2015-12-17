/* ===========================================================================================================
    EnableSwipeEvents
============================================================================================================= */
( function () {
    'use strict';

    var posX, posY, timeStart;
    var options = {
        tolerance: 50,
        xThreshold: 50,
        yThreshold: 50,
        maxTime: 100
    };
    var swipeLeft = new Event( 'swipeleft' );
    var swipeRight = new Event( 'swiperight' );
    var swipeTop = new Event( 'swipetop' );
    var swipeBottom = new Event( 'swipebottom' );

    function setup() {
        document.body.addEventListener( 'touchstart', function ( e ) {
            posX = e.changedTouches[0].clientX;
            posY = e.changedTouches[0].clientY;
            timeStart = e.timeStamp;
        } );

        document.body.addEventListener( 'touchend', function ( e ) {
            var endX = e.changedTouches[0].clientX,
                endY = e.changedTouches[0].clientY;
            console.log( e );

            if (e.timeStamp - timeStart < options.maxTime) {
                if ( Math.abs( endY - posY ) < options.tolerance
                    && Math.abs( endX - posX ) > options.xThreshold ) {
                    if ( endX - posX > 0 ) {
                        document.body.dispatchEvent( swipeRight );
                    } else {
                        document.body.dispatchEvent( swipeLeft );
                    }
                }

                if ( Math.abs( endX - posX ) < options.tolerance
                    && Math.abs( endY - posY ) > options.yThreshold ) {
                    if ( endY - posY > 0 ) {
                        document.body.dispatchEvent( swipeBottom );
                    } else {
                        document.body.dispatchEvent( swipeTop );
                    }
                }
            }


        } );
    }

    var init = function () {
        try {
            setup();
        }
        catch ( e ) {
            console.error( e.message );
            console.error( e );
        }
    };

    enableSwipeEvents = init;
} )();