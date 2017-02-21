$(document).ready(function() {

  AOS.init();

    var lazyload = lazyload || {};
    var page = 2,
        buttonId = "#more-button-reach",
        loadingId = "#loading-div",
        container = "#smart-portfolio-reach";

    lazyload.load = function() {

        var url = "./pages-reach/" + page + ".html";

        // $(buttonId).hide();
        // $(loadingId).show();

        $.ajax({
            url: url,
            success: function(response) {
                if (!response || response.trim() == "NONE") {
                    $(buttonId).fadeOut();
                    return;
                }
                appendContests(response);
            },
            error: function(response) {
                $(loadingId).text("К сожалению, возникла какая-то ошибка при запросе. Пожалуйста, обновите страницу.");
            }
        });
    };



    var appendContests = function(response) {

        $(buttonId).show();
        $(loadingId).hide();

        $(response).appendTo($(container));
        page += 1;
        if (page == 7) {
            $(buttonId).hide();
        }
    };

    $("#more-button-reach").click(function() {
        lazyload.load()
    });

    function uploadVideo(selected) {
        if (selected.find('video').length > 0) {
            //video has been already loaded - play it
            selected.find('video').show().get(0).play();
        } else {
            //load video - the name of the video is the data-video of the image
            var videoUrl = selected.find('.cd-image-container img').data('video'),
                video = $('<video id="video" autobuffer autoplay preload="auto" poster="img/screen-1.jpg" loop><source src="' + videoUrl + '.mp4" type="video/mp4" />Sorry, your browser does not support HTML5 video.</video>');
            video.appendTo(selected.find('.cd-image-wrapper').fadeTo());
        }
    }

    function func() {
        return randomInteger(1, 3);
    }

    setInterval(func, 1000);

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }
    uploadVideo($(".header-block-rich"));

    new WOW().init();

    var changeButtonState = function(type) {
        // Play/Pause button
        if (type == 'playpause') {
            if (video.paused || video.ended) {
                playpause.setAttribute('data-state', 'play');
            } else {
                playpause.setAttribute('data-state', 'pause');
            }
        }
    }

    var playpause = document.getElementById('playpause'),
        video = document.getElementById('video');



    video.addEventListener('play', function() {
        changeButtonState('playpause');
    }, false);
    video.addEventListener('pause', function() {
        changeButtonState('playpause');
    }, false);


    playpause.addEventListener('click', function(e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
    });

    $(window).resize(function() {
        if ($(window).width() > 768) {
            playpause.addEventListener('click', function(e) {
                if (video.paused || video.ended) video.play();
                else video.pause();
            });
        }
    });


});
