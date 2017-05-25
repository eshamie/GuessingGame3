function generateWinningNumber(){
    return Math.floor(Math.random()*100+1)
}

function shuffle(arr){
    var i = arr.length,t,m;
    while(i){
        m = Math.floor(Math.random() * i--)
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess > this.winningNumber ? false:true
}

Game.prototype.playersGuessSubmission = function(num){
    
    if(num < 1 || num > 100 || typeof(num) !== 'number'){
        throw('That is an invalid guess.')
    }
    this.playersGuess = num;
    return this.checkGuess()
}

Game.prototype.checkGuess = function(){
    if(this.playersGuess === this.winningNumber){
        this.pastGuesses.push(this.playersGuess)
        return 'You Win!'
    } else if (this.pastGuesses.includes(this.playersGuess)){
        return 'You have already guessed that number.'
    } else if (this.pastGuesses.length >= 4){
        this.pastGuesses.push(this.playersGuess)
        return 'You Lose.'
    } else if(this.difference() < 10){
        this.pastGuesses.push(this.playersGuess)
        return 'You\'re burning up!'
    } else if(this.difference() < 25){
        this.pastGuesses.push(this.playersGuess)
        return 'You\'re lukewarm.'
    } else if (this.difference() < 50){
        this.pastGuesses.push(this.playersGuess)
        return 'You\'re a bit chilly.'
    } else {
        this.pastGuesses.push(this.playersGuess)
        return 'You\'re ice cold!'
    }
}

function newGame(){
    return new Game;
}

Game.prototype.provideHint = function(){
    var arr = [this.winningNumber,generateWinningNumber(),generateWinningNumber()];
    return shuffle(arr);
}


$(document).ready(function(){
    var play = newGame();
    $('#button').click(function(){
        $('h1').text(play.playersGuessSubmission(+$('#input').val()))
        if($('h1').text() === 'You Lose.' || $('h1').text() === 'You Win!'){
            console.log('reset game')
            $('#hint').prop('disabled', true)
            $('#button').prop('disabled',true)
            $('h2').text('Reset the Game');
        }
        for (var i = 0; i < play.pastGuesses.length; i++){
            $('.guess').eq(i).text(play.pastGuesses[i])
        }
        $('#input').val("");
        console.log(play.pastGuesses);
    })
    $('#reset').click(function(){
        location.reload()
    })
    $('#hint').click(function(){
        $('h1').text(play.provideHint())
    })

})