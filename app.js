//Remove overlay and start game
buttonStart.addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  startGame();

});

function getRandomMovie() {
  //Choose a random phrase
  let random = Math.floor(Math.random() * (moviesAndSounds.length));
  let movie = moviesAndSounds[random];
  //remove movie from array after selected and push it to another array
  let remove = moviesAndSounds.splice(random, 1);
  array2.push(remove[0]);
  //once all movies have been used, reset the array
  if (moviesAndSounds.length === 0) {
    moviesAndSounds = array2;
    array2 = [];
  }
  return movie;
}

/*This function sets the "movie" variable to random movie object
 then returns the sounds array asscociated w/ that object */
function pairMovieWithSounds() {
  movie = getRandomMovie();
  return movie.sounds;
}

//this function picks a random sound from the movie's sound array and plays it
function randomSounds(movieObject) {
  let sounds = movieObject.sounds;
  let random = Math.floor(Math.random() * (sounds.length));
  let audio = sounds[random];
  audio.play();

  //remove sounds from array after they're played
  let remove = sounds.splice(random, 1);
  array3.push(remove[0]);

  //once all movies have been used, reset the array
  if (sounds.length === 0) {
    movieObject.sounds = array3;
    array3 = [];
  }
  console.log(sounds);
  console.log(array3);

}

//event listener to play a random movie sound from the chosen movie
soundHint.addEventListener("click", () => {
  randomSounds(movie);
});


//this function calls all the functions needed to start a new game
function startGame() {
  pairMovieWithSounds();
  randomSounds(movie);
  addPhraseToDisplay();
  keyboardSetup();
}

//function breaks movie title into an array of letters
function movieTitleToArray() {
  let string = movie.title.toLowerCase();
  return string.split("");
}

//function adds the movie title to the "board" for gameplay
function addPhraseToDisplay() {
  let array = movieTitleToArray();

  for (let letters of array) {
    if (letters == " ") {
      phrase.innerHTML += `<li class="space">${letters}</li>`
    } else {
      phrase.innerHTML += `<li class="letter">${letters}</li>`
    }
  }
}

//function that checks if letter is in the phrase
function checkLetter(letter) {
  if (movieTitleToArray().includes(letter)) {
    return true;
  } else {
    return false;
  }
}

/* function that sets up the keyboard at the beginning of each game and
adds event listeners to all the letter keys */
function keyboardSetup() {
  for (let letters of keyboard) {
    letters.classList.remove("chosen", "wrong");
    letters.disabled = false;
  }
}

/* function for handling letter clicks -- shows the correct letters in the 
phrase and adds appropriate classes to the keyboard letters */
function gamePlay(letter) {
  if (checkLetter(letter)) {
    showLetterInPhrase(letter);
    correctLetter(letter);
  } else if (!checkLetter(letter)) {
    incorrectLetter(letter);
    missed += 1;
  }
}


function showLetterInPhrase(letter) {
  for (let letters of theLetters) {
    if (letters.textContent == letter) {
      letters.className = "show letter";
    }
  }
}

//handle correct letter guess
function correctLetter(letter) {
  for (let key of keyboard) {
    if (key.textContent == letter) {
      key.classList.add("chosen");
    }
  }
}

//handle incorrect letter guess
function incorrectLetter(letter) {
  for (let key of keyboard) {
    if (key.textContent == letter) {
      key.classList.add("wrong");
    }
  }
}

//function to reset all the things before a new game starts
function resetGame() {
  phrase.innerHTML = " ";
  missed = 0;
  //reset lives here somewhere;
  startGame();

}

newgame.addEventListener("click", () => {
    resetGame();
  }

);

//this loop sets the keyboard letters up for initial gameplay
for (let letters of keyboard) {
  letters.addEventListener("click", (e) => {
    let letter = e.target.textContent;
    gamePlay(letter);
  });
}