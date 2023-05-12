let cards = [];
let player = [];
let cpu = [];
let deck = [];
let table;

// Kartları olusturma ve cards dizisine pushlama

for(let i = 0; i <= 9; i++) {
    cards.push({ color: 'green', number: i.toString() });
    cards.push({ color: 'yellow', number: i.toString() });
    cards.push({ color: 'red', number: i.toString() });
    cards.push({ color: 'blue', number: i.toString() });
}

// Kartları karıştırma

cards.sort(function() {
    return Math.random() - 0.5
});

// Kartları dağıtma

for(let i = 1; i <= 7; i++) {
    player.push(cards.shift());
    cpu.push(cards.shift());
}

// Masa kartını verme

table = cards.shift();

// Kalan kartlar

deck = cards;

// Sıra

let turn = 1;

// Kartları html ye yazdırma

function createCardHtml(color, number) {
    return `<div class="card ${color}" data-color="${color}" data-number="${number}">${number}</div>`;
}

// Html de ki classları secme ve onları atama 

const cpuContainer = document.querySelector('.cpu');
const tableContainer = document.querySelector('.table');
const playerContainer = document.querySelector('.player');
const deckContainer = document.querySelector('.deck');

// Kartları dizi içerisinden HTML e yazdırma

for(let card of player) {
    playerContainer.innerHTML += createCardHtml(card.color, card.number);
}

for(let card of cpu) {
    cpuContainer.innerHTML += createCardHtml(card.color, card.number);
}

for(let card of deck) {
    deckContainer.innerHTML += createCardHtml(card.color, card.number);
}

// Masada ki kartı yazdırma 

tableContainer.innerHTML += createCardHtml(table.color, table.number);


// Bütün card classlarını cardElementse aktar

let cardElements = document.querySelectorAll('.card');

for(let cardElement of cardElements) {
    cardElement.addEventListener('click', playCard);
}

// Kart eğer oynanabilir ise isCardPlayable içine true değil ise false yaz ve geç

function isCardPlayable(cardColor, cardNumber) {
    if(table.color === cardColor || table.number === cardNumber) {
        return true;
    }

    return false;
}

let isDeckUsed = false;

// Oyun başlıyor

function playCard() {

    // Table ı kontrol ediyor

    if(this.parentNode.classList.contains(`table`)){
        return;
    }

    // Deck i kontrol ediyor 

    if(this.parentNode.classList.contains(`deck`)) {

        if(isDeckUsed === true){
            return;
        }



        if(turn === 1) {
            playerContainer.appendChild(this);
        } else {
            cpuContainer.appendChild(this);
        }

        isDeckUsed = true;

        return;
    }

    if(!isCardPlayable(this.dataset.color, this.dataset.number)) {
        return;
    };

    if(turn == 1 && this.parentNode.classList.contains(`cpu`)) {
        return;
    }

    if(turn == 2 && this.parentNode.classList.contains(`player`)) {
        return;
    }


    if(turn=== 1){
        turn =2;
    }else {
        turn =1;
    };

    function canCurrentUserPlay() {
        let currentPlayerCards;

        if(turn === 1) {
            currentPlayerCards = document.querySelectorAll(`.player .card`);
        }else {
            currentPlayerCards = document.querySelectorAll(`.cpu .card`);
        }

        for(let card of currentPlayerCards) {
            if(isCardPlayable(card.dataset.color, card.dataset.number)) {
                return true;
            }
        }

    }

    isDeckUsed = false;


    /////////////////////// EMMET ///////////////////////////

    tableContainer.appendChild(this);
    table.color = this.dataset.color;
    table.number = this.dataset.number;
}

