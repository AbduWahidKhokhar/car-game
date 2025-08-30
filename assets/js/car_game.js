var y = 100;
var p2y = -100;
var p3y = -200;
var p4y = -300;
var p5y = -400;
var score = 0;
var gameOver = false;

var isEngineStart = false
var randomPosition = [90, 150, 210, 270]
var cars = []

var timer = setInterval(function () {
    y += 100;
    if (y > 2000) {
        y = 1;
    }

    p2y += 10;
    p3y += 7;
    p4y += 4;
    p5y += 3;

    car2 = document.querySelector(".car2").style
    car2.top = p2y + "px";

    car3 = document.querySelector(".car3").style
    car3.top = p3y + "px";

    car4 = document.querySelector(".car4").style
    car4.top = p4y + "px";

    car5 = document.querySelector(".car5").style
    car5.top = p5y + "px";

    if (p2y > 600) {
        p2y = -100;
        generateCar2();
    }
    if (p3y > 600) {
        p3y = -200
        var random = Math.floor(Math.random() * 4)
        car3.left = randomPosition[random] + "px";
        car3.top = (p3y) + "px";
    }
    if (p4y > 600) {
        p4y = -300;
        var random = Math.floor(Math.random() * 4)
        car4.left = randomPosition[random] + "px";
        car4.top = (p4y) + "px";
    }
    if (p5y > 600) {
        p5y = -400;
        var random = Math.floor(Math.random() * 4)
        car5.left = randomPosition[random] + "px";
        car5.top = (p4y) + "px";
    }

    var road = document.querySelector(".road").style;
    road.backgroundPositionY = y + "px"

    if (!isEngineStart) {
        isEngineStart = true
    }

    score += 1;
    document.getElementById("score").innerText = "Score: " + score;
    crash()

}, 100);

function generateCar2() {
    var random = Math.floor(Math.random() * 4);
    var car2 = document.getElementById("car2").style;
    car2.left = randomPosition[random] + "px";
    car2.top = "-100px";
}
multipeCar();
function multipeCar() {
    cars = document.querySelectorAll(".cars")
    for (let i = 0; i < cars.length; i++) {
        car = document.querySelector(".car" + (i + 2)).style
        var random = Math.floor(Math.random() * 4);

        car.left = randomPosition[random] + "px";
        car.top = ((random + 1) * 100) + "px";
    }
}
let engineAudio = new Audio("./engine.mp3");
engineAudio.loop = true;

function isEngineStarted(isStart) {
    if (isStart) {
        if (engineAudio.paused) {
            engineAudio.play().catch(err => console.error("Playback Error", err))
        }
    } else {
        engineAudio.pause();
        engineAudio.currentTime = 0;
    }
}
document.addEventListener("keydown", function () {
    isEngineStarted(true);

}, { once: true });
let crashAudioPlayed = false;
isCrashed = false

function crash() {

    var player2 = document.getElementById("car2").getBoundingClientRect();
    var player1 = document.getElementById("car1").getBoundingClientRect();
    var player3 = document.querySelector(".car3").getBoundingClientRect();
    var player4 = document.querySelector(".car4").getBoundingClientRect();
    var player5 = document.querySelector(".car5").getBoundingClientRect();

    if (
        (player1.left < player2.right && player1.right > player2.left && player1.top < player2.bottom && player1.bottom > player2.top) ||
        (player1.left < player3.right && player1.right > player3.left && player1.top < player3.bottom && player1.bottom > player3.top) ||
        (player1.left < player4.right && player1.right > player4.left && player1.top < player4.bottom && player1.bottom > player4.top) ||
        (player1.left < player5.right && player1.right > player5.left && player1.top < player5.bottom && player1.bottom > player5.top)
    ) {

        clearInterval(timer);
        isEngineStarted(false);

        isCrashed = true

        if (!crashAudioPlayed) {
            new Audio("./crash.mp3").play();
            crashAudioPlayed = true;
        }
        
        document.getElementById("car1").style.backgroundImage = "url(./blastcar.png)"
        document.getElementById("game-over").style.display = "block";

    }
}

var carLeft = 100;
var carTop = 0;
document.onkeydown = function (event) {

    if (isCrashed) {
        return
    }

    switch (event.keyCode) {
        case 37:
            if (carLeft >= 70) {
                carLeft -= 10;

                var car = document.getElementById("car1").style;
                car.left = carLeft + "px";
            }
            break;
        case 39:
            if (carLeft <= 290) {
                carLeft += 10;
                var car = document.getElementById("car1").style;
                car.left = carLeft + "px";
            }
            break;
        case 40:
            if (carTop > 0) {
                carTop-=10;
                document.getElementById("car1").style.bottom = carTop + "px";
            }
            break;
        case 38:
            if (carTop <= 500) {
                carTop += 10;
                document.getElementById("car1").style.bottom = carTop + "px";
            }
            break;
    }

};
