/* =====================================
   PAGE SYSTEM
===================================== */

let currentPage = 1;

const totalPages = 9;


/* =====================================
   MUSIC
===================================== */

let music = null;

let musicButton = null;

let musicPlaying = false;


/* =====================================
   VOICE
===================================== */

let voiceAudio = null;

let voiceButton = null;

let voiceStatus = null;

let voiceProgress = null;


/* =====================================
   SHOW PAGE
===================================== */

function showPage(pageNumber) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(
            "page" + pageNumber
        );


    if (!target) {

        console.error(
            "Page not found:",
            pageNumber
        );

        return;
    }


    target.classList.add("active");

    target.scrollTop = 0;

    currentPage = pageNumber;


    /*
       وقتی وارد صفحه ویس شدیم
       موزیک اصلی کمی متوقف می‌شود
       تا صدای شخصی واضح شنیده شود.
    */

    if (pageNumber === 7) {

        if (
            music &&
            !music.paused
        ) {

            music.pause();

            musicPlaying = false;

            updateMusicButton();

        }

    }

}


/* =====================================
   NEXT PAGE
===================================== */

function nextPage() {

    if (currentPage === 1) {

        startMusic();

    }


    if (currentPage < totalPages) {

        currentPage++;

        showPage(currentPage);

    }

}


/* =====================================
   QUIZ
===================================== */

function quizAnswer() {

    alert(
        "هر جوابی که بدی، بازم خیلی خیلی عاشقتم ❤️"
    );

    nextPage();

}


/* =====================================
   PASSWORD
===================================== */

function checkPassword() {

    const input =
        document.getElementById(
            "password"
        );


    const message =
        document.getElementById(
            "message"
        );


    const password =
        input.value.trim();


    if (password === "2788") {

        message.innerText =
            "رمز درست بود ❤️";


        setTimeout(function() {

            nextPage();

        }, 700);


    } else {

        message.innerText =
            "رمز اشتباهه 😏 دوباره امتحان کن...";

    }

}


/* =====================================
   PASSWORD ENTER KEY
===================================== */

function handlePasswordKey(event) {

    if (
        event.key === "Enter"
    ) {

        checkPassword();

    }

}


/* =====================================
   MUSIC INITIALIZE
===================================== */

function initializeMusic() {

    music =
        document.getElementById(
            "backgroundMusic"
        );


    musicButton =
        document.getElementById(
            "musicButton"
        );


    if (music) {

        music.volume = 0.35;

    }

}


/* =====================================
   START MUSIC
===================================== */

function startMusic() {

    if (!music) {

        initializeMusic();

    }


    if (!music) {

        return;

    }


    music.volume = 0.35;


    music.play()

        .then(function() {

            musicPlaying = true;

            updateMusicButton();

        })

        .catch(function(error) {

            console.log(
                "Music autoplay prevented:",
                error
            );

        });

}


/* =====================================
   TOGGLE MUSIC
===================================== */

function toggleMusic() {

    if (!music) {

        initializeMusic();

    }


    if (!music) {

        return;

    }


    if (music.paused) {

        music.play()

            .then(function() {

                musicPlaying = true;

                updateMusicButton();

            })

            .catch(function(error) {

                console.log(error);

            });


    } else {

        music.pause();

        musicPlaying = false;

        updateMusicButton();

    }

}


/* =====================================
   MUSIC BUTTON
===================================== */

function updateMusicButton() {

    if (!musicButton) {

        musicButton =
            document.getElementById(
                "musicButton"
            );

    }


    if (!musicButton) {

        return;

    }


    if (musicPlaying) {

        musicButton.innerHTML =
            "🔊";

        musicButton.classList.add(
            "playing"
        );


    } else {

        musicButton.innerHTML =
            "🎵";

        musicButton.classList.remove(
            "playing"
        );

    }

}


/* =====================================
   VOICE INITIALIZE
===================================== */

function initializeVoice() {

    voiceAudio =
        document.getElementById(
            "voiceAudio"
        );


    voiceButton =
        document.getElementById(
            "voiceButton"
        );


    voiceStatus =
        document.getElementById(
            "voiceStatus"
        );


    voiceProgress =
        document.getElementById(
            "voiceProgress"
        );


    if (!voiceAudio) {

        return;

    }


    voiceAudio.addEventListener(
        "timeupdate",
        updateVoiceProgress
    );


    voiceAudio.addEventListener(
        "ended",
        function() {

            voiceButton.innerHTML =
                "▶";

            voiceStatus.innerText =
                "تموم شد ❤️";

            voiceProgress.style.width =
                "0%";

        }
    );


    voiceAudio.addEventListener(
        "loadedmetadata",
        function() {

            voiceStatus.innerText =
                formatTime(
                    voiceAudio.duration
                );

        }
    );

}


/* =====================================
   TOGGLE VOICE
===================================== */

function toggleVoice() {

    if (!voiceAudio) {

        initializeVoice();

    }


    if (!voiceAudio) {

        return;

    }


    /*
       اگر موزیک اصلی در حال پخش است،
       برای صدای شخصی متوقفش می‌کنیم.
    */

    if (
        music &&
        !music.paused
    ) {

        music.pause();

        musicPlaying = false;

        updateMusicButton();

    }


    if (voiceAudio.paused) {

        voiceAudio.play()

            .then(function() {

                voiceButton.innerHTML =
                    "❚❚";

                voiceStatus.innerText =
                    "دارم برات حرف می‌زنم... ❤️";

            })

            .catch(function(error) {

                console.error(
                    "Voice playback error:",
                    error
                );

                voiceStatus.innerText =
                    "فایل voice.mp3 پیدا نشد.";

            });


    } else {

        voiceAudio.pause();

        voiceButton.innerHTML =
            "▶";

        voiceStatus.innerText =
            "متوقف شد";

    }

}


/* =====================================
   VOICE PROGRESS
===================================== */

function updateVoiceProgress() {

    if (
        !voiceAudio ||
        !voiceAudio.duration
    ) {

        return;

    }


    const percent =
        (
            voiceAudio.currentTime /
            voiceAudio.duration
        ) * 100;


    voiceProgress.style.width =
        percent + "%";


    voiceStatus.innerText =
        formatTime(
            voiceAudio.currentTime
        )
        +
        " / "
        +
        formatTime(
            voiceAudio.duration
        );

}


/* =====================================
   FORMAT AUDIO TIME
===================================== */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "00:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =====================================
   IMAGE VIEWER
===================================== */

function openImage(imagePath) {

    const viewer =
        document.getElementById(
            "imageViewer"
        );


    const image =
        document.getElementById(
            "viewerImage"
        );


    image.src =
        imagePath;


    viewer.classList.add(
        "active"
    );

}


function closeImage(event) {

    /*
       اگر روی خود عکس کلیک شد،
       Viewer بسته نشود.
    */

    if (
        event &&
        event.target &&
        event.target.id ===
        "viewerImage"
    ) {

        return;

    }


    const viewer =
        document.getElementById(
            "imageViewer"
        );


    const image =
        document.getElementById(
            "viewerImage"
        );


    viewer.classList.remove(
        "active"
    );


    setTimeout(function() {

        image.src = "";

    }, 300);

}


/* =====================================
   ESC
===================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeImage();

        }

    }
);


/* =====================================
   RESTART
===================================== */

function restart() {

    currentPage = 1;


    if (voiceAudio) {

        voiceAudio.pause();

        voiceAudio.currentTime = 0;

    }


    if (music) {

        music.pause();

        music.currentTime = 0;

        musicPlaying = false;

        updateMusicButton();

    }


    if (voiceButton) {

        voiceButton.innerHTML =
            "▶";

    }


    if (voiceStatus) {

        voiceStatus.innerText =
            "برای پخش لمس کن";

    }


    if (voiceProgress) {

        voiceProgress.style.width =
            "0%";

    }


    showPage(1);

}


/* =====================================
   INITIALIZE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeMusic();

        initializeVoice();

        showPage(1);

    }
);