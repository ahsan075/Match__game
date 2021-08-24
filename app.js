//===Variables===//

const cardsDiv = document.querySelector("#cards");
const nextCard = document.querySelector("#next-card");
const restart = document.querySelector(".restart");
const score = document.querySelector("#score");
const cardPics = document.querySelectorAll("li i");

let cardArray;
let count;

//===Shuffle===//

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//===Start and Restart===//

function start() {
    count = 0;
    score.innerHTML = count;
    cardArray = [];
    for (let card of cardPics) {
        card.parentElement.classList.remove("matched", "show");
        cardArray.push(card.className);
    }
    cardArray = shuffle(cardArray);

    for (let i = 0; i < cardArray.length; i++) {
        cardPics[i].className = cardArray[i];
    }

    nextCard.innerHTML = `<i class="${
        cardArray[nextCardIndexes(cardArray.length)]
    }"></i>`;
}

start();

restart.addEventListener("click", start);

function nextCardIndexes(n) {
    return Math.floor(Math.random() * n);
}

//===GameStructure===//

cardsDiv.addEventListener("click", function (e) {
    if (
        e.target.className === "card" &&
        !e.target.classList.contains("matched")
    ) {
        count++;
        score.innerHTML = count;

        if (e.target.children[0].className === nextCard.children[0].className) {
            e.target.classList.add("matched");
            cardArray = cardArray.filter(
                (element) => element !== e.target.children[0].className
            );
            nextCard.innerHTML = `<i class="${
                cardArray[nextCardIndexes(cardArray.length)]
            }"></i>`;
            if (cardArray.length === 0) {
                alert(`You win and your score is ${count}!`);
                start();
            }
        } else {
            e.target.classList.add("show");
        }

        setTimeout(() => {
            e.target.classList.remove("show");
        }, 500);
    }
});
