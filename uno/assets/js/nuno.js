// Kartlar - biz - karsi oyuncu - cekilecek kartlar ama icini simdilik bos birakiyoruz 
let cards = [];
let player = [];
let cpu = [];
let deck = [];
let table;

// For dongusu yapip kartlari olusturuyoruz olusturdugumuz kartlari card dizisine pushluyoruz 

for (let i = 0; i <= 9; i++) {
    cards.push({ color: 'green', number: i.toString() });
    cards.push({ color: 'yellow', number: i.toString() });
    cards.push({ color: 'red', number: i.toString() });
    cards.push({ color: 'blue', number: i.toString() });
}

// olusturdugumuz kartlari karistiriyoruz 

cards.sort(function () {
    return Math.random() - 0.5
});

// karistirdigimiz kartlari for dongusu ile dagitiyoruz ve cards dizisine pushluyoruz shift ile yapmamizin nedeni dizinin 0. elementini almasidir 

for (let i = 1; i <= 7; i++) {
    player.push(cards.shift());
    cpu.push(cards.shift());
}

// bu kisimda table a cards dizisinin 0. elementi ataniyor 

table = cards.shift();

// bu kisimda ise kalan kartlarin tamami deck elementine ataniyor 

deck = cards;

// sira belirleniyor 

let turn = 1;

// olusturdugumuz kartlari divlere atama ve bunu createCardHtml fonkisyonuna atama <-- data-color ve data-number de olusturulur icerisine verileri atilr -->

function createCardHtml(color, number, back = false) {
    return `<div class="card ${color} ${back ? 'back' : ''}" data-color="${color}" data-number="${number}">${number}</div>`;
}

// html icersinden secilen calsslari bos nesnelere atama

const cpuContainer = document.querySelector('.cpu');
const tableContainer = document.querySelector('.table');
const playerContainer = document.querySelector('.player');
const deckContainer = document.querySelector('.deck');

// for islemi ile card diye bos bir eleman acilir ve player icerisinde ne kadar eleman var ise o kadar donmesi saglanir her donuste playerin icerisindeki bilgileri tek tek 
// playercontainer.innerhtml ile oyuncuya verilir


for (let card of player) {
    playerContainer.innerHTML += createCardHtml(card.color, card.number);
}

// cpuContainer.innerhtml ile bilgisayara verilir

for (let card of cpu) {
    cpuContainer.innerHTML += createCardHtml(card.color, card.number, true);
}

// deckContainer.innerhtml ile cekilecek kartlara eklenir ve true metodu ile arkasi cevrilir

for (let card of deck) {
    deckContainer.innerHTML += createCardHtml(card.color, card.number, true);
}

// tableContainer.innerhtml ile tahtaya baslangic karti koyulur

tableContainer.innerHTML += createCardHtml(table.color, table.number);

// butun card classlari cardelemetse atanir 

let cardElements = document.querySelectorAll('.card');

// for dongusu ile hepsini tiklanilabilir yapilir 

for (let cardElement of cardElements) {
    cardElement.addEventListener('click', playCard);
}

// kartin oynanabilir olup olmamasini kontrol eder tahtadaki kart ile oyuncudaki kartlari kiyaslar

function isCardPlayable(cardColor, cardNumber) {
    if (table.color === cardColor || table.number === cardNumber) {
        return true;
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

// canCurrentUserPlay fonksiyonu siradaki kisiyi belirler ve o kisinin bilgilerini currentPlayerCards a atar atanan bilgiler tek tek doner eger kart oynanabilir ise 
// fonksiyonunda kartlarin rengi ve sayisi kontrol ettirilir oynanabilir ise true doner oynanamaz ise false doner 

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

let isDeckUsed = false;

// oyun seansi baslar ilk olarak 

function playCard() {
    // table classina tiklanirsa olacaklar  
    if (this.parentNode.classList.contains('table')) {
        return;
    }

    // deck classina tiklanirsa olacaklar 

    if (this.parentNode.classList.contains('deck')) {

        // isdeckused true ise kart cekemessin 

        if (isDeckUsed === true) {
            return;
        }


        //  mevcut oyuncuda classinda back var ise siler ki kartlarimiz gozuksun 


        // mecvut oyuncuya cekilen karti ekletir

        if (turn === 1) {
            this.classList.remove('back');
            playerContainer.appendChild(this);
        } else {
            cpuContainer.appendChild(this);
        }

        isDeckUsed = true;

        // mevcut oyuncu oynayabilecegi bir sey yok ise sirayi degistirir

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

    // tikladigin classin at classi 0 ise kazanan oyuncuyu soyle ve 

    if (playerCardContainer.children.length === 0) {
        alert('Kazanan Oyuncu: ' + turn);

        // tiklanabilir butun kartlarin tiklama eventini kapatir

        cardElements.forEach(card => card.removeEventListener('click', playCard));
        return; // cok gerekli degil kaldirsak da durum degismez cunku zaten oyun bitti.
    }

    // sirayi karsiya ver 

    changeTurn();
}


// cpu'nun elindeki karti oynatmak icin
// [2] yazan yer dinamik olacak
// document.querySelectorAll('.cpu .card')[2].click();