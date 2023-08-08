let cards = [];
let player = [];
let cpu = [];
let deck = [];
let table;

for (let i = 0; i <= 9; i++) {
    cards.push({ color: 'green', number: i.toString() });
    cards.push({ color: 'yellow', number: i.toString() });
    cards.push({ color: 'red', number: i.toString() });
    cards.push({ color: 'blue', number: i.toString() });
}

cards.sort(function () {
    return Math.random() - 0.5
});

for (let i = 1; i <= 7; i++) {
    player.push(cards.shift());
    cpu.push(cards.shift());
}

table = cards.shift();

deck = cards;

let turn = 1;


function createCardHtml(color, number, back = false) {
    return `<div class="card ${color} ${back ? 'back' : ''}" data-color="${color}" data-number="${number}">${number}</div>`;
}

const cpuContainer = document.querySelector('.cpu');
const tableContainer = document.querySelector('.table');
const playerContainer = document.querySelector('.player');
const deckContainer = document.querySelector('.deck');

for (let card of player) {
    playerContainer.innerHTML += createCardHtml(card.color, card.number);
}

for (let card of cpu) {
    cpuContainer.innerHTML += createCardHtml(card.color, card.number, false);
}

for (let card of deck) {
    deckContainer.innerHTML += createCardHtml(card.color, card.number, false);
}

tableContainer.innerHTML += createCardHtml(table.color, table.number);

let cardElements = document.querySelectorAll('.card');

for (let cardElement of cardElements) {
    cardElement.addEventListener('click', playCard);
}

function isCardPlayable(cardColor, cardNumber) {
    if (table.color === cardColor || table.number === cardNumber) {
        return true;
    }

    return false;
}

function canCurrentUserPlay() {
    let currentPlayerCards;
    if (turn === 1) {
        currentPlayerCards = document.querySelectorAll('.player .card');
    } else {
        currentPlayerCards = document.querySelectorAll('.cpu .card');
    }

    for (let card of currentPlayerCards) {
        if (isCardPlayable(card.dataset.color, card.dataset.number)) {
            return true;
        }
    }

    return false;
}

// changeTurn ile siranin kimde oldugunu belirler ve sirayi degistirir 1 veya 2 degil ise is deck false olur 

function changeTurn() {
    if (turn === 1) {
        turn = 2;
    } else {
        turn = 1;
    }
    isDeckUsed = false;
}


let isDeckUsed = false;

// oyun seansi baslar ilk olarak 

function playCard() {
    if (this.parentNode.classList.contains('table')) {
        return;
    }

    if (this.parentNode.classList.contains('deck')) {

        if (isDeckUsed === true) {
            return;
        }

        if (turn === 1) {
            this.classList.remove('back');
            playerContainer.appendChild(this);
        } else {
            cpuContainer.appendChild(this);
        }

        isDeckUsed = true;

        if (!canCurrentUserPlay()) {
            changeTurn();
        }

        return;
    }

    // tikladigin kart oynanabir degil ise donguyu bitir

    if (!isCardPlayable(this.dataset.color, this.dataset.number)) {
        return;
    }

    // sira birinci oyuncuda ise ve tikladigin kart karsidaki oyuncu ise donguyu bitir

    if (turn === 1 && this.parentNode.classList.contains('cpu')) {
        return;
    }

    // sira ikinci oyuncuda ise ve tikladigin kart karsidaki oyuncu ise donguyu bitir

    if (turn === 2 && this.parentNode.classList.contains('player')) {
        return;
    }

    // tikladigin kartin ust classini playerCardContainer a ata

    let playerCardContainer = this.parentNode;

    // tikladigin karti tableContainer altina ekle

    tableContainer.appendChild(this);

    //karsi taraftaki kartlarin masaya atilinca gorunur olmasi

    let gorunurYap = tableContainer.querySelectorAll('.card');

    for (var i = 0; i < gorunurYap.length; i++) {
        gorunurYap[i].classList.remove('back');
    }

    // table.coloru tikladigin kartin colorune esitle

    table.color = this.dataset.color;

    // table.numberi tikladigin kartin numberina esitle

    table.number = this.dataset.number;

    if (playerCardContainer.children.length === 0) {
        alert('Kazanan Oyuncu: ' + turn);

        cardElements.forEach(card => card.removeEventListener('click', playCard));
        return;
    }


    changeTurn();
}