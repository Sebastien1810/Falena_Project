const playerElement = document.getElementById("Player");
const mapElement = document.getElementById("Map1");

class Player {
  constructor() {
    this.positionX = 80;
    this.positionY = 90;
    this.width = 40;
    this.height = 40;

    // pour definir l'element de mon joueur
    this.playerElement = playerElement;

    // Initialisation de mon interface utilisateur
    this.majUi();

    document.addEventListener("keydown", (event) => {
      if (event.key === "z" || event.key === "ArrowUp") {
        this.moveUp();
      } else if (event.key === "q" || event.key === "ArrowLeft") {
        this.moveLeft();
      } else if (event.key === "s" || event.key === "ArrowDown") {
        this.moveDown();
      } else if (event.key === "d" || event.key === "ArrowRight") {
        this.moveRight();
      }
    });
  }

  // Méthode pour maj de mon ui
  majUi() {
    this.playerElement.style.width = this.width + "px"; // Utilise px pour la largeur du joueur
    this.playerElement.style.left = this.positionX + "px"; // Position sur l'axe X
    this.playerElement.style.top = this.positionY + "px"; // Position sur l'axe Y
    this.playerElement.style.position = "absolute";
    this.playerElement.style.height = this.height + "px";
  }

  moveLeft() {
    this.positionX -= 10;
    this.majUi();
  }

  moveRight() {
    this.positionX += 10;
    this.majUi();
  }

  moveDown() {
    this.positionY += 10;
    this.majUi();
  }

  moveUp() {
    this.positionY -= 10;
    this.majUi();
  }
}

class Ennemies {
  constructor(x = 50, y = 25) {
    this.positionX = x;
    this.positionY = y;
    this.width = 35;
    this.height = 35;

    this.EnnemiesElm = document.createElement("div"); // je créé mon element// i create my element

    this.EnnemiesElm.className = "ennemies";

    this.EnnemiesElm.style.width = this.width + "px";
    this.EnnemiesElm.style.height = this.height + "px";
    this.EnnemiesElm.style.position = "absolute";
    this.EnnemiesElm.style.left = this.positionX + "px";
    this.EnnemiesElm.style.top = this.positionY + "px";

    mapElement.appendChild(this.EnnemiesElm);

    this.speed = 2; // speed of the ennemi/vitesse de l'ennemie
  }

  ennemiesToPlayer() {
    let diffX = player.positionX - this.positionX;
    let diffY = player.positionY - this.positionY;

    let distancePlayerEnnemies = Math.sqrt(diffX * diffX + diffY * diffY); // calcul distance between player and ennemi

    if (distancePlayerEnnemies > 0) {
      let directionX = diffX / distancePlayerEnnemies;
      let directionY = diffY / distancePlayerEnnemies;

      this.positionX += directionX * this.speed;
      this.positionY += directionY * this.speed;

      let moveX = directionX * this.speed;
      let moveY = directionY * this.speed;

      //formule math.abs for same speed everytime
      if (Math.abs(moveX) > Math.abs(moveY)) {
        moveY *= Math.abs(moveX / moveY);
      } else {
        moveX *= Math.abs(moveY / moveX);
      }

      this.EnnemiesElm.style.left = this.positionX + "px";
      this.EnnemiesElm.style.top = this.positionY + "px";
    }
  }
}

ennemiList = [];

const player = new Player();
let ennemi1 = new Ennemies(100, 500);

function spawnEnnemi() {
  const sizeMapX = mapElement.offsetWidth;
  const sizeMapY = mapElement.offsetHeight;

  let randomX = Math.floor(Math.random() * sizeMapX);
  let randomY = Math.floor(Math.random() * sizeMapY);

  let newEnnemi = new Ennemies(randomX, randomY);
  ennemiList.push(newEnnemi);

  ennemiList.forEach((element) => {
    element.ennemiesToPlayer(player);
  });
}
setInterval(spawnEnnemi, 3000); //spawn a new ennemie every 2second

setInterval(() => {
  ennemiList.forEach((ennemi) => {
    ennemi.ennemiesToPlayer();
  });
}, 1000 / 60);

/*for moving the player 
player.moveLeft();
player.moveRight();
player.moveLeft();
player.moveRight();*/
