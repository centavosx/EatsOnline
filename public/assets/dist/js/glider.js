new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  slidesToScroll: 4,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next',
  },
  responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 1900,
      settings: {
        // Set to auto and provide item width to adjust to viewport
        slidesToShow: 5.8,
        slidesToScroll: 2,
      },
    },

    {
      // screens greater than >= 775px
      breakpoint: 1700,
      settings: {
        // Set to auto and provide item width to adjust to viewport
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      // screens greater than >= 775px
      breakpoint: 1400,
      settings: {
        // Set to auto and provide item width to adjust to viewport
        slidesToShow: 4.3,
        slidesToScroll: 2,
      },
    },
    {
      // screens greater than >= 775px
      breakpoint: 1200,
      settings: {
        // Set to auto and provide item width to adjust to viewport
        slidesToShow: 3.7,
        slidesToScroll: 2,
      },
    },

    {
      // screens greater than >= 1024px
      breakpoint: 959,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      // screens greater than >= 1024px
      breakpoint: 740,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 1,
      },
    },
    {
      // screens greater than >= 1024px
      breakpoint: 640,
      settings: {
        slidesToShow: 1.8,
        slidesToScroll: 1,
      },
    },
    {
      // screens greater than >= 1024px
      breakpoint: 304,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
    {
      // screens greater than >= 1024px
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})
