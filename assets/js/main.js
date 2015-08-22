$(document).ready(function() {

  var isModalSecond = $('.modal-second').length > 0,
      isModalThird = $('.modal-third').length > 0,
      winMobile = window.innerWidth < 568 ? true : false;

  // Check to execute only for first modal
  if (!isModalSecond && !isModalThird) {

    var $modalCont = $('.modal-container'),
        $topSec = $('.top-section'),
        $middleSec = $('.middle-section'),
        $ctasCont = $('.ctas-container'),
        $showMore = $('.show-more'),
        middleOpen = false;

    if (winMobile) {
      var topHeight = $topSec.innerHeight(),
          midHeight = $middleSec.innerHeight(),
          ctasHeight = $ctasCont.innerHeight(),
          fullHeight = topHeight + midHeight + ctasHeight,
          initHeight = $modalCont.height(),
          initWinHeight = window.innerHeight;

      // Initialize hidden items and set the correct height to allow transition
      getHiddenPermits('.permissions-list', '.ctas-container', function() {
        if (!winMobile) {
          $modalCont.height(fullHeight - ctasHeight);
        }
      });

      // Get animation duration from css to define it only once
      var animationDuration = $modalCont.css('transition-duration') ? (parseFloat($modalCont.css('transition-duration'))*1000) : 300;

      // In case the show more btn is not needed remove it
      if (winMobile && initWinHeight > fullHeight) {
        $showMore.remove();
      }

      // Set correct height for modal to allow transition

      $showMore.on('click', function() {
        // Set some will-change properties to get better performance where supported
        $modalCont.css('will-change', 'height');
        $ctasCont.css('will-change', 'transform');

        if (!middleOpen) {
          $modalCont.addClass('is-open');
          $modalCont.height(fullHeight);
          $showMore.html('show less');
        } else {
          $modalCont.removeClass('is-open');
          if (winMobile) {
            $modalCont.css('overflow', 'hidden');
          }
          $showMore.html('show more');
          // Check for changes in viewport height (if the address bar hides for example)
          // And if so calculate the difference
          if (window.innerHeight > initWinHeight){
            $modalCont.height(initHeight + (window.innerHeight - initHeight));
          } else {
            $modalCont.height(initHeight);
          }
        }

        middleOpen = !middleOpen;

        setTimeout(function() {
          getHiddenPermits('.permissions-list', '.ctas-container');
        }, animationDuration/2);

        // Prevent pointer events on the button during animation
        $modalCont.addClass('is-animating');
        setTimeout(function() {
          // Remove not needed stuff after animation
          $modalCont.removeClass('is-animating');
          $modalCont.css('will-change', '');
          $ctasCont.css('will-change', '');
          getHiddenPermits('.permissions-list', '.ctas-container');
        }, animationDuration);
      });

    }

    function getHiddenPermits(cont, coverEl, cb) {
      var $cont = $(cont),
          $coverEl = $(coverEl);

      var $permits = $cont.find('.permit-item');

      $permits.each(function(i, el) {
        var $permit = $(el),
            $permitHeight = $permit.innerHeight(),
            $permitOffTop = $permit.offset().top,
            $coverOffTop = $coverEl.offset().top;

        if ($permitOffTop >= ($coverOffTop - $permitHeight)) {
          $permit.addClass('is-hidden');
        } else {
          $permit.removeClass('is-hidden');
        }
      });

      $('.permit-item.is-hidden').each(function(i, el) {
        $(el).css('transition-delay', (0.15*i) + 's');
      })

      if (cb) {
        cb();
      }
    }
  }

  var $modal = $('.modal-container');
  var $modal = $('.modal-second').length > 0 ? $('.modal-second') : $modal;
  var $modal = $('.modal-third').length > 0 ? $('.modal-third') : $modal;
  // Execute once
  if ($modal.innerHeight() > window.innerHeight && !winMobile) {
    $modal.addClass('center-reset');
  }
  // Bind to resize event to support devices that don't fire orientationchange event
  // (maybe there's a better way to do this, but since theres no resizing in mobile, it's not a performance hazard)
  $(window).on('resize', function() {
    winMobile = window.innerWidth < 568 ? true : false;
    if ($modal.innerHeight() > window.innerHeight && !winMobile && !$modal.hasClass('center-reset')) {
      $modal.addClass('center-reset');
    } else {
      $modal.removeClass('center-reset');
    }
  });

  if ($('.manual-code-screen').length > 0) {
    var $manualModal = $('.manual-code-screen'),
        $continueBtn = $('.btn-next'),
        $continueSafe = $('.continue-safe');

    $continueSafe.on('click', function() {
      $continueBtn.removeClass('is-disabled');
    });

  }

});
