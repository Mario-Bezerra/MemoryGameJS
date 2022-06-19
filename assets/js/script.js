const cards = document.querySelectorAll('.card');
let isFlipped = false; //variavel que armazena se uma carta foi ou nao virada
let firstCard, secondCard; //variavel que armazena as cartas 
let lockCard = false; 
counter = 0 ;
endgame = false ;

//função para virar carta
function flipCard() {
    if(lockCard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(isFlipped == false) {
        isFlipped = true; // seta a carta como virada
        firstCard = this; // seta a primeira carta
        return;
    }

    secondCard = this; // seta a segunda carta
    isFlipped = false; 
    checkEqualsCard();
}

function checkEqualsCard() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        counter += 1;
        if (counter == 6) {
            alert("Parabens voce terminou o jogo! \n Para reiniciar aperte F5");
        }
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard); // desabilita as cartas para não vira-las novamente
    secondCard.removeEventListener('click', flipCard); // desabilita as cartas para não vira-las novamente

    resetCards();
}

function unflipCards() {
    lockCard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip'); // volta a carta para estado inicial
        secondCard.classList.remove('flip'); // volta a carta para estado inicial

        resetCards();
    }, 1500);
}

// reseta o tabuleiro caso as cartas não sejam iguais e seta atributos das variaveis para os iniciais
function resetCards() {
    [isFlipped, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// função auto-invocavel para embaralhar as cartas ao abrir a pagina
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adicionando listener para função de virar carta funcionar
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});
