
// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ========         MAIN SCRIPTS FOR F8PHOTO          =========
// ============================================================
// ============================================================
// ============================================================
// ============================================================

(() => {
  let quickviewProdId = 0
  const toastDelay = 5000
  const brandSliderView = 6
  const productSliderView = 5

  $(document).ready(function() {
    initScripts()
  })

  // INITIALIZE SCRIPTS
  const initScripts = () => {
    $(window).scroll()
    $(window).resize()

    // SEARCH BOX
    $('#header-search .header-search-select select')
      .select2({
        dropdownParent: $('#header-search .header-search-wrapper')
      }).on('select2:open', function (e) {
        $(this).closest('#header-search').addClass('open focused')
      }).on('select2:close', function (e) {
        $(this).closest('#header-search').removeClass('open focused')
      })
    $('#header-search .header-search-input input').on('focus', function() {
      $(this).closest('#header-search').addClass('focused')
    }).on('blur', function() {
      if (!$(this).closest('#header-search').hasClass('open')) {
        $(this).closest('#header-search').removeClass('focused')
      }
    })

    // CARTBOX
    $('.header-cart .cartbox').on('mouseenter', function() {
      $('.header-cart').addClass('open')
    }).on('mouseleave', function() {
      $('.header-cart').removeClass('open')
    })

    // MAINMENU
    var $sidebar = $('.mainmenu .sidebar')
    var $sidebarHeader = $('.mainmenu .sidebar-header')
    var $sidebarCollapsedHeader = $('.mainmenu .sidebar.collapsed')
    $sidebarHeader.on('tap', function() {
      $sidebar.toggleClass('open')
    })
    $sidebar.on('mouseenter', function() {
      $sidebar.addClass('open')
    }).on('mouseleave', function() {
      $sidebar.removeClass('open')
    })

    // NAVIGATION
    var $menu = $('.mainmenu .menu')
    var $menuHeader = $('.mainmenu .menu-header')
    $menuHeader.on('tap', function() {
      $menu.toggleClass('open')
    })
    $menu.find('a').each(function(i) {
      if ($(this).attr('href') === "#") {
        $(this).on('click', function(e){
          e.preventDefault()
        })
      }
    })

    // SLIDER GENERAL
    $('.slider .slider-slide').on('mousedown', function(e) {
      $(this).closest('.slider').addClass('dragged')
    }).on('mouseup', function(e) {
      $(this).closest('.slider').removeClass('dragged')
    }).on('mouseleave', function(e) {
      $(this).closest('.slider').removeClass('dragged')
    })

    // HERO SLIDER
    if ($('.hero-slider .slider .slider-container').length) {
      $('.hero-slider .slider .slider-container').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false
            }
          }
        ]
      })
    }

    // BRAND SLIDER
    if ($('.brands-slider .slider .slider-container').length) {
      $('.brands-slider .slider .slider-container').slick({
        infinite: true,
        slidesToShow: brandSliderView,
        slidesToScroll: brandSliderView,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              arrows: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: false
            }
          },
          {
            breakpoint: 430,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      })
    }

    // NEW PRODUCT SLIDER
    if ($('.newproducts .slider-container').length) {
      $('.newproducts .slider-container').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 4,
        autoplay: false,
        autoplaySpeed: 3000,
        dots: true,
        focusOnSelect: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: true
            }
          }
        ]
      })
    }

    // TREEVIEW
    if ($('.sidebar-content-treeview').length) {
      $('.sidebar-content-treeview').simpleTree({
        storeState: true,
        storeType: 'session', // or 'local'
        // opened: [4]
      }).on('node:open', function(e, $node) {
        var nodeID = $node.data('node-id');
        console.log("opened " + nodeID + " ");
        if ($node.data('node-lazy')) {
          $node.data('node-lazy', false);
          var newID = nodeID + '.1';
          var loaded = '<ul><li data-node-id="' + newID + '" data-node-lazy="true"><span>' + newID + '</span></li></ul>';
          $node.append(loaded);
          $('#callback').data('simple-tree').build();
        }
      }).on('node:close', function(e, $node) {
        var nodeID = $node.data('node-id');
        console.log("closed " + nodeID + " ");
      });
    }

    // SIDEBAR TOGGLES
    $('.section .grid-header .toggle-sidebar').on('click', function(e) {
      e.preventDefault()
      $('.section .sidebar').toggleClass('open')
    })
    $('.section .section-sidemain-header .toggle-sidebar').on('click', function(e) {
      e.preventDefault()
      $('.section .sidebar').toggleClass('open')
    })
    $('.section .sidebar-content-header .hide-sidebar').on('click', function(e) {
      e.preventDefault()
      $('.section .sidebar').toggleClass('open')
    })

    // GRID VIEW FILTER
    $('.grid-filter-view .view-grid').on('click', function(e) {
      e.preventDefault()
      $('.grid-filter-view .view-list').removeClass('active')
      $(this).addClass('active')
      $(this).closest('.grid').removeClass('view-list')
    })
    $('.grid-filter-view .view-list').on('click', function(e) {
      e.preventDefault()
      $('.grid-filter-view .view-grid').removeClass('active')
      $(this).addClass('active')
      $(this).closest('.grid').addClass('view-list')
    })

    // STAR RATING JQUERY
    if ($('.rateYo').length) {
      const ratingMax = 5
      $('.rateYo').each(function(e) {
        const el = $(this)
        const container = $(this).closest('.form-group')
        el.rateYo({
          starWidth: "18px",
          normalFill: "gray",
          ratedFill: "#f39c12",
          numStars: ratingMax,
          minValue: 1,
          maxValue: ratingMax,
          precision: 0,
          rating: 1,
          onChange: ((e) => {
            if (e === 0) {
              container.find('.rating-display').html(`booo!`)
            } else {
              container.find('.rating-display').html(`${e} of ${ratingMax}`)
            }
          }),
          onSet: ((e) => {
            if (e === 0) {
              el.rateYo('method', 'rating', 1)
            } else {
              container.find('input[type="hidden"]').val(e)
            }
          })
        })
      })
    }

    // REVIEWS FILTER
    if ($('.reviews-filter').length) {
      $('.reviews-filter').each(function(e) {
        const el = $(this)
        const label = $(this).find('.reviews-filter-label')
        const value = $(this).find('.reviews-filter-label .value')
        const list = $(this).find('.reviews-filter-list')

        label.on('focus', (e) => {
          el.addClass('open')
        }).on('blur', (e) => {
          setTimeout(() => {
            el.removeClass('open')
          }, 200)
        })
        list.find('.reviews-filter-item').each(function(e) {
          const item = $(this)
          item.on('click', function(e) {
            list.find('.reviews-filter-item').removeClass('active')
            item.addClass('active')
            const itemValue = item.data('value')
            window.location.href = `?showRating=${itemValue}`
          })
        })
      })
    }

    // REVIEWS TAB
    $('.reviews .nav a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
      if ($(e.target).attr('aria-controls') === 'readreview') {
        $('.reviews').addClass('show-filter')
      } else {
        $('.reviews').removeClass('show-filter')
      }
    })

    // SCROLL TOs
    $('[data-toggle="scrolltotab"]').on('click', function(e) {
      e.preventDefault()
      const scrolltarget = $(this).data('scrolltarget')
      const tabtarget = $(this).data('tabtarget')
      const tabshow = $(this).data('tabshow')
      const tab = $(`#${tabtarget} a[aria-controls="${tabshow}"]`)
      tab.tab('show')

      $([document.documentElement, document.body]).animate({
        scrollTop: $(`#${scrolltarget}`).offset().top - $('.mainmenu').height() - 20
      })
    })

    // CARTBOX INPUT SPINNER 
    if ($(document).find('.cartbox-quantity-spinner').length) {
      if (!$(document).find('.cartbox-quantity-spinner').find('.input-group').length) {
        $(document).find('.input-spinner').inputSpinner()
      }
    }   

    // ADD TO CART
    if ($(document).find('.add-to-cart-button').length) {
      $(document).find('.add-to-cart-button').on('click', function(e) {
        e.preventDefault()
        const container = $(this).closest('.product-item') && $(this).closest('.productview-item')
        const productName = container.find('.product-data .product-data-name').val()
        const type = 'success'
        const action = 'added'
        const msg = `You have ${action} <a href="product.html" class='text--bold'>${productName}</a> to your <a href='cart.html'>cart</a>.`
        generateToastMessage(msg, type)
      })
    }

    // FAVORITE
    if ($(document).find('.add-to-wishlist-button').length) {
      $(document).find('.add-to-wishlist-button').on('click', function(e) {
        e.preventDefault()
        const container = $(this).closest('.product-item')
        const productName = container.find('.product-data .product-data-name').val()
        const $el = $(this).find('i')
        const $elspan = $(this).find('span')
        const isFavorite = $el.html().toLowerCase() !== 'favorite'
        let btnText = isFavorite ? 'Remove Wish List' : 'Add to Wish List'
        let icon = isFavorite ? 'favorite' : 'favorite_border'
        let type = isFavorite ? 'success' : 'warning'
        let action = isFavorite ? 'added' : 'removed'
        $el.html(icon)
        $elspan.html(btnText)
        var msg = `You have ${action} <a href="product.html" class='text--bold'>${productName}</a> to your <a href='wishlist.html'>wish list</a>.`
        generateToastMessage(msg, type)
      })
    }
    
    // QUICKVIEW
    if ($(document).find('.quickview-button').length) {
      $(document).find('.quickview-button').on('click', function(e) {
        e.preventDefault()
        $('.quickview').addClass('show')
        $('body').addClass('modal-open')
      })
    }
    // QUICKVIEW EVENT
    $('.quickview .quickview-close').on('click', function(e) {
      e.preventDefault()
      $('.quickview').removeClass('show')
      $('body').removeClass('modal-open')
    })
    // NEXT
    $('.quickview .quickview-next').on('click', function(e) {
      e.preventDefault()
      console.log('...next quickview item')
    })
    // PREV
    $('.quickview .quickview-prev').on('click', function(e) {
      e.preventDefault()
      console.log('...previous quickview item')
    })
    // QUICKVIEW PRODUCT OPTIONS
    $('.quickview').find('.productview-options li > a').on('click', function(e) {
      e.preventDefault()
      let productData = JSON.parse(JSON.parse($('.quickview').find('.product-data-json').val()))
      if (!$(this).hasClass('disabled')) {
        if (!$(this).hasClass('active')) {
          const optEl = $(this)
          const container = optEl.closest('.productview-container')
          $(document).find('.productview-options li > a').removeClass('active')
          if (optEl.data('type') === 'image') {
            const optionValue = optEl.data('option-image')
            // check if there is no slider
            if (container.find('.slider').length) {
              const img = $('<img/>').attr('src', optionValue)
              container.find('.productview-image').html(img)
            } else {
              if (!!optEl.data('default')) {
                const img = $('<img/>').attr('src', optionValue)
                container.find('.productview-image').html(img)
              } else {
                const img = $('<img/>').attr('src', optionValue)
                container.find('.productview-image').html(img)
              }
            }
          }
          $(this).addClass('active')
        }
      }
    })


    // PRODUCT LIST SLIDER
    if ($('.product-slider .slider-container').length) {
      $('.product-slider .slider-container').each((i,e) => {
        const sli = $(e)
        const itemType = $(e).data('slider')
        initiateProductSlider(sli)
      })
    }

    // PRODUCT VIEW
    if ($('.productview').length) {
      let productData = JSON.parse(JSON.parse($('.productview').find('.product-data-json').val()))
      // PRODUCT OPTIONS
      $(document).find('.productview-options li > a').on('click', function(e) {
        e.preventDefault()
        if (!$(this).hasClass('disabled')) {
          if (!$(this).hasClass('active')) {
            const optEl = $(this)
            const container = optEl.closest('.productview-container')
            $(document).find('.productview-options li > a').removeClass('active')
            if (optEl.data('type') === 'image') {
              const optionValue = optEl.data('option-image')
              // check if there is no slider
              if (container.find('.slider').length) {
                const img = $('<img/>').attr('src', optionValue)
                container.find('.productview-image').html(img)
              } else {
                if (!!optEl.data('default')) {
                  // check if product has gallery
                  if (!!productData.gallery) {
                    container.find('.productview-image').html(generateProductGallery(productData))
                    initiateProductViewSlider(container)
                  } else {
                    const img = $('<img/>').attr('src', optionValue)
                    container.find('.productview-image').html(img)
                  }
                } else {
                  const img = $('<img/>').attr('src', optionValue)
                  container.find('.productview-image').html(img)
                }
              }
            }
            $(this).addClass('active')
          }
        }
      })

      // PRODUCT VIEW GALLERY SLIDER FIRST INIT
      const productThumbSlider =$('.productview').find('.productview-thumbs > .slider .slider-container').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        dots: false,
        arrows: true,
        focusOnSelect: false,
        touchMove: false,
        swipeToSlide: false,
        swipe: false,
        asNavFor: '.productview-image .slider-container'
      })

      const productImageSlider = $('.productview').find('.productview-image > .slider .slider-container').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        arrows: true,
        focusOnSelect: false
      })

      $('.productview').find('.productview-thumbs .slider-slide a').each(function(e) {
        $(this).on('click', function(e) {
          e.preventDefault()
          productImageSlider.slick('slickGoTo', $(this).data('index'))
          productThumbSlider.slick('slickGoTo', $(this).data('index'))
        })
      })
      productImageSlider.on('beforeChange', function(e, slick, c, n) {
        productThumbSlider.slick('slickGoTo', n)
        productThumbSlider.find(`.slider-slide`).removeClass('slick-current')
        productThumbSlider.find(`.slider-slide`).each(function(e) {
          if ($(this).data('slick-index') === n) {
            $(this).addClass('slick-current')
          }
        })
      })
    }
  }

  $(window).on('resize', function() {
    // CHECK MOBILE VIEW
    checkIfMobileView()
  })

  $(window).on('scroll', function(e) {
    let threshold = $('.mainmenu.collapsed').length ? $('.mainmenu.collapsed').position().top : $(window).height()
    menuScrolled = $(window).scrollTop() >= threshold + 0 ? true : false

    if (menuScrolled) {
      $('body').addClass('menu-float')
    } else {
      $('body').removeClass('menu-float')
    }
  })

  const generateToastMessage = function(msg = 'Hello, World', type = 'default') {
    var now = new Date().getTime();
    var time = moment(now).fromNow()
    var typeclass = `toast-${type}`
    var delay = toastDelay + 300

    var html = `
    <div class="toast ${typeclass}" data-autohide="true" data-delay="${delay}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">F8Photo</strong>
        <small class="text-muted"><span class="moment-in-time">${time}</span></small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${msg}
      </div>
      <div class="toast-progress"><span data-timer="${toastDelay}"></span></div>
    </div>
    `

    var $toast = $($.parseHTML(html))

    $toast.appendTo('.toast-handler')
    $('.toast').toast('show')
    $('.toast').on('hidden.bs.toast', function () {
      var $el = $(this)
      $el.addClass('exiting')
      setTimeout(function() {
        $el.remove()
      }, 400)
    })
  }

  const initiateProductSlider = function(cntx) {
    cntx.slick({
      infinite: true,
      slidesToShow: productSliderView,
      slidesToScroll: productSliderView,
      dots: true,
      focusOnSelect: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false
          }
        },
        {
          breakpoint: 430,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    })
    $(cntx).find('.product-item').each(function(e) {
      $(this).on('mouseenter', function(e) {
        $(this).closest('.product-slider').addClass('adjust')
      }).on('mouseleave', function(e) {
        $(this).closest('.product-slider').removeClass('adjust')
      })
    })
  }

  const initiateProductViewSlider = (cnt) => {
    const productThumbSlider =$(cnt).find('.productview-thumbs > .slider .slider-container').slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      dots: false,
      arrows: true,
      focusOnSelect: false,
      touchMove: false,
      swipeToSlide: false,
      swipe: false,
      asNavFor: '.productview-image .slider-container'
    })

    const productImageSlider = $(cnt).find('.productview-image > .slider .slider-container').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      arrows: true,
      focusOnSelect: false
    })

    $(cnt).find('.productview-thumbs .slider-slide a').each(function(e) {
      $(this).on('click', function(e) {
        e.preventDefault()
        productImageSlider.slick('slickGoTo', $(this).data('index'))
        productThumbSlider.slick('slickGoTo', $(this).data('index'))
      })
    })
    productImageSlider.on('beforeChange', function(e, slick, c, n) {
      productThumbSlider.slick('slickGoTo', n)
      productThumbSlider.find(`.slider-slide`).removeClass('slick-current')
      productThumbSlider.find(`.slider-slide`).each(function(e) {
        if ($(this).data('slick-index') === n) {
          $(this).addClass('slick-current')
        }
      })
    })
  }

  const generateProductGallery = (productData) => {
    let galleryHTML = ''
    let galleryImageHTML = ''
    let galleryThumbsHTML = ''
    galleryHTML += `<div class="productview-image"><div class="slider"><div class="slider-container">`
    const gallery = productData.gallery
    Object.keys(gallery).forEach((k, i) => {
      galleryImageHTML += `
        <div class="slider-slide">
          <img src="${gallery[k].image}" alt="${productData.name}" />
        </div>
      `
      galleryThumbsHTML += `
        <div class="slider-slide">
          <a href="#" data-index="${k}">
              <img src="${gallery[k].thumb}" data-src="${gallery[k].image}" alt="${productData.name}" />
          </a>
        </div>
      `
    })
    galleryHTML += galleryImageHTML
    galleryHTML += `</div></div>`
    galleryHTML += `<div class="productview-thumbs"><div class="slider"><div class="slider-container">`
    galleryHTML += galleryThumbsHTML
    galleryHTML += `</div></div></div></div>`

    return galleryHTML
  }
})()
