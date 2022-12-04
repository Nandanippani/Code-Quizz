var quizDuration = 60;
var questionIndex = 0;
var wrongPaneltySecs = 10;
var timer;

var start = document.getElementById('start');

start.addEventListener('click', function () {

    ShowTime();

    var startScreenEl = document.getElementById('start-screen');
    var questionsEl = document.getElementById('questions');

    startScreenEl.classList.remove('start');
    startScreenEl.classList.add('hide');

    questionsEl.classList.remove('hide');
    questionsEl.classList.add('start');

    displayQuestion(questions[questionIndex]);

});

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', function () {
    //  save score in local storage
    window.location.href = 'highscores.html';
});


function ShowTime() {
    var timeEl = document.getElementById('time');
    timer = setInterval(function () {
        if (quizDuration <= 0) {
            clearTimeout(timer);
            EndQuiz();
        }
        timeEl.textContent = quizDuration--;
    }, 1000);
}

function EndQuiz() {
    var endScreenEl = document.getElementById('end-screen');
    var questionsEl = document.getElementById('questions');
    questionsEl.classList.remove('start');
    questionsEl.classList.add('hide');
    endScreenEl.classList.remove('hide');
    endScreenEl.classList.add('start');
    clearTimeout(timer);
}

function displayQuestion(question) {
    var questionTitleEl = document.getElementById('question-title');
    questionTitleEl.textContent = question.question;
    var choicesEl = document.getElementById('choices');
    choicesEl.textContent = '';
    var ulEl = document.createElement('ul');
    choicesEl.style.textAlign = 'left';
    choicesEl.appendChild(ulEl);

    labelEl = document.createElement('label');
    choicesEl.appendChild(labelEl);

    for (var option of question.options) {
        var liEl = document.createElement('li');
        liEl.textContent = option.option;
        liEl.setAttribute('data-option', JSON.stringify(option));
        liEl.addEventListener('click', onOptionClick);
        ulEl.appendChild(liEl);
    }
}

function onOptionClick(event) {
    opt = JSON.parse(event.target.dataset.option);
    labelEl.textContent = opt.isCorrect ? 'Correct' : 'Wrong';
    quizDuration = opt.isCorrect ? quizDuration : quizDuration - wrongPaneltySecs;
    setTimeout(() => {
        questionIndex++;
        if (questionIndex < questions.length)
            displayQuestion(questions[questionIndex]);
        else
            EndQuiz();
    }, 1000);
}
