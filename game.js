let tog = 1;
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

let p1sum = 1;
let p2sum = 1;

// உங்க படத்தில் உள்ள சரியான ஏணி மற்றும் பாம்பு விபரங்கள்
function checkSnakesAndLadders(val) {
    // --- Ladders (ஏணிகள்) ---
    if (val === 1) return 38;
    if (val === 4) return 14;
    if (val === 9) return 31;
    if (val === 21) return 42;
    if (val === 28) return 84;
    if (val === 51) return 67;
    if (val === 71) return 91;
    if (val === 80) return 100;

    // --- Snakes (பாம்புகள்) ---
    if (val === 17) return 7;
    if (val === 54) return 34;
    if (val === 62) return 19;
    if (val === 64) return 60;
    if (val === 87) return 24;
    if (val === 93) return 73;
    if (val === 95) return 75;
    if (val === 98) return 79;

    return val;
}

function movePlayer(player, sum) {
    // 100x100 Grid Logic
    let row = Math.floor((sum - 1) / 10);
    let col = (sum - 1) % 10;
    
    // Zig-Zag Movement Logic
    let left;
    if (row % 2 === 0) {
        // Even rows (0, 2, 4...) -> Left to Right
        left = col * 60; 
    } else {
        // Odd rows (1, 3, 5...) -> Right to Left
        left = (9 - col) * 60;
    }

    let bottom = row * 60; // Bottom-up calculation

    // HTML Element Select
    let p = document.getElementById(player);
    
    // Position Update
    p.style.transition = "all 0.5s ease";
    p.style.left = `${left + 10}px`; // +10 for center alignment
    p.style.bottom = `${bottom + 10}px`;

    // Yellow coin adjustment to avoid overlap
    if (player === 'p2') {
         p.style.left = `${left + 15}px`;
         p.style.bottom = `${bottom + 15}px`;
    }
}

function play(player, psum, num) {
    let sum;
    if (player === 'p1') {
        p1sum += num;
        if (p1sum > 100) p1sum -= num; // Can't go past 100
        p1sum = checkSnakesAndLadders(p1sum);
        sum = p1sum;
    } else {
        p2sum += num;
        if (p2sum > 100) p2sum -= num;
        p2sum = checkSnakesAndLadders(p2sum);
        sum = p2sum;
    }

    movePlayer(player, sum);

    if (sum === 100) {
        winSound.play();
        setTimeout(() => {
            alert(player === 'p1' ? "Red Won!" : "Yellow Won!");
            location.reload();
        }, 800);
    }
}

// Initial Position Setup
movePlayer('p1', 1);
movePlayer('p2', 1);

document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play();
    let num = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceValue").innerText = num;

    if (tog % 2 !== 0) {
        document.getElementById('tog').innerText = "Yellow's Turn";
        play('p1', p1sum, num);
    } else {
        document.getElementById('tog').innerText = "Red's Turn";
        play('p2', p2sum, num);
    }
    tog++;
});