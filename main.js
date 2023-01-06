$(document).ready(function () {
  let playerInterval;
  let playerPoints = 0;
  let computerPoints = 0;
  let modalOpened = false;

  // FadeIn and FadeOut animation of images for player and computer on screen
  let playerPic = $("#player").find("img");
  let computerPic = $("#computer").find("img");
  let playerImages = ["./rock.png", "./paper.png", "./scissors.png"];
  let computerImages = ["./scissors.png", "./rock.png", "./paper.png"];

  let i = 0;
  let v = 0;
  playerInterval = setInterval(function () {
    $("button").prop("disabled", false);
    i = (i + 1) % playerImages.length;
    v = (v + 1) % computerImages.length;
    playerPic.fadeOut(100, "linear", function () {
      $(this).attr("src", playerImages[i]);
      $(this).fadeIn(100);
    });
    computerPic.fadeOut(100, "linear", function () {
      $(this).attr("src", computerImages[i]);
      $(this).fadeIn(100);
    });
  }, 1000);

  $("button").hover(
    function () {
      $(this).effect("shake", { direction: "up", times: 3, distance: 1 }, 500);
    },
    function () {
      $(this).stop();
    }
  ),
    $("button").each(function (key, obj) {
      $(obj).click(function () {
        let card = $(this).find("img").attr("alt");
        playGame(card);
      });
    });

  function playGame(card) {
    let playerSelection = card;

    let computerSelection = Math.random();
    if (computerSelection < 0.3) {
      computerSelection = "Rock";
    } else if (computerSelection < 0.6) {
      computerSelection = "Paper";
    } else {
      computerSelection = "Scissors";
    }

    // showPlayerDraw(playerSelection, computerSelection)

    let result = checkWinner(playerSelection, computerSelection);
    console.log(result);
    if (result === "Player") {
      playerPoints++;
      $("#playScore").text(playerPoints);
    } else if (result === "Computer") {
      computerPoints++;
      $("#computerScore").text(computerPoints);
    }

    if (playerPoints === 5 || computerPoints === 5) {
      modalOpened = true;
      setTimeout(function () {
        // show up modal here
        if (modalOpened) {
          clearInterval(playerInterval);
          $("#modal").css({ display: "block" });
          if (playerPoints === 5) {
            $("#winner").text("You are winner!!");
          } else {
            $("#winner").text("You lost the game...");
          }
          $("#restart").click(function () {
            modalOpened = false;
            // close modal here
            $("#modal").css({ display: "none" });
            location.reload(true);
          });
        }
      }, 1000);
    } else {
      showPlayerDraw(playerSelection, computerSelection);
    }
  }

  function checkWinner(pl, co) {
    if (pl === co) {
      return "Draw";
    }
    if (pl === "Rock") {
      if (co === "Paper") {
        return "Computer";
      } else {
        return "Player";
      }
    }
    if (pl === "Paper") {
      if (co === "Scissors") {
        return "Computer";
      } else {
        return "Player";
      }
    }
    if (pl === "Scissors") {
      if (co === "Rock") {
        return "Computer";
      } else {
        return "Player";
      }
    }
  }

  // Stop animation and show player's draw
  function showPlayerDraw(playerSelection, computerSelection) {
    playerPic.attr("src", `./${playerSelection}.png`);
    computerPic.attr("src", `./${computerSelection}.png`);

    $("button").prop("disabled", true).css({ cursor: "not-allowed" }),
      // $('button').hover(function(){
      //     $(this).css({"background":"#d1d5db"})
      // }),
      clearInterval(playerInterval);

    setTimeout(function () {
      playerInterval = setInterval(function () {
        $("button").prop("disabled", false).css({ cursor: "pointer" }),
          // $('button').hover(function(){
          //     $(this).css({"background":"#e5e7eb"})
          // }),
          (i = (i + 1) % playerImages.length);
        v = (v + 1) % computerImages.length;
        playerPic.fadeOut(100, "linear", function () {
          $(this).attr("src", playerImages[i]);
          $(this).fadeIn(100);
        });
        computerPic.fadeOut(100, "linear", function () {
          $(this).attr("src", computerImages[i]);
          $(this).fadeIn(100);
        });
      }, 1000);
    }, 1500);
  }
});
