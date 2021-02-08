let gamePattern = [];
let playerPattern = [];
let buttonColours = ['red', 'blue', 'green', 'yellow'];
let on;
let compTurn;
let level = 0;
let good;
let win = false;

function newSequence() {
    $('h1').text('level: ' + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);
    playerPattern = [];
    let randomButton = document.querySelector('#' + randomChosenColor);
    makeAnimate(randomButton);
    makeSound(randomChosenColor);

    compTurn = false;
}

//starting game for any keypress
$(document).one('keypress', function(event) {

        if (event.keycode == '' || !on == true) {
            newSequence();
            on = true;

        } else {
            //  on = false;
        }
    })
    //Starting the game for start button
$('.start').on('click', function() {
    good = true;
    gameRestarted();
})

//taking value for player clicking 
$('.btn').on('click', function() {
    playerPattern.push(this.id);
    setTimeout(() => {
        gameCheck();
    }, 200)
    let userClicked = this.id;
    makeSound(userClicked);
    makeAnimate('.' + userClicked);
})

//making animate or flash the random button 
function makeAnimate(currentButton) {
    $(currentButton).fadeOut(200).fadeIn(200);
    $(currentButton).addClass('pressed');
    setTimeout(() => {
        $(currentButton).removeClass('pressed');
    }, 100);
}

//making sound for random button 
function makeSound(name) {
    let music = new Audio('./sounds/' + name + '.mp3');
    music.play();
}


function gameCheck() {
    if (playerPattern[playerPattern.length - 1] === gamePattern[playerPattern.length - 1]) {
        if (playerPattern.length == gamePattern.length) {
            level++;
            good = true;
            setTimeout(() => {
                newSequence();
            }, 1000);
            console.log(gamePattern + " :gp, pp:  " + playerPattern + " array: " + playerPattern.length + gamePattern.length);
            if (level >= 5) {
                win = true;
                good = true;
                gameWin();
            }
        }
    } else {
        good = false;
        gameRestarted();
        makeSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 500);
        $('h1').text('Game over!! Best Luck for next time.');
        $('h3').text('Now the game will be restarted');
        $('h3').css('color', 'white');
        $('h1').css('fontSize', '2rem');
        $('h3').fadeOut(100).fadeIn(800).fadeOut(200);
    }

}

function gameWin() {
    makeSound('green');
    $('h3').text('Congrats!! you have passed level 5...');
    $('h3').fadeOut(100).fadeIn(800).fadeOut(200);
    $('h3').addClass('pressed');
}

function gameRestarted() {
    level = 0;
    playerPattern = [];
    gamePattern = [];
    setTimeout(() => {
        newSequence();
    }, 800);
}