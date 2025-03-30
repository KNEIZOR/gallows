const lettersHTML = document.querySelector(".letters");
const wordHTML = document.querySelector(".word");
const resultHTML = document.querySelector(".result");
const stagesHTML = document.querySelectorAll(".stage");
const countPromtHTML = document.querySelector(".count-prompt");

let isGame = true;

let stage = 0;
const maxStage = 7;
let promptLettersStage = 0;
let countPrompt = 0;

const letters = [
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ё",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "ь",
    "ы",
    "ъ",
    "э",
    "ю",
    "я",
];
const words = ["кошка", "собака", "попугай", "озеро", "гора"];

for (let i = 0; i < letters.length; i++) {
    let div = document.createElement("div");
    div.className = "letter";
    div.innerHTML = `<p class="${letters[i]}">${letters[i]}</p>`;
    div.onclick = (event) => {
        check(event.target);
    };
    lettersHTML.append(div);
}

function wordFn() {
    const secretWord = words[Math.floor(Math.random() * words.length)];

    const secretLetters = secretWord.split("");

    for (let i = 0; i < secretLetters.length; i++) {
        let div = document.createElement("div");
        div.className = "secret-letter";
        div.innerHTML = `<p class="${secretLetters[i]}">${secretLetters[i]}</p>`;
        wordHTML.append(div);
    }

    return secretLetters;
}

wordFn();

let secterLettersHTML = document.querySelectorAll(".secret-letter");

function check(letter) {
    if (!isGame) return;

    let prev = null;
    let pLetter = letter.closest("p");

    if (!pLetter) return;

    for (let i = 0; i < secterLettersHTML.length; i++) {
        if (
            secterLettersHTML[i].children[0].classList[0] ===
            pLetter.classList[0]
        ) {
            secterLettersHTML[i].children[0].classList.add("show");
            prev = secterLettersHTML[i].children[0].classList[0];
        }
    }

    if (!prev) {
        if (stage === maxStage) {
            return;
        }
        stagesHTML[stage].classList.add("show");
        stage += 1;
        if (stage === maxStage) {
            isGame = false;
            resultHTML.children[0].innerHTML = "ВЫ ПРОИГРАЛИ!";
            resultHTML.style.color = "red";
        }
    }


    win();
}

function win() {
    for (let i = 0; i < secterLettersHTML.length; i++) {
        if (secterLettersHTML[i].children[0].classList[1] !== "show") {
            return;
        }
    }

    isGame = false;
    resultHTML.children[0].innerHTML = "ВЫ ПОБЕДИЛИ!";
    resultHTML.style.color = "green";
    countPrompt += 1;
    countPromtHTML.innerHTML = countPrompt
}

function restart() {
    isGame = true;
    wordHTML.innerHTML = "";

    wordFn();

    secterLettersHTML = document.querySelectorAll(".secret-letter");
    stage = 0;

    for (let i = 0; i < stagesHTML.length; i++) {
        stagesHTML[i].classList.remove("show");
    }

    resultHTML.children[0].innerHTML = "";
    promptLettersStage = 0;
}

function promptLetter() {
    if (secterLettersHTML.length === promptLettersStage) return;
    if (countPrompt <= 0) return;

    secterLettersHTML[promptLettersStage].children[0].classList.add("show");
    promptLettersStage += 1;
    countPrompt -= 1;
    countPromtHTML.innerHTML = countPrompt

    win();
}
