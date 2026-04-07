const pgBoard = document.getElementById('pg-game-board');
const pgLivesText = document.getElementById('pg-lives-display');
const pgResetBtn = document.getElementById('pg-reset-button');

if (pgBoard && pgLivesText) {
    let pgFlipped = false;
    let pgLock = false;
    let pgFirst, pgSecond;
    let pgMatches = 0;
    let pgLives = 20;

    const pgIcons = ['🚀', '🚀', '💻', '💻', '🎨', '🎨', '⚡', '⚡', '🔥', '🔥', '🌈', '🌈', '👾', '👾', '🍀', '🍀'];

    function initPgGame() {
        pgIcons.sort(() => 0.5 - Math.random());
        pgBoard.innerHTML = '';
        pgMatches = 0;
        pgLives = 20;
        pgLivesText.innerText = `Remaining tries: ${pgLives}`;
        pgLock = false;
        pgFlipped = false;

        pgIcons.forEach((icon) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('pg-card');
            cardDiv.innerHTML = `
                <div class="pg-card-front">${icon}</div>
                <div class="pg-card-back"></div>
            `;
            cardDiv.addEventListener('click', handlePgClick);
            pgBoard.appendChild(cardDiv);
        });
    }

    if (pgResetBtn) {
        pgResetBtn.addEventListener('click', initPgGame);
    }

    function handlePgClick() {
        if (pgLock) return;
        if (this === pgFirst) return;
        this.classList.add('is-flipped');
        if (!pgFlipped) {
            pgFlipped = true;
            pgFirst = this;
            return;
        }
        pgSecond = this;
        checkPgMatch();
    }

    function checkPgMatch() {
        let isMatch = pgFirst.querySelector('.pg-card-front').innerText ===
            pgSecond.querySelector('.pg-card-front').innerText;

        if (isMatch) {
            pgMatches++;
            pgFirst.removeEventListener('click', handlePgClick);
            pgSecond.removeEventListener('click', handlePgClick);
            resetPgTurn();
            if (pgMatches === pgIcons.length / 2) {
                setTimeout(() => alert("Congratulations! Amazing memory! 🏆"), 500);
            }
        } else {
            pgLives--;
            pgLivesText.innerText = `Remaining tries: ${pgLives}`;
            pgLock = true;
            if (pgLives <= 0) {
                setTimeout(() => {
                    alert("Game over! You ran out of tries. 💀");
                    initPgGame();
                }, 500);
            } else {
                setTimeout(() => {
                    pgFirst.classList.remove('is-flipped');
                    pgSecond.classList.remove('is-flipped');
                    resetPgTurn();
                }, 1000);
            }
        }
    }

    function resetPgTurn() {
        [pgFlipped, pgLock] = [false, false];
        [pgFirst, pgSecond] = [null, null];
    }

    initPgGame();
}