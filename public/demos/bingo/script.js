let availableNumbers = [];
let calledNumbers = [];
let ticketPrice = 10; // የአንድ ካርቴላ ዋጋ (ብር)
let playerCount = 0;

// የድምጽ ማጫወቻ (Web Audio API - ያለ ውጭ ፋይል የድምጽ ዌብ ቴክኖሎጂ)
function playSound(type) {
    try {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'draw') {
            osc.frequency.setValueAtTime(440, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'line') {
            osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        } else if (type === 'win') {
            // የማሸነፊያ (Full House) የደስታ ዜማ ኖቶች
            let now = audioCtx.currentTime;
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.15); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.3); // G5
            osc.frequency.setValueAtTime(1046.50, now + 0.45); // C6
            gain.gain.setValueAtTime(0.3, now);
            osc.start();
            osc.stop(now + 0.7);
        }
    } catch (e) {
        console.log("Audio not supported or blocked");
    }
}

// ከ 1 እስከ 10 ያሉትን ካርቴላዎች ማመንጨት
function getCardNumbers(cardId) {
    let colRanges = [
        {min: 1, max: 15},
        {min: 16, max: 30},
        {min: 31, max: 45},
        {min: 46, max: 60},
        {min: 61, max: 75}
    ];

    let cardCols = [];
    let seed = cardId * 1331; 

    colRanges.forEach((range) => {
        let nums = [];
        while(nums.length < 5) {
            seed = (seed * 9301 + 49297) % 233280;
            let rnd = seed / 233280;
            let r = Math.floor(rnd * (range.max - range.min + 1)) + range.min;
            if(!nums.includes(r)) nums.push(r);
        }
        cardCols.push(nums);
    });

    let grid = [];
    for (let r = 0; r < 5; r++) {
        let row = [];
        for (let c = 0; c < 5; c++) {
            if (r === 2 && c === 2) {
                row.push('FREE');
            } else {
                row.push(cardCols[c][r]);
            }
        }
        grid.push(row);
    }
    return grid;
}

// Game Initialization
function initGame() {
    let input = prompt("እባክህ በዚህ ጨዋታ የተሳተፉትን **አጠቃላይ ተጫዋቾች ብዛት** አስገባ (ምሳሌ: 15):", "10");
    playerCount = parseInt(input);

    if (isNaN(playerCount) || playerCount <= 0) {
        playerCount = 10; // ነባሪ (Default)
    }

    availableNumbers = [];
    calledNumbers = [];
    for (let i = 1; i <= 75; i++) {
        availableNumbers.push(i);
    }

    updateFinancials();
    document.getElementById('current-number').innerText = '-';
    let resBox = document.getElementById('verification-result');
    resBox.className = 'verification-box';
    resBox.innerHTML = 'እባክህ የካርቴላ ቁጥር አስገባ';
    createBoard();
}

// Financial Calculation (2 ብር ለቤት, 8 ብር ለአሸናፊው በየሰዉ)
function updateFinancials() {
    let totalCollected = playerCount * ticketPrice;
    let houseCut = playerCount * 2; // በሰዉ 2 ብር ለቤት
    let winnerPool = totalCollected - houseCut; // የቀረው ለአሸናፊው

    document.getElementById('player-count').innerText = playerCount;
    document.getElementById('house-cut').innerText = houseCut + ' ብር';
    document.getElementById('winner-pool').innerText = winnerPool + ' ብር';
}

// Master Board (1-75)
function createBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    for (let i = 1; i <= 75; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = 'cell-' + i;
        cell.innerText = i;
        boardDiv.appendChild(cell);
    }
}

// Draw a Random Bingo Number
function drawNumber() {
    if (availableNumbers.length === 0) {
        alert('ሁሉም ቁጥሮች አልቀዋል!');
        return;
    }

    playSound('draw');
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawn = availableNumbers.splice(randomIndex, 1)[0];
    calledNumbers.push(drawn);

    document.getElementById('current-number').innerText = drawn;
    
    const cell = document.getElementById('cell-' + drawn);
    if (cell) {
        cell.classList.add('called');
    }
}

// Verify Player's Card
function verifyCard() {
    let cardId = parseInt(document.getElementById('card-number-input').value);
    const resultBox = document.getElementById('verification-result');

    if (isNaN(cardId) || cardId < 1 || cardId > 10) {
        alert('እባክህ ከ 1 እስከ 10 ያሉ ትክክለኛ የካርቴላ ቁጥሮች አስገባ!');
        return;
    }

    let cardGrid = getCardNumbers(cardId);
    let completedLines = 0;

    // 1. አግድም መስመሮች (Horizontal Lines)
    for (let r = 0; r < 5; r++) {
        let rowComplete = true;
        for (let c = 0; c < 5; c++) {
            let val = cardGrid[r][c];
            if (val !== 'FREE' && !calledNumbers.includes(val)) {
                rowComplete = false;
                break;
            }
        }
        if (rowComplete) completedLines++;
    }

    // 2. ቀጥ ያሉ አምዶች (Vertical Lines)
    for (let c = 0; c < 5; c++) {
        let colComplete = true;
        for (let r = 0; r < 5; r++) {
            let val = cardGrid[r][c];
            if (val !== 'FREE' && !calledNumbers.includes(val)) {
                colComplete = false;
                break;
            }
        }
        if (colComplete) completedLines++;
    }

    // 3. ሰያፍ መስመሮች (Diagonal Lines)
    let diag1Complete = true;
    let diag2Complete = true;
    for (let i = 0; i < 5; i++) {
        let val1 = cardGrid[i][i];
        if (val1 !== 'FREE' && !calledNumbers.includes(val1)) diag1Complete = false;

        let val2 = cardGrid[i][4 - i];
        if (val2 !== 'FREE' && !calledNumbers.includes(val2)) diag2Complete = false;
    }
    if (diag1Complete) completedLines++;
    if (diag2Complete) completedLines++;

    // ውጤቱን ማሳየት እና ድምጽ ማጫወት
    resultBox.className = "verification-box";
    if (completedLines >= 3) {
        playSound('win');
        resultBox.classList.add('success', 'celebration');
        resultBox.innerHTML = `🎉 ትልቅ ድል! ካርቴላ #${cardId}: **ሶስት መስመር / ሙሉ ቤት (Three Lines / Full House)** ሞልቷል! 🏆`;
    } else if (completedLines === 2) {
        playSound('line');
        resultBox.classList.add('success');
        resultBox.innerHTML = `✅ ካርቴላ #${cardId}: **ሁለት መስመር (Two Lines)** ሞልቷል!`;
    } else if (completedLines === 1) {
        playSound('line');
        resultBox.classList.add('success');
        resultBox.innerHTML = `✅ ካርቴላ #${cardId}: **አንድ መስመር (One Line)** ሞልቷል!`;
    } else {
        resultBox.classList.add('failed');
        resultBox.innerHTML = `❌ ካርቴላ #${cardId}: እስካሁን ምንም የተሟላ መስመር የለውም!`;
    }
}

// Reset Game
function resetGame() {
    if (confirm('ጨዋታውን ሙሉ በሙሉ አዲስ ማድረግ ትፈልጋለህ?')) {
        initGame();
    }
}

// Run on load
window.onload = initGame;