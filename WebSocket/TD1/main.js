const canvas = document.querySelector("canvas");
const body = document.querySelector("body");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const w = canvas.width;
const h = canvas.height;

const socket = io("51.83.36.122:8080");

socket.emit("login", {
    login: "romnat",
    passwd: "xxxx"
});

socket.on("auth", data => {});

socket.on("position", data => {});

//---------------------------------------------MAP
let map = null;
socket.on("map", data => {
    map = data;
});

function displayMap(me) {
    if (map && me) {
        map.shapes.forEach(shape => {
            c.beginPath();
            c.fillStyle = shape.color;
            let x = shape.x - me.x + w / 2;
            let y = shape.y - me.y + h / 2;
            if (shape.shape == "rectangle") {
                c.rect(x, y, shape.w, shape.h);
            } else if (shape.shape == "circle") {
                c.arc(x, y, shape.r, 0, Math.PI * 2);
            }
            c.fill();
        });
    }
}

//---------------------------------------------USER POS & MOVE
const mouse = { x: 0, y: 0 };
body.addEventListener("mousemove", e => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});

let me = null;
socket.on("position", data => {
    me = data;
});

//-------------------------------OTHERS PLAYERS
let players = [];
socket.on("players", allPlayers => players = allPlayers);

//-------------------------------BULLETS
let bullets = [];
socket.on("bullets", allBullets => bullets = allBullets);

body.addEventListener("click", e => {
    let d = Math.sqrt(Math.pow(mouse.x - w / 2, 2) + (Math.pow(mouse.x - w / 2, 2)));
    let vx = (mouse.x - w / 2) / d;
    let vy = (mouse.y - h / 2) / d;
    socket.emit("shoot", { vx: vx, vy: vy });
});

//-----------------------move
const move = { vx: 0, vy: 0 };

body.addEventListener("keydown", e => {
    switch (e.key) {
        case "s":
            move.vy = 1; // Descendre
            break;
        case "z":
            move.vy = -1; // Monter
            break;
        case "d":
            move.vx = 1; // Droite
            break;
        case "q":
            move.vx = -1; // Gauche
            break;
    }
});

body.addEventListener("keyup", e => {
    switch (e.key) {
        case "s":
        case "z":
            move.vy = 0; // Arrêter le mouvement vertical
            break;
        case "d":
        case "q":
            move.vx = 0; // Arrêter le mouvement horizontal
            break;
    }
});

setInterval(() => {
    // Envoyer les mouvements actuels au serveur
    socket.emit("move", { vx: move.vx, vy: move.vy });
}, 30);

//---------------------------------------------MAIN LOOP
setInterval(_ => {
    c.clearRect(0, 0, w, h);
    displayMap(me);

    if (me) {
        c.beginPath();
        c.fillStyle = me.color;
        c.arc(w / 2, h / 2, me.r, 0, Math.PI * 2);
        c.fill();
    }

    // Affiche les copains
    players.forEach(player => {
        if (player.pseudo != me.pseudo) {
            c.beginPath();
            let x = player.x - me.x + w / 2;
            let y = player.y - me.y + h / 2;
            c.fillStyle = player.color;
            c.arc(x, y, player.r, 0, Math.PI * 2);
            c.fill();
            c.fillText(player.pseudo, x - 30, y - 30);

            let r = 255*(255*player.hp/100)
            let g = 255*player.hp/100
            let b = 0
            c.strokeStyle = "rgb("+r+","+g+","+b+")"
            c.lineWidth = 3
            c.arc(x, y, player.r, 0, Math.PI+2)
            c.stroke()
        }
    });

    bullets.forEach(bullet => {
        c.beginPath();
        let x = bullet.x - me.x + w / 2;
        let y = bullet.y - me.y + h / 2;
        c.fillStyle = "yellow";
        c.arc(x, y, 5, 0, Math.PI * 2);
        c.fill();
    });

    c.fillStyle = "white";
    c.fillText("Nombre de joueurs : " + players.length, 20, 40);
}, 10);

//-------------------------------AIMBOT
let isAimbotActive = false; // Variable d'état de l'aimbot

function getClosestPlayer(me, players) {
    let closest = null;
    let minDistance = Infinity;

    players.forEach(player => {
        if (player.pseudo !== me.pseudo) { // Ignore soi-même
            let dx = player.x - me.x;
            let dy = player.y - me.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                closest = player;
            }
        }
    });

    return closest;
}

function aimAtTarget(me, target) {
    if (me && target) {
        let dx = target.x - me.x;
        let dy = target.y - me.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        return {
            vx: dx / distance,
            vy: dy / distance
        };
    }
    return null;
}

setInterval(() => {
    if (me && isAimbotActive && players.length > 0) {
        let closestPlayer = getClosestPlayer(me, players);
        if (closestPlayer) {
            let aimDirection = aimAtTarget(me, closestPlayer);
            if (aimDirection) {
                socket.emit("shoot", aimDirection);
            }
        }
    }
}, 100); // Tirer toutes les 100ms si l'aimbot est activé

//---------------------------------------------EVASION AUTOMATIQUE
let isEvadeActive = false; // Variable d'état de l'esquive

function evadeFromBullets(me, bullets) {
    let closestBullet = null;
    let minDistance = Infinity;

    bullets.forEach(bullet => {
        let dx = bullet.x - me.x;
        let dy = bullet.y - me.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
            minDistance = distance;
            closestBullet = bullet;
        }
    });

    if (closestBullet) {
        let dx = closestBullet.x - me.x;
        let dy = closestBullet.y - me.y;
        let evadeDirection = Math.atan2(dy, dx) + Math.PI; // Aller dans la direction opposée

        return {
            vx: Math.cos(evadeDirection),
            vy: Math.sin(evadeDirection)
        };
    }
    return null;
}


// Gestion des touches
document.addEventListener('keydown', (e) => {
    if (e.key === 'i' || e.key === 'I') {
        isAimbotActive = !isAimbotActive; // Alterne l'état de l'aimbot
    }
});
