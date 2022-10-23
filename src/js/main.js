$(document).ready(function(){
    let playerInterval;
    let playerPoints = 0
    let computerPoints = 0
    let computerSelection;
    
    // FadeIn and FadeOut animation of images for player and computer on screen
    let playerPic = $('#player').find('img');
    let computerPic = $('#computer').find('img');
    let playerImages = [
        '../images/rock.svg',
        '../images/paper.svg',
        '../images/scissors.svg',
    ];
    let computerImages = [
        '../images/scissors.svg',
        '../images/rock.svg',
        '../images/paper.svg',
    ];

    let i = 0;
    let v = 0;
    playerInterval = setInterval(function () {
        i = (i + 1) % playerImages.length;
        v = (v + 1) % computerImages.length;
        playerPic.fadeOut(550, function () {
            $(this).attr("src", playerImages[i]);
            $(this).fadeIn(1000);
        });
        computerPic.fadeOut(550, function () {
            $(this).attr("src", computerImages[i]);
            $(this).fadeIn(1000);
        });
    }, 5000);
    
    $('button').hover(
        function() {
            $(this).effect("shake", {direction: "up", times: 3, distance: 1}, 500);
        },
        function() {
            $(this).stop()
        }
    ),
    $('button').each(function(key, obj) {
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

        showPlayerDraw(playerSelection, computerImages)

        let result = checkWinner(playerSelection, computerSelection)
        console.log(result)
        if (result === "Player") {
            playerPoints++;
            $('#playScore').text(playerPoints)
        } else if (result === "Computer") {
            computerPoints++;
            $('#computerScore').text(computerPoints)
        }

        if (playerPoints === 5 || computerPoints === 5) {
            console.log("winner!!!")
            location.reload(true);
        }
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

    // Stop animation and show player's draw
    function showPlayerDraw(playerSelection, computerSelection) {
        let playerPic = $('#player').find('img');
        playerPic.attr('src', `../images/${playerSelection}.svg`);
        let computerPic = $('#computer').find('img');
        computerPic.attr('src', `../images/${playerSelection}.svg`);
        clearInterval(playerInterval)

        setTimeout(function() {
            playerInterval = setInterval(function () {
                i = (i + 1) % playerImages.length;
                v = (v + 1) % computerImages.length;
                playerPic.fadeOut(550, function () {
                    $(this).attr("src", playerImages[i]);
                    $(this).fadeIn(1000);
                });
                computerPic.fadeOut(550, function () {
                    $(this).attr("src", computerImages[i]);
                    $(this).fadeIn(1000);
                });
            }, 5000);
        },4000);
    }
 })