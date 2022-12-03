var questions = [
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": [
            {
                "id": 1,
                "option": "<js>",
                "isCorrect": false
            },
            {
                "id": 2,
                "option": "<scripting>",
                "isCorrect": false
            },
            {
                "id": 3,
                "option": "<javascript>",
                "isCorrect": false
            },
            {
                "id": 4,
                "option": "<script>",
                "isCorrect": true
            }

        ]
    },
    {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "options": [
            {
                "id": 1,
                "option": "<script src='xxx.js'>",
                "isCorrect": true
            },
            {
                "id": 2,
                "option": "<script href='xxx.js'>",
                "isCorrect": false
            },
            {
                "id": 3,
                "option": "<script name='xxx.js'>",
                "isCorrect": false
            },
            {
                "id": 4,
                "option": "<script name='xxx'>",
                "isCorrect": false
            }
        ]
    },
    {
        "question": "How do you write 'Hello World' in an alert box?",
        "options": [
            {
                "id": 1,
                "option": "msg('Hello World');",
                "isCorrect": false
            },
            {
                "id": 2,
                "option": "msgBox('Hello World');",
                "isCorrect": false
            },
            {
                "id": 3,
                "option": "alert('Hello World');",
                "isCorrect": true
            },
            {
                "id": 4,
                "option": "alertBox('Hello World');",
                "isCorrect": false
            }
        ]
    }
]


var start = document.getElementById('start');

start.addEventListener('click', function () {

    ShowTime();

    var startScreenEl = document.getElementById('start-screen');
    var questionsEl = document.getElementById('questions');

    startScreenEl.classList.remove('start');
    startScreenEl.classList.add('hide');

    questionsEl.classList.remove('hide');
    questionsEl.classList.add('start');

    var i = 0;

    displayQuestion(questions[i]);
    i++

});


function ShowTime() {
    secs = 60;
    var timeEl = document.getElementById('time');
    var timer = setInterval(function () {
        if (secs <= 0) {
            clearTimeout(timer);
        }
        timeEl.textContent = secs--;
    }, 1000);

}

function displayQuestion(question) {
    var questionTitleEl = document.getElementById('question-title');
    questionTitleEl.textContent = question.question;
    var choicesEl = document.getElementById('choices');
    var ulEl = document.createElement('ul');
    choicesEl.appendChild(ulEl);

    for (var option of question.options) {
        var liEl = document.createElement('li');
        liEl.textContent = option.option;
        ulEl.appendChild(liEl);
    }

}