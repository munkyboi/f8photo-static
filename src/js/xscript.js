
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
    $.getScript('/js/data.js')
      .done(function( script, status ) {
        console.log('Data is ready... initializing main scripts.');
        initScripts()
      })
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

    // QUICKVIEW EVENT
    $('.quickview .quickview-close').on('click', function(e) {
      e.preventDefault()

      $('.quickview .quickview-content-wrapper').html('')
      $('.quickview').removeClass('show')
      $('body').removeClass('modal-open')
    })
    // NEXT
    $('.quickview .quickview-next').on('click', function(e) {
      e.preventDefault()
      getNextQuickviewProduct(quickviewProdId)
    })
    // PREV
    $('.quickview .quickview-prev').on('click', function(e) {
      e.preventDefault()
      getPrevQuickviewProduct(quickviewProdId)
    })

    // TREEVIEW
    if ($('.sidebar-content-treeview').length) {
      $('.sidebar-content-treeview').treeview({
        data: categories,
        enableLinks: true,
        expandIcon: 'f8-plus-square-o',
        collapseIcon: 'f8-minus-square-o',
        highlightSelected: false,
        levels: 1
      })
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

    // PRODUCT LIST ITEM GENERATE
    if ($('.grid-product .grid-content').length) {
      generateProductItems($('.grid-product .grid-content'), 'grid-item')
    }

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

    // PRODUCT LIST SLIDER
    if ($('.product-slider .slider-container').length) {
      $('.product-slider .slider-container').each((i,e) => {
        const sli = $(e)
        const itemType = $(e).data('slider')
        generateProductSlides(sli, itemType)
      })
    }

    // PRODUCT VIEW GENERATOR
    if ($('.productview').length) {
      productViewGenerator()
    }

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
            if (itemValue === 'all') {
              value.html(`All ratings`)
              $('.reviews-list .reviews-item').show()
              $('.no-match').remove()
            } else {
              value.html(`${itemValue} stars`)
              let count = 0
              $('.reviews-list .reviews-item').filter(function(i, v) {
                const revItem = $(this)
                count = revItem.data('review-rating') === itemValue ? count += 1 : count = count
                console.log(count)
                if (revItem.data('review-rating') === itemValue) {
                  revItem.show()
                } else {
                  revItem.hide()
                }
              })

              if (count === 0) {
                const notice = $('<div class="no-match">No reviews found...</div>')
                notice.appendTo($('.reviews-list'))
              } else {
                $('.no-match').remove()
              }

            }
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

    // ACCORDIONS
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

  const generateProductItems = (cntx, itemType = 'grid-item') => {
    let html = ''
    let prodArray = []
    const productPromise = new Promise((resolve, reject) => {
      Object.keys(products).forEach((k, i) => {
        prodArray.push(products[k])
        let content = parseProductData(productSlideHTML, products[k])
        html += content
      })
      if (prodArray.length > -1) {
        resolve(html)
      } else {
        reject(new Error('Not yet ready...'))
      }
    }).then(result => {
      cntx.html(result)
      initiateAjaxContent(cntx)
    })
  }

  const generateProductSlides = (cntx, itemType) => {
    $.ajax({
      url: `/js/${itemType}.json`,
      data: { get_param: 'value' }, 
      dataType: 'json',
      beforeSend: () => {
        console.log('Generate Product Slides...')
      },
      success: (data) => {
        let html = ''
        const featuredPromise = new Promise((resolve, reject) => {
          $.each(data, (i,e) => {
            const productData = data[i]
            let content = parseProductData(productSlideHTML, productData)
            html += content
          })
          resolve(html)
        }).then(result => {
          cntx.html(result)
          initiateProductSlider(cntx)
        })
      },
      error: (err) => {
        console.log("Ajax Error", err)
      }
    })
  }

  const initiateProductSlider = function(cntx) {
    console.log(cntx.data('slider'))
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
    
    initiateAjaxContent(cntx)
  }

  const quickviewAjax = function(id, isNew = false) {
    const $url = './_quickview.html'
    const $ajaxctx = $('.quickview .quickview-content-wrapper')
    const $ctx = $('.quickview')
    const productData = products.find(prod => prod.id === id)
    
    let optionsHTML = ''
    let productStatusHTML = ''

    $('body').addClass('modal-open')
    shutterClose(isNew)
    $('.quickview').addClass('loading').find('.quickview-content').scrollTop(0, 0)
    setTimeout(() => {
      
      let content = parseProductData(quickViewHTML, productData)
      $ajaxctx.html(content)
      $('.quickview').removeClass('loading')
      initiateAjaxContent($ctx, shutterOpen())
    }, 500)
  }

  const getNextQuickviewProduct = function() {
    var productCursor = products.findIndex(prod => prod.id === quickviewProdId)
    productCursor = productCursor < (products.length - 1) ? productCursor+1 : 0

    quickviewProdId = products[productCursor].id
    console.log('productCursor', productCursor)
    quickviewAjax(quickviewProdId)
  }

  const getPrevQuickviewProduct = function() {
    var productCursor = products.findIndex(prod => prod.id === quickviewProdId)
    productCursor = productCursor > 0 ? productCursor-1 : (products.length - 1)

    quickviewProdId = products[productCursor].id
    console.log('productCursor', productCursor)
    quickviewAjax(quickviewProdId)
  }

  // PRODUCT VIEW GENERATOR
  const productViewGenerator = () => {
    let container = $('.productview')
    const prodid = getParameterByName('prodid')
    const scrollto = getParameterByName('scrollto')
    const productData = products.find(prod => prod.id === prodid)
    let data = parseProductData($(container).html(), productData)

    document.title = `${productData.name} - F8Photo`
    container.html(data)
    initiateAjaxContent(container)

    if (scrollto) {
      if (scrollto === 'readreview') {
        $('#productview-tabs #reviews-tab').tab('show')
        $('#read-write-review-tab #readreview-tab').tab('show')
      } else if (scrollto === 'writereview') {
        $('#productview-tabs #reviews-tab').tab('show')
        $('#read-write-review-tab #writereview-tab').tab('show')
      }
      setTimeout(() => {
        $([document.documentElement, document.body]).animate({
          scrollTop: $('#description-reviews').offset().top - $('.mainmenu').height() - 20
        })
      }, 1000)
    }
  }

  // INITIATE SCRIPT FOR AJAX LOADED CONTENT
  const initiateAjaxContent = (cnt, callback = () => {}) => {
    if ($(cnt).find('.productview-item').length) {
      $(cnt).find('.productview-item').each((i,e) => {
        const itemCnt = $(e)
        const productId = $(itemCnt).find('.product-data .product-data-id').val()
        const productName = $(itemCnt).find('.product-data .product-data-name').val()
        const productPrice = $(itemCnt).find('.product-data .product-data-price').val()
        const productData = products.find(prod => prod.id === productId)

        // CARTBOX INPUT SPINNER 
        if ($(itemCnt).find('.cartbox-quantity-spinner').length) {
          if (!$(itemCnt).find('.cartbox-quantity-spinner').find('.input-group').length) {
            $(itemCnt).find('.input-spinner').inputSpinner()
          }
        }
        

        // ADD TO CART
        $(itemCnt).find('.add-to-cart-button').on('click', function(e) {
          e.preventDefault()
          var type = 'success'
          var action = 'added'
          var msg = `You have ${action} <a href="product.html" class='text--bold'>${productName}</a> to your <a href='cart.html'>cart</a>.`
          generateToastMessage(msg, type)
        })

        // FAVORITE
        $(itemCnt).find('.add-to-wishlist-button').on('click', function(e) {
          e.preventDefault()
          var $el = $(this).find('i')
          var $elspan = $(this).find('span')
          var isFavorite = $el.html().toLowerCase() !== 'favorite'
          var btnText = isFavorite ? 'Remove Wish List' : 'Add to Wish List'
          var icon = isFavorite ? 'favorite' : 'favorite_border'
          var type = isFavorite ? 'success' : 'warning'
          var action = isFavorite ? 'added' : 'removed'
          $el.html(icon)
          $elspan.html(btnText)
          var msg = `You have ${action} <a href="product.html" class='text--bold'>${productName}</a> to your <a href='wishlist.html'>wish list</a>.`
          generateToastMessage(msg, type)
        })
        
        // QUICKVIEW
        $(itemCnt).find('.quickview-button').on('click', function(e) {
          e.preventDefault()
          $('.quickview').addClass('show')
          quickviewAjax($(this).data('prodid').toString(), true)
        })

        // OPTIONS
        $(itemCnt).find('.productview-options li > a').on('click', function(e) {
          e.preventDefault()
          if (!$(this).hasClass('disabled')) {
            if (!$(this).hasClass('active')) {
              const optEl = $(this)
              const container = optEl.closest('.productview-container')
              $(itemCnt).find('.productview-options li > a').removeClass('active')
              if (optEl.data('type') === 'image') {
                const optionValue = optEl.data('option-image')
                // check if there is no slider
                if (container.find('.slider').length) {
                  console.log('asdfasdf')
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
  
        // CHECK IF SLIDER IS PRESENT
        if ($(itemCnt).find('.productview-image .slider-container').length) {
          initiateProductViewSlider(cnt)
        }
      })
    }

    callback()
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

  const parseProductData = (data, productData, itemType = "") => {
    data = data.replace(/{\?(id)\?}/g, productData.id)
    data = data.replace(/{\?(name)\?}/g, productData.name)
    data = data.replace(/{\?(brand)\?}/g, productData.brand)
    data = data.replace(/{\?(code)\?}/g, productData.code)
    data = data.replace(/{\?(availability)\?}/g, productData.availability)
    data = data.replace(/{\?(image)\?}/g, productData.image)
    data = data.replace(/{\?(imagePreview)\?}/g, productData.imagePreview)
    data = data.replace(/{\?(price)\?}/g, `₱${addCommas(productData.price)}`)
    data = data.replace(/{\?(rating)\?}/g, productData.rating === 0 ? `No Ratings` : `${productData.rating} of 5`)
    data = data.replace(/{\?(ratingPercent)\?}/g, round((productData.rating / 5 * 100), 1))
    data = data.replace(/{\?(reviews)\?}/g, productData.reviews)
    data = data.replace(/{\?(itemType)\?}/g, itemType)
    data = data.replace(/{\?(generateProductTag)\?}/g, productData.status === 2 ? '<div class="sale">Sale</div>' : '')
    data = data.replace(/{\?(generateOptions)\?}/g, !!productData.options ? generateProductOptions(productData) : '')
    data = data.replace(/{\?(generateGallery)\?}/g, !!productData.gallery ? generateProductGallery(productData) : `<div class="productview-image"><img src="${productData.image}" alt="${productData.name}"></div>`)

    return data
  }

  const generateProductOptions = (productData) => {
    const options = productData.options
    let optionsHTML = `<div class="productview-options"><h4>Available Options</h4>`
    Object.keys(options).forEach((k, i) => {
      optionsHTML += `<h5 class="productview-options-title">${options[k].label}</h5><ul>`
      if (options[k].options.length > 0) {
        const opts = options[k].options
        Object.keys(opts).forEach((k2, i2) => {
          optionsHTML += `
            <li>
              <a href="#"
                ${opts[k2].size ? `data-type="size" data-option-size="${opts[k2].size}"` : ''}
                ${opts[k2].image ? `data-type="image" data-option-image="${opts[k2].image}"` : ''}
                ${opts[k2].colorValue ? `data-type="color" data-option-color="${opts[k2].colorValue}"` : ''}
                data-default="${!!opts[k2].default}"
                class="productview-options-item${opts[k2].default ? ' active' : ''}${opts[k2].status === 0 ? ' disabled' : ''}"
                title="${opts[k2].name}${opts[k2].status === 0 ? ' - Out of Stock' : ''}"
              >
                ${opts[k2].thumb ? `<img src="${opts[k2].thumb}" class="productview-options-thumb" />` : ''}
                ${opts[k2].colorValue ? `<div class="colorbox" style="background-color: ${opts[k2].colorValue};"></div>` : ''}
                <span>${opts[k2].name}</span>
              </a>
            </li>
          `
        })
        optionsHTML += `</ul>`
      }
    })
    optionsHTML += `</div>`

    return optionsHTML
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
