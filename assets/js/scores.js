
document.addEventListener('DOMContentLoaded', function () {

    var hScores = localStorage.getItem('hc');   // get scores from local storage
    highScores = JSON.parse(hScores);   // convert to array object

    var olEl = document.getElementById('highscores');

    // show all high scores
    for (var score of highScores) {
        var liEl = document.createElement('li');
        liEl.textContent = score;
        olEl.appendChild(liEl);
    }

    document.getElementById('clear').addEventListener('click', function () {
        localStorage.removeItem('hc');   // clear the local storage 
        olEl.textContent = '';           // clear ol element.
    });

});