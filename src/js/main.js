$(document).ready(function(){
    let winner = [0, 0]

    
    
    $('button').hover(
        function() {
            $(this).effect("shake", {direction: "up", times: 3, distance: 1}, 500);
        },
        function() {
            $(this).stop()
        }
    ),
    $('button').each(function(key, obj) {
        console.log(obj)
        $(obj).click(function() {
            let card = $(this).find('img').attr('alt');
            playGame(card);
        })
    })

    function playGame(card) {
        let playerSelection = card
        let computerSelection = Math.random();
        console.log(computerSelection)
        if (computerSelection < 0.3) {
            computerSelection = "Rock" 
        } else if (computerSelection < 0.6) {
            computerSelection = "Paper" 
        } else {
            computerSelection = "Scrissors" 
        }
        console.log(playerSelection, computerSelection);

        let result = checkWinner(playerSelection, computerSelection)
        console.log(result)
        if (result === "Player") {
            result += " wins!"
            winner[0]++;
        } else if (result === "Computer") {
            result += " wins!"
            winner[1]++;
        }
        $('#score').innerHTML = `Player 1 ${winner[0]} Player`
    }

    function checkWinner(pl, co) {
        if(pl === co) {
            return "Draw"
        }
        if (pl === "Rock") {
            if (co === "Paper") {
                return "Computer"
            } else {
                return "Player"
            }
        } 
        if (pl === "Paper") {
            if (co === "Scissors") {
                return "Computer"
            } else {
                return "Player"
            }
        }
        if (pl === "Scissors") {
            if (co === "Rock") {
                return "Computer"
            } else {
                return "Player"
            }
        }
    }
 })