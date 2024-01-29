
// variables for choosing random question
// every question-page have two types of question. firstQ and secondQ
// randnum variable will choose what question to show
const firstQ = document.getElementById('firstQ');
const secondQ = document.getElementById('secondQ');
const randnum = Math.floor(Math.random() * 2) + 1;

// after randnum is chosen. we only show the chosen question like below.
// so every time we run, question can change.
// however question might not change by chances
if(document.title.length === 2){
    if(randnum === 1){
        firstQ.style.display = 'block';
        secondQ.style.display = 'none';
    }
    else{
        firstQ.style.display = 'none';
        secondQ.style.display = 'block';
    }

}

// function to change pages. when we retry the quiz score variable must be initialized to zero
// for fresh start
function nextPage(nextPage){
    window.location.href = nextPage;
    if(nextPage == 'q1.html'){
        sessionStorage.setItem('score', 0);
    }
}

// buttons for wrong answers. it will change color to red and goto next page.
// delay is programmed to see the color change.
function wrongAnswer(button, nextPage){
    // var button = document.getElementById('qButtons');
    button.style.backgroundColor = 'red';

    setTimeout(function() {
        window.location.href=nextPage;
    }, 1000);
}

// same as button above. Except since you are right. we increment score. and color change to green
function rightAnswer(button, nextPage){
    // var button = document.getElementById('qButtons');
    button.style.backgroundColor = 'green';
    increaseScore();

    var score = sessionStorage.getItem('score');
    updateScore(score);

    setTimeout(function() {
        window.location.href=nextPage;
    }, 1000);
}

// not used. created for debugging
function returnToStart(nextPage){
    window.location.href = nextPage;
}

// when correct, increase score
function increaseScore(){
    var score = sessionStorage.getItem('score');
    score = score ? parseInt(score):0;
    sessionStorage.setItem('score', score +1);
}

// everytime score is uploaded. we must update the score.
// to show it on top right corner of question page
window.onload = function(){
    //11-12
    if(sessionStorage.getItem('score') === null) {
        sessionStorage.setItem('score', 0);
    }

    var score = sessionStorage.getItem('score');
    console.log(score);
    updateScore(score);
}

function updateScore(score){
    const currentScore = document.querySelector(".current-score");
    currentScore.innerHTML = score;
}
// 11-12
// updateScore(0);

// for progress bar in top left corner of question page.
// since question page's title are set q1 q2 q3 q4. all of the lengths are 2
// so if length is not 2 it means we don't need a progress bar
// get title of each page. and get number part of title. like 1 2 3 4
// multiply the numbers with 25% and set it style.
// width will be set to 25%, 50%, 75%, 100%
function getProgress(){
    // console.log(25* Number(document.title.substring(1)) + "%");
    const progressPercent = document.querySelector(".percent");
    if(document.title.length===2){
        progressPercent.style.width = 25* Number(document.title.substring(1)) + "%"
    }
}
getProgress();
