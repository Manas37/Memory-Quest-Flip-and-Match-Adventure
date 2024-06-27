const gameBoard = document.getElementById('game-board');
const nextLevelButton = document.getElementById('next-level');

let currentLevel = 1;
const maxLevel = 1000;

const generateCards = (level) => {
    const pairsCount = level + 1; // Increase pairs count with level
    const cards = [];
    for (let i = 0; i < pairsCount; i++) {
        const cardValue = String.fromCharCode(65 + i); // A, B, C, ...
        cards.push(cardValue, cardValue);
    }
    return cards.sort(() => 0.5 - Math.random());
};

const createGameBoard = (level) => {
    gameBoard.innerHTML = '';
    const cards = generateCards(level);

    // Set grid template columns based on number of cards
    const columns = Math.ceil(Math.sqrt(cards.length));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 80px)`;

    cards.forEach((cardValue) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-content', 'card-front');
        cardFront.innerText = cardValue;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-content', 'card-back');
        cardBack.innerText = '?';

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        gameBoard.appendChild(card);

        card.addEventListener('click', () => {
            card.classList.add('flip');
            checkMatch(card);
        });
    });
};

let flippedCards = [];
let matchedPairs = 0;

const checkMatch = (card) => {
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === currentLevel + 1) {
                nextLevelButton.classList.remove('hidden');
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                flippedCards = [];
            }, 1000);
        }
    }
};

nextLevelButton.addEventListener('click', () => {
    if (currentLevel < maxLevel) {
        currentLevel++;
        matchedPairs = 0;
        nextLevelButton.classList.add('hidden');
        createGameBoard(currentLevel);
    }
});

// Initialize the first level
createGameBoard(currentLevel);
