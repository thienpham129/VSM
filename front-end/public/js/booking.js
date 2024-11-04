function countDown(countDownDate) {
    var timer = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('[data-countdown-content=days]').html(days)
        $('[data-countdown-content=hours]').html(hours)
        $('[data-countdown-content=minutes]').html(minutes)
        $('[data-countdown-content=seconds]').html(seconds)

        if (distance < 0) {
            clearInterval(timer);
            $('[data-content=countdown]').html('Hết thời hạn giao dịch');
        }
    }, 1000);
}

// 

(function() {
    console.log(localStorage.getItem('MODAL_APP'))
    if (localStorage.getItem('MODAL_APP') == 'false') {
        // $('.fixed__app').hide()
        $('.fixed__app').addClass('goDowm');
    }
})();
$(".fixed__app__minimum").click(function() {
    $('.fixed__app').toggleClass('goDowm');
    localStorage.setItem('MODAL_APP', false);
})
$(".fixed__app__close").click(function() {
    $('.fixed__app').toggle();
    localStorage.setItem('MODAL_APP', false);
})

$(".fixed__hotline").click(function() {
    window.location.href = "tel:1900969671";
})

// 

var today = new Date();

$(`.routeDateSelected`).datepicker({
    format: 'dd/mm/yyyy',
    startDate: today,
    todayHighlight: true,
    orientation: 'bottom',
    autoclose: true,
});

$(`.routeDateSelected`).datepicker('setDate', today);

$('.routeDateSelected').on("changeDate", function(e) {
    let date = $(this).val()
    let pointUp = $(this).attr('data-startpoint')
    let pointDown = $(this).attr('data-endpoint')
    let url = `/dat-ve?date=${SearchTicket.changeFormatToDateParam(date)}&startPoint=${pointUp}&endPoint=${pointDown}`
    console.log(url)
    window.location = url
});

// booking 

console.log('window.location', window.location.pathname.indexOf('/dat-ve'))
if (window.location.pathname.indexOf('/dat-ve') === -1 || ($(window).width() >= 1024 && window.location.pathname.indexOf('/dat-ve') !== -1)) {
    var searchTicketDestop = new SearchTicket({
        wrap: '#js-SearchTicket',
        pointUpSelector: ".pointUp",
        pointDownSelector: ".pointDown",
        dateSelector: ".ticket_date",
        timeSelector: ".ticket_time",
        triggleSearchTicket: "[data-action=searchTrip]",
        textPointUpSelector: "[data-point-target=pointUp]",
        textPointDownSelector: "[data-point-target=pointDown]",
        target: "_SELF",

        pointUpData: function() {
            return "P0Tc1ybg01lyUen";
            return "P0Tc1ybg01lyUen";
        },
        pointDownData: function() {
            return "P0DA1s69pNKi9jG";
            return "P0DA1s69pNKi9jG";
        },
        dateData: function() {
            let date = "20241015";
            return SearchTicket.changeFormatToDisplay(date);

        },
        numberSeatData: function() {},
        timeData: function() {

        },
        listPointById: function() {
            return {
                "P0DA1s69pNKi9jG": {
                    "index": 0,
                    "alias": "qn-1-quy-nhon"
                },
                "P0DA1s6Auxag0uB": {
                    "index": 1,
                    "alias": "dn-21-da-nang"
                },
                "P0Tc1ybg01lyUen": {
                    "index": 2,
                    "alias": "sg-35-sai-gon"
                },
                "P0Qo1xUqqNc4L8S": {
                    "index": 18,
                    "alias": "h-28-hue"
                },
                "P0DA1s6AOKJthPd": {
                    "index": 24,
                    "alias": "nt-33-nha-trang"
                }
            };

        },
        doWhenChoseTime: function(data) {
            if (data.isValid) {
                let url = data.urlParam;

                window.location = url;

            }
        }
    });
} else if ($(window).width() < 1024 && window.location.pathname.indexOf('/dat-ve') !== -1) {
    var searchTicketMobile = new SearchTicketMobile({
        wrap: '#js-SearchTicketMobile',
        pointUpSelector: ".pointUp",
        pointDownSelector: ".pointDown",
        dateSelector: ".ticket_date",
        timeSelector: ".ticket_time",
        triggleSearchTicket: "[data-action=searchTrip]",
        textPointUpSelector: "[data-point-target=pointUp]",
        textPointDownSelector: "[data-point-target=pointDown]",
        target: "_SELF",

        pointUpData: function() {
            return "P0Tc1ybg01lyUen";
            return "P0Tc1ybg01lyUen";
        },
        pointDownData: function() {
            return "P0DA1s69pNKi9jG";
            return "P0DA1s69pNKi9jG";
        },
        dateData: function() {
            let date = "20241015";
            return SearchTicket.changeFormatToDisplay(date);

        },
        numberSeatData: function() {},
        timeData: function() {

        },
        listPointById: function() {
            return {
                "P0DA1s69pNKi9jG": {
                    "index": 0,
                    "alias": "qn-1-quy-nhon"
                },
                "P0DA1s6Auxag0uB": {
                    "index": 1,
                    "alias": "dn-21-da-nang"
                },
                "P0Tc1ybg01lyUen": {
                    "index": 2,
                    "alias": "sg-35-sai-gon"
                },
                "P0Qo1xUqqNc4L8S": {
                    "index": 18,
                    "alias": "h-28-hue"
                },
                "P0DA1s6AOKJthPd": {
                    "index": 24,
                    "alias": "nt-33-nha-trang"
                }
            };

        },
        doWhenChoseTime: function(data) {
            if (data.isValid) {
                let url = data.urlParam;

                window.location = url;

            }
        }
    });
}
var booking = new Booking({
    mainWrap: '.js__booking__destop',
    toggleProcessBookingClass: '.js__toggleProcessBooking',
    // useContract: "0"
    lang: "vi",
});

var bookingMobile = new Booking({
    mainWrap: '.bookingPage__mobile',
    toggleProcessBookingClass: '.js__toggleProcessBooking-mobile',
    // useContract: "0"
    lang: "vi",
});

let seatMapBuider = new SeatMapBuider({
    mainWrapSelector: '.js__booking__destop',
    toggleCreateMapClass: ".js--toggleCreateMap",
});

let seatMapBuiderMoBile = new SeatMapBuider({
    mainWrapSelector: '.bookingPage__mobile',
    toggleCreateMapClass: ".js--toggleCreateMapMobile",
});
let userLogin = new UserLogin({});

function verifyCallback(data) {
    UserLogin.updateGcaptchaToken(data);
}

// 

$('#js-banner--slide').owlCarousel({
    loop: true,
    // margin:10,
    // nav:true,
    lazyLoad: true,
    autoplayTimeout: 3000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplay: true,
    autoplayHoverPause: true,
    items: 1,
});

$('#js-paymentIntro--slide').owlCarousel({
    loop: false,
    margin: 30,
    // nav:true,
    autoplayTimeout: 10000,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});


$('[data-action=sort]').click(function() {
    let params = getURLParameters(window.location.href)
    let paramsString = "";
    let type = $(this).attr('data-filter');
    let val = $(this).attr('data-value');
    params[type] = val;

    $.each(params, function(key, value) {
        paramsString += `&${key}=${value}`;
    })
    window.location.href = '/dat-ve?' + paramsString;
})

$('.js--toggle__active-item').click(function() {
    $('.js--toggle__active-item').removeClass('active')
    $(this).toggleClass('active')
})

$('[data-action=back]').click(function() {
    window.history.back();
})