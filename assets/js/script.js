// declare variables
var quizDuration;
var questionIndex;
var wrongPaneltySecs;
var timer;
var highScores;

document.addEventListener('DOMContentLoaded', function () {
    // on document load, initilise variables.
    timer = null;
    highScores = [];
    wrongPaneltySecs = 10;
    questionIndex = 0;
    quizDuration = 60;

    // store blank array in localstorage so we can use it later
    if (!localStorage.getItem('hc'))
        localStorage.setItem('hc', JSON.stringify(highScores));

    // initilise click events for Start and Submit buttons. 
    document.getElementById('start').addEventListener('click', startClick);
    document.getElementById('submit').addEventListener('click', submitClick);

});


function startClick() {
    // when quiz starts show time at the top-right corner
    ShowTime();

    var startScreenEl = document.getElementById('start-screen');
    var questionsEl = document.getElementById('questions');

    // hide start div 
    startScreenEl.classList.remove('start');
    startScreenEl.classList.add('hide');

    // show questions div
    questionsEl.classList.remove('hide');
    questionsEl.classList.add('start');

    // display first question
    displayQuestion(questions[questionIndex]);
}

function submitClick() {
    var initialsValue = document.getElementById('initials').value;
    var hScores = localStorage.getItem('hc');   // get saved scores from local storage
    highScores = JSON.parse(hScores);   // it is string array parsed to object
    highScores.push(initialsValue + '-' + quizDuration);    // new score and initials pushed to array

    localStorage.setItem('hc', JSON.stringify(highScores)); // stringify the array and save back to local storage  

    window.location.href = 'highscores.html'; // show high scores page
}

function ShowTime() {
    var timeEl = document.getElementById('time');
    // showing time
    timer = setInterval(function () {
        if (quizDuration <= 0) { // end the quiz when full  time elapsed 
            EndQuiz();
        }
        quizDuration--
        timeEl.textContent = quizDuration <= 0 ? 0 : quizDuration;  // avoiding score going below zero
    }, 1000);
}

function EndQuiz() {
    var endScreenEl = document.getElementById('end-screen');
    var questionsEl = document.getElementById('questions');

    // hide questions div
    questionsEl.classList.remove('start');
    questionsEl.classList.add('hide');

    // show end-screen div
    endScreenEl.classList.remove('hide');
    endScreenEl.classList.add('start');

    document.getElementById('final-score').textContent = document.getElementById('time').textContent;
    clearTimeout(timer);    // clear timeout
}

function displayQuestion(question) {
    // show question in question-title
    var questionTitleEl = document.getElementById('question-title');
    questionTitleEl.textContent = question.question;

    var choicesEl = document.getElementById('choices');

    // clear choices div for next question
    choicesEl.textContent = '';
    var ulEl = document.createElement('ul');
    choicesEl.style.textAlign = 'left';
    choicesEl.appendChild(ulEl);

    // create a label to show correct or incorrect
    labelEl = document.createElement('label');
    choicesEl.appendChild(labelEl);

    // show options for the question
    for (var option of question.options) {
        var liEl = document.createElement('li');
        liEl.textContent = option.option;
        liEl.setAttribute('data-option', JSON.stringify(option));
        liEl.addEventListener('click', onOptionClick);
        ulEl.appendChild(liEl);
    }
}

function onOptionClick(event) {
    // when any option is clicked
    opt = JSON.parse(event.target.dataset.option);
    // check for the answer; JSON option object has property called 'isCorrect' set for each option.
    // it'll be easy to check correct ans for selected option
    if (opt.isCorrect) {
        labelEl.textContent = 'Correct';    // display in the label
        document.getElementById('correctAns').play();   // play correct.wav file
    }
    else {
        labelEl.textContent = 'Wrong';   // display in the label
        quizDuration = quizDuration - wrongPaneltySecs; // deduct 10 secs from quiz duration for wrong ans
        document.getElementById('incorrectAns').play();  // play incorrect.wav file
    }

    setTimeout(() => {
        // show ans for one second and move to next question
        questionIndex++;
        if (questionIndex < questions.length)
            displayQuestion(questions[questionIndex]);
        else
            EndQuiz();  // when all questions answerd end the quiz.
    }, 1000);
}


