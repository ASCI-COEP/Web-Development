const apiKey = 'ENTER YOUR API KEY';

(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.nav-bar').addClass('nav-sticky');
        } else {
            $('.nav-bar').removeClass('nav-sticky');
        }
    });


    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 768) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Top News Slider
    $('.tn-slider').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    // Category News Slider
    $('.cn-slider').slick({
        autoplay: false,
        infinite: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


    // Related News Slider
    $('.sn-slider').slick({
        autoplay: false,
        infinite: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
})(jQuery);




// get news

let topics = ["science", "technology", "sports", "politics", "health", "food", "education", "business", "history"]



function getNews(e) {

    for (let j = 0; j < topics.length; j++) {
        let temp = ".cards-row-" + topics[j];
        const row_cards = document.querySelector(temp);
        let topic = topics[j];

        let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`

        fetch(url).then((res) => {
            return res.json()
        }).then((data) => {

            for (let i = 3; i < 15; i++) {

                var divC = document.createElement('div');
                divC.className = 'col';

                var divBody = document.createElement('div');
                divBody.className = 'card-body';

                var divCard = document.createElement('div');
                divCard.className = 'card';

                var h5 = document.createElement('h5');
                h5.className = 'card-title';

                let a = document.createElement('a');
                let a_img = document.createElement('a');

                var p = document.createElement('p');
                p.className = 'card-text';
                p.classList.add('module');
                p.classList.add('truncate');

                var divBody = document.createElement('div');
                divBody.className = 'card-body';
                divBody.setAttribute("style", "height: 256.55px");

                var img = document.createElement('img');
                img.className = 'card-img-top';
                img.width = 382;
                img.height = 200.55;

                p.setAttribute('text', data.articles[i].description)
                a.setAttribute('href', data.articles[i].url)
                a.setAttribute('target', '_blank')
                a_img.setAttribute('href', data.articles[i].url)
                a_img.setAttribute('target', '_blank')
                divCard.setAttribute("style", "width: 24rem;")
                img.src = data.articles[i].urlToImage
                a.textContent = data.articles[i].title;
                p.textContent = data.articles[i].description;
                a_img.append(img);
                h5.append(a);
                divBody.append(h5);
                divBody.append(p);
                divCard.append(a_img);
                divCard.append(divBody);
                divC.append(divCard);
                row_cards.append(divC);

            }
        }

        ).catch((error) => {
            console.log(error)
        })

    }
}
getNews()


// top news filter

function getTopNews(e) {

    for (let j = 0; j < topics.length; j++) {
        let temp = ".top-cards-row-" + topics[j];
        const row_top_cards = document.querySelector(temp);
        let topic = topics[j];


        let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`

        fetch(url).then((res) => {
            return res.json()
        }).then((data) => {

            for (let i = 0; i < 3; i++) {

                var divC = document.createElement('div');
                divC.className = 'col-sm-4';

                var divImg = document.createElement('div');
                divImg.className = 'cn-img zoom';

                var divTitle = document.createElement('div');
                divTitle.className = 'cn-title';

                let a = document.createElement('a');
                let a_img = document.createElement('a');

                var p = document.createElement('p');

                var img = document.createElement('img');
                img.className = 'card-img-top';

                p.setAttribute("style", "color : white;")
                a.setAttribute('href', data.articles[i].url)
                a.setAttribute('target', '_blank')

                a_img.setAttribute('href', data.articles[i].url)
                a_img.setAttribute('target', '_blank')

                img.src = data.articles[i].urlToImage
                img.width = 463.2;
                img.height = 295.11;

                a.textContent = data.articles[i].title;
                a_img.append(img);

                p.append(a);
                divTitle.append(p);
                divImg.append(a_img);
                divImg.append(divTitle);
                divC.append(divImg);
                row_top_cards.append(divC);
            }
        }

        ).catch((error) => {
            console.log(error)
        })

    }
}
getTopNews()



// news by tags 

var searchForm = document.querySelector('.search');
var input = document.querySelector('.input');
const newsList = document.querySelector('.news-list');

searchForm.addEventListener('submit', retrieve)
searchForm.addEventListener('submit', clearDefault)

function retrieve(e) {
    let topic = input.value;
    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`
    newsList.innerHTML = "";
    e.preventDefault()
    fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data.articles)

        for (let i = 0; i < 15; i++) {

            var divC = document.createElement('div');
            divC.className = 'col';

            var divBody = document.createElement('div');
            divBody.className = 'card-body';

            var divCard = document.createElement('div');
            divCard.className = 'card';

            var h5 = document.createElement('h5');
            h5.className = 'card-title';

            let a = document.createElement('a');
            let a_img = document.createElement('a');

            var p = document.createElement('p');
            p.className = 'card-text';
            p.classList.add('module');
            p.classList.add('truncate');

            var divBody = document.createElement('div');
            divBody.className = 'card-body';
            divBody.setAttribute("style", "height: 256.55px");

            var img = document.createElement('img');
            img.className = 'card-img-top';
            img.width = 382;
            img.height = 200.55;

            p.setAttribute('text', data.articles[i].description)
            a.setAttribute('href', data.articles[i].url)
            a.setAttribute('target', '_blank')
            a_img.setAttribute('href', data.articles[i].url)
            a_img.setAttribute('target', '_blank')
            divCard.setAttribute("style", "width: 24rem;")
            img.src = data.articles[i].urlToImage
            a.textContent = data.articles[i].title;
            p.textContent = data.articles[i].description;
            a_img.append(img);
            h5.append(a);
            divBody.append(h5);
            divBody.append(p);
            divCard.append(a_img);
            divCard.append(divBody);
            divC.append(divCard);
            newsList.append(divC);
        }
    }

    ).catch((error) => {
        console.log(error)
    })
}

// default news

const newsListDefualt = document.querySelector('.news-list-default');



function getDefaultNews(e) {
    let topic = "India"
    let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`
    newsListDefualt.innerHTML = "";
    fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data.articles)

        for (let i = 0; i < 3; i++) {

            var divC = document.createElement('div');
            divC.className = 'col';
            divC.style.display = 'inline-flex';

            var divBody = document.createElement('div');
            divBody.className = 'card-body';

            var divCard = document.createElement('div');
            divCard.className = 'card';

            var h5 = document.createElement('h5');
            h5.className = 'card-title';

            let a = document.createElement('a');
            let a_img = document.createElement('a');

            var p = document.createElement('p');
            p.className = 'card-text';
            p.classList.add('module');
            p.classList.add('truncate');

            var divBody = document.createElement('div');
            divBody.className = 'card-body';
            divBody.setAttribute("style", "height: 256.55px");

            var img = document.createElement('img');
            img.className = 'card-img-top';
            img.width = 382;
            img.height = 200.55;

            p.setAttribute('text', data.articles[i].description)
            a.setAttribute('href', data.articles[i].url)
            a.setAttribute('target', '_blank')
            a_img.setAttribute('href', data.articles[i].url)
            a_img.setAttribute('target', '_blank')
            divCard.setAttribute("style", "width: 24rem;")
            img.src = data.articles[i].urlToImage
            a.textContent = data.articles[i].title;
            p.textContent = data.articles[i].description;
            a_img.append(img);
            h5.append(a);
            divBody.append(h5);
            divBody.append(p);
            divCard.append(a_img);
            divCard.append(divBody);
            divC.append(divCard);
            newsListDefualt.append(divC);
        }
    }

    ).catch((error) => {
        console.log(error)
    })
}
getDefaultNews()

// newsListDefualt.style.display = "inline-block"

function clearDefault(){
    if (input.value === ""){
        getDefaultNews()
        newsListDefualt.style.display = "block"       
    }
    else {
        newsListDefualt.style.display = "none"
    }
    
}