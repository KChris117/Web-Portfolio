document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const currentStageTitle = document.getElementById('current-stage-title');
    const gameSelectionContainer = document.getElementById('game-selection-container');
    const tictactoeModeSelectionContainer = document.getElementById('tictactoe-mode-selection-container');
    const tictactoeGameContainer = document.getElementById('tictactoe-game-container');
    const tictactoeBoard = document.getElementById('tictactoe-board'); // This will be populated dynamically
    const tttGameMessage = document.getElementById('game-message');
    const resetGameBtn = document.getElementById('reset-game-btn');
    const gameSelectButtons = document.querySelectorAll('.game-select-btn');
    const modeSelectButtons = document.querySelectorAll('.mode-select-btn');
    const tttBackToGamesBtn = document.querySelector('#tictactoe-mode-selection-container .back-to-games-btn');
    const backToModeSelectionBtn = document.querySelector('.back-to-mode-selection-btn');

    // Runner Game DOM Elements
    const runnerGameContainer = document.getElementById('runner-game-container');
    const runnerGameArea = document.getElementById('runner-game-area');
    const runnerPlayer = document.getElementById('runner-player');
    const runnerPlayerImg = runnerPlayer.querySelector('img');
    const runnerCurrentScoreElem = document.getElementById('runner-current-score');
    const runnerHighScoreElem = document.getElementById('runner-high-score');
    const runnerStartMessage = document.getElementById('runner-start-message');
    const runnerDuckBtn = document.getElementById('runner-duck-btn');
    const runnerBackBtn = document.getElementById('runner-back-btn');

    // Game State
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let gameMode = 'pvp'; // 'pvp' or 'pvai'
    let cells = []; // Will be populated after board creation

    // Runner Game State
    let runnerGameActive = false;
    let runnerScore = 0;
    let runnerHighScore = localStorage.getItem('runnerHighScore') || 0;
    let isJumping = false;
    let isDucking = false;
    let gameLoopInterval;
    let obstacleSpawnTimeout;
    let scoreInterval;

    const PLAYER_X_NAME = 'Rhodes Island';
    const PLAYER_O_NAME = 'Enemy Faction';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // --- Tic-Tac-Toe Game Logic ---
    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer === 'X' ? 'X' : 'O'; // Display X or O
        clickedCell.classList.add(currentPlayer === 'X' ? 'rhodes-island' : 'enemy-faction'); // Add class for styling

        handleResultValidation();

        if (gameActive && gameMode === 'pvai' && currentPlayer === 'O') {
            // Delay AI move slightly for better UX
            setTimeout(makeAIMove, 700);
        }
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        tttGameMessage.textContent = `${currentPlayer === 'X' ? PLAYER_X_NAME : PLAYER_O_NAME}'s Turn`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                // Highlight winning cells
                winCondition.forEach(index => {
                    cells[index].classList.add('winning-cell');
                });
                break;
            }
        }

        if (roundWon) {
            tttGameMessage.textContent = `${currentPlayer === 'X' ? PLAYER_X_NAME : PLAYER_O_NAME} has won!`;
            gameActive = false;
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            tttGameMessage.textContent = `It's a Draw!`;
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const makeAIMove = () => {
        if (!gameActive || currentPlayer !== 'O') return;

        // Simple AI:
        // 1. Try to win
        // 2. Try to block player
        // 3. Take center if available
        // 4. Take a corner
        // 5. Take any available spot

        const getAvailableMoves = () => board.map((val, idx) => val === '' ? idx : -1).filter(idx => idx !== -1);
        const checkWin = (player) => {
            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (board[a] === player && board[b] === player && board[c] === '') return c;
                if (board[a] === player && board[c] === player && board[b] === '') return b;
                if (board[b] === player && board[c] === player && board[a] === '') return a;
            }
            return -1;
        };

        let move = -1;

        // 1. Try to win
        move = checkWin('O');
        if (move !== -1) {
            clickCell(move);
            return;
        }

        // 2. Try to block player
        move = checkWin('X');
        if (move !== -1) {
            clickCell(move);
            return;
        }

        // 3. Take center
        if (board[4] === '') {
            clickCell(4);
            return;
        }

        // 4. Take a corner
        const corners = [0, 2, 6, 8];
        for (let i = 0; i < corners.length; i++) {
            if (board[corners[i]] === '') {
                clickCell(corners[i]);
                return;
            }
        }

        // 5. Take any available spot
        const availableMoves = getAvailableMoves();
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            clickCell(randomMove);
        }
    };

    const clickCell = (index) => {
        // Simulate a click on the cell
        cells[index].click();
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        tttGameMessage.textContent = `${PLAYER_X_NAME}'s Turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('rhodes-island', 'enemy-faction', 'winning-cell'); // Remove all player and winning classes
        });
    };

    const createTictactoeBoard = () => {
        tictactoeBoard.innerHTML = ''; // Clear existing cells
        cells = []; // Reset cells array
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('tictactoe-cell');
            cell.dataset.cellIndex = i;
            cell.addEventListener('click', handleCellClick);
            tictactoeBoard.appendChild(cell);
            cells.push(cell);
        }
    };

    // --- Endless Runner Game Logic ---
    const startRunnerGame = () => {
        if (runnerGameActive) return;
        runnerGameActive = true;
        runnerScore = 0;
        runnerStartMessage.classList.add('hidden');
        runnerHighScoreElem.textContent = runnerHighScore;

        // Mulai game loop
        scoreInterval = setInterval(() => {
            runnerScore++;
            runnerCurrentScoreElem.textContent = runnerScore;
        }, 100);
        gameLoopInterval = setInterval(checkCollisions, 50);
        obstacleSpawnerLoop(); // Mulai loop untuk memunculkan rintangan
    };

    const stopRunnerGame = () => {
        runnerGameActive = false;
        clearInterval(gameLoopInterval);
        clearTimeout(obstacleSpawnTimeout); // Hentikan timeout rintangan berikutnya
        clearInterval(scoreInterval);
        runnerStartMessage.textContent = "GAME OVER! Press UP to Restart";
        runnerStartMessage.classList.remove('hidden');

        if (runnerScore > runnerHighScore) {
            runnerHighScore = runnerScore;
            localStorage.setItem('runnerHighScore', runnerHighScore);
            runnerHighScoreElem.textContent = runnerHighScore;
        }
        // Hapus semua rintangan
        document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
    };

    const obstacleSpawnerLoop = () => {
        if (!runnerGameActive) return; // Hentikan loop jika game sudah tidak aktif

        createObstacle();

        // Atur waktu acak untuk rintangan berikutnya agar jaraknya bervariasi
        // Jeda antara 1.5 detik hingga 3 detik
        const randomDelay = Math.random() * 1500 + 1500; 
        obstacleSpawnTimeout = setTimeout(obstacleSpawnerLoop, randomDelay);
    };

    const createObstacle = () => {
        // Fungsi ini sekarang hanya fokus membuat satu rintangan
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');

        const type = Math.random() > 0.3 ? 'pillar' : 'bird';
        obstacle.classList.add(type);

        const img = document.createElement('img');
        img.src = `assets/obstacles/${type}.png`;
        if (type === 'bird') img.src = `assets/obstacles/${type}.gif`;
        
        obstacle.appendChild(img);
        runnerGameArea.appendChild(obstacle);

        // Hapus rintangan setelah melewati layar
        setTimeout(() => {
            obstacle.remove(); // Hapus setelah animasi selesai
        }, 3000); // Durasi ini harus sama dengan durasi animasi di CSS
    };

    const checkCollisions = () => {
        const playerRect = runnerPlayer.getBoundingClientRect();
        document.querySelectorAll('.obstacle').forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (
                playerRect.left < obstacleRect.right &&
                playerRect.right > obstacleRect.left &&
                playerRect.top < obstacleRect.bottom &&
                playerRect.bottom > obstacleRect.top
            ) {
                stopRunnerGame();
            }
        });
    };

    const handlePlayerAction = (e) => {
        if (e.code === 'ArrowUp' || e.code === 'Space') {
            if (!runnerGameActive) {
                startRunnerGame();
                return;
            }
            if (!isJumping) {
                isJumping = true;
                runnerPlayer.classList.add('jump');
                setTimeout(() => {
                    runnerPlayer.classList.remove('jump');
                    isJumping = false;
                }, 1000); // Durasi animasi (0.5s naik + 0.5s turun = 1000ms)
            }
        }
        if (e.code === 'ArrowDown') {
            if (runnerGameActive && !isJumping && !isDucking) {
                isDucking = true;
                runnerPlayer.classList.add('duck');
                runnerPlayerImg.src = 'assets/amiya/amiyawalkright.gif'; // Ganti ke GIF menunduk
            }
        }
    };

    const handlePlayerActionEnd = (e) => {
        if (e.code === 'ArrowDown') {
            isDucking = false;
            runnerPlayer.classList.remove('duck');
            runnerPlayerImg.src = 'assets/amiya/amiyawalkright.gif'; // Ganti ke GIF diam
        }
    };

    // --- Navigation & Game Flow ---
    const showGameSelection = () => {
        currentStageTitle.textContent = 'SKILL DEPLOYMENT';
        gameSelectionContainer.classList.remove('hidden');
        tictactoeModeSelectionContainer.classList.add('hidden');
        tictactoeGameContainer.classList.add('hidden');
        runnerGameContainer.classList.add('hidden');
        if (runnerGameActive) stopRunnerGame(); // Hentikan game jika kembali ke menu
    };

    const showTictactoeModeSelection = () => {
        currentStageTitle.textContent = 'Annihilation: Frontend - Select Mode';
        gameSelectionContainer.classList.add('hidden');
        tictactoeModeSelectionContainer.classList.remove('hidden');
        tictactoeGameContainer.classList.add('hidden');
        runnerGameContainer.classList.add('hidden');
    };

    const startTictactoeGame = (mode) => {
        gameMode = mode;
        currentStageTitle.textContent = `Annihilation: Frontend (${mode === 'pvp' ? 'PvP' : 'PvAI'})`;
        gameSelectionContainer.classList.add('hidden');
        tictactoeModeSelectionContainer.classList.add('hidden');
        tictactoeGameContainer.classList.remove('hidden');
        runnerGameContainer.classList.add('hidden');
        createTictactoeBoard(); // Generate cells
        resetGame(); // Initialize game state

        if (gameMode === 'pvai' && currentPlayer === 'O') {
            setTimeout(makeAIMove, 1000); // AI makes first move if it's 'O' and PvAI
        }
    };

    const showRunnerGame = () => {
        currentStageTitle.textContent = 'Resource Search: Backend - Endless Runner';
        gameSelectionContainer.classList.add('hidden');
        tictactoeModeSelectionContainer.classList.add('hidden');
        tictactoeGameContainer.classList.add('hidden');
        runnerGameContainer.classList.remove('hidden');
        runnerHighScoreElem.textContent = runnerHighScore;
    };

    // --- Event Listeners ---
    gameSelectButtons.forEach(button => {
        if (button.dataset.gameId === 'tictactoe') {
            button.addEventListener('click', showTictactoeModeSelection);
        }
        if (button.dataset.gameId === 'runner') {
            button.addEventListener('click', showRunnerGame);
        }
        // Add listeners for other games here
    });

    modeSelectButtons.forEach(button => {
        button.addEventListener('click', () => {
            startTictactoeGame(button.dataset.mode);
        });
    });

    tttBackToGamesBtn.addEventListener('click', showGameSelection);
    backToModeSelectionBtn.addEventListener('click', showTictactoeModeSelection);
    resetGameBtn.addEventListener('click', resetGame);

    // Runner Game Event Listeners
    document.addEventListener('keydown', handlePlayerAction);
    document.addEventListener('keyup', handlePlayerActionEnd);
    runnerDuckBtn.addEventListener('mousedown', () => handlePlayerAction({ code: 'ArrowDown' }));
    runnerDuckBtn.addEventListener('mouseup', () => handlePlayerActionEnd({ code: 'ArrowDown' }));
    runnerDuckBtn.addEventListener('touchstart', () => handlePlayerAction({ code: 'ArrowDown' }));
    runnerDuckBtn.addEventListener('touchend', () => handlePlayerActionEnd({ code: 'ArrowDown' }));
    runnerBackBtn.addEventListener('click', showGameSelection);

    // Initial setup
    showGameSelection(); // Start by showing game selection
});
