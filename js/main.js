const playerElement = document.getElementById("Player");
const mapElement = document.getElementById("Map1");

function createNeonEffect() {
  const neon = document.createElement("div");
  neon.className = "neon-effect";
  neon.style.left = `${Math.random() * 100}%`;
  neon.style.top = `${Math.random() * 100}%`;
  neon.style.width = `${Math.random() * 200 + 50}px`;
  neon.style.height = `${Math.random() * 200 + 50}px`;
  neon.style.backgroundColor = `rgba(${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random() * 255}, 0.2)`;
  neon.style.boxShadow = `0 0 20px rgba(${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random() * 255}, 0.8)`;
  mapElement.appendChild(neon);

  // Supprimer l'effet après un certain temps
  setTimeout(() => {
    neon.remove();
  }, 5000); // Durée de vie de l'effet
}

// Créer des effets de néons en boucle
setInterval(createNeonEffect, 1000); // Crée un nouvel effet toutes les secondes

const sizeMapX = mapElement.offsetWidth; // Taille de la carte en largeur
const sizeMapY = mapElement.offsetHeight; // Taille de la carte en hauteur

class Player {
  constructor() {
    this.positionX = 80;
    this.positionY = 90;
    this.width = 50;
    this.height = 30;

    // pour definir l'élément de mon joueur
    this.playerElement = playerElement;

    // Initialisation de mon interface utilisateur
    this.majUi();

    this.lives = 3;

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
  loseLife() {
    this.lives--;
    console.log(`Vies restantes: ${this.lives}`);

    if (this.lives <= 0) {
      this.endGame();
      console.log("Game Over !");
      // end of the game
    }
  }
  endGame() {
    console.log("Fin du jeu !");
    window.location.href = "gameover.html"; // Redirection vers l'écran de Game Over
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
    this.positionX = Math.max(0, this.positionX - 10);
    this.majUi();
  }

  moveRight() {
    this.positionX = Math.min(sizeMapX - this.width, this.positionX + 10);
    this.majUi();
  }

  moveDown() {
    this.positionY = Math.min(sizeMapY - this.height, this.positionY + 10);
    this.majUi();
  }

  moveUp() {
    this.positionY = Math.max(0, this.positionY - 10);
    this.majUi();
  }

  shootProjectile(clickX, clickY) {
    const rect = mapElement.getBoundingClientRect();
    const projectileX = this.positionX + this.width / 2 - 5;
    const projectileY = this.positionY + this.height / 2 - 5;

    let newProjectile = new Projectile(
      projectileX,
      projectileY,
      clickX - rect.left, // Correction pour prendre en compte la position de la carte
      clickY - rect.top
    );
  }
}

class Ennemies {
  constructor(x = 50, y = 25) {
    this.positionX = x;
    this.positionY = y;
    this.width = 35;
    this.height = 35;

    this.EnnemiesElm = document.createElement("div"); // Création de l'élément
    this.EnnemiesElm.className = "ennemies";

    this.EnnemiesElm.style.width = this.width + "px";
    this.EnnemiesElm.style.height = this.height + "px";
    this.EnnemiesElm.style.position = "absolute";
    this.EnnemiesElm.style.left = this.positionX + "px";
    this.EnnemiesElm.style.top = this.positionY + "px";

    mapElement.appendChild(this.EnnemiesElm);
    this.speed = 1;
  }
  destroy() {
    this.EnnemiesElm.remove();
    let index = ennemiList.indexOf(this);
    if (index !== -1) {
      ennemiList.splice(index, 1);
    }
  }

  ennemiesToPlayer() {
    let diffX = player.positionX - this.positionX;
    let diffY = player.positionY - this.positionY;
    let distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (
      this.positionX < player.positionX + player.width &&
      this.positionX + this.width > player.positionX &&
      this.positionY < player.positionY + player.height &&
      this.positionY + this.height > player.positionY
    ) {
      player.loseLife();
      this.destroy(); // delete the ennemi after the impact
      return; // stop the function for the ennemi stop moving
    }

    if (distance > 0.1) {
      let directionX = diffX / distance;
      let directionY = diffY / distance;

      this.positionX += directionX * this.speed;
      this.positionY += directionY * this.speed;

      this.positionX = Math.max(
        0,
        Math.min(this.positionX, sizeMapX - this.width)
      );
      this.positionY = Math.max(
        0,
        Math.min(this.positionY, sizeMapY - this.height)
      );

      this.EnnemiesElm.style.left = this.positionX + "px";
      this.EnnemiesElm.style.top = this.positionY + "px";
    }
  }
}

class Projectile {
  constructor(x, y, targetX, targetY) {
    this.positionX = x;
    this.positionY = y;
    this.width = 5;
    this.height = 5;

    this.projectileElement = document.createElement("div");
    this.projectileElement.className = "projectile";
    this.projectileElement.style.width = this.width + "px";
    this.projectileElement.style.height = this.height + "px";
    this.projectileElement.style.position = "absolute";
    this.projectileElement.style.left = this.positionX + "px";
    this.projectileElement.style.top = this.positionY + "px";

    mapElement.appendChild(this.projectileElement);
    this.targetX = targetX;
    this.targetY = targetY;

    this.speed = 15;
    this.moveInterval = setInterval(() => this.moveProjectile(), 1000 / 60);
    // delete the projectile after 5 second if there is no collision with ennemi
    this.selfDestruct = setTimeout(() => this.destroy(), 1000);
  }

  checkCollision(ennemi) {
    return (
      this.positionX < ennemi.positionX + ennemi.width &&
      this.positionX + this.width > ennemi.positionX &&
      this.positionY < ennemi.positionY + ennemi.height &&
      this.positionY + this.height > ennemi.positionY
    );
  }

  moveProjectile() {
    let diffX = this.targetX - this.positionX;
    let diffY = this.targetY - this.positionY;
    let distance = Math.sqrt(diffX * diffX + diffY * diffY);
    let directionX = diffX / distance;
    let directionY = diffY / distance;

    this.positionX += directionX * this.speed;
    this.positionY += directionY * this.speed;

    this.projectileElement.style.left = this.positionX + "px";
    this.projectileElement.style.top = this.positionY + "px";

    for (let i = 0; i < ennemiList.length; i++) {
      if (this.checkCollision(ennemiList[i])) {
        console.log("Ennemi touché !");
        ennemiList[i].EnnemiesElm.remove();
        ennemiList.splice(i, 1);
        this.destroy();
        return;
      }
    }

    if (
      this.positionX < 0 ||
      this.positionX > sizeMapX ||
      this.positionY < 0 ||
      this.positionY > sizeMapY
    ) {
      this.destroy();
    }
  }

  destroy() {
    clearInterval(this.moveInterval);
    clearTimeout(this.selfDestruct); //dont destroy the projectile if he already destroy^^
    this.projectileElement.remove();
  }
}

const player = new Player();
const ennemiList = [];
let ennemi1 = new Ennemies(100, 500);
ennemiList.push(ennemi1);

function spawnEnnemi() {
  const minDistance = 100;
  let randomX, randomY, distance;

  do {
    randomX = Math.floor(Math.random() * sizeMapX);
    randomY = Math.floor(Math.random() * sizeMapY);
    distance = Math.sqrt(
      (randomX - player.positionX) ** 2 + (randomY - player.positionY) ** 2
    );
  } while (distance < minDistance);

  let newEnnemi = new Ennemies(randomX, randomY);
  ennemiList.push(newEnnemi);
}

setInterval(spawnEnnemi, 3000);
setInterval(
  () => ennemiList.forEach((ennemi) => ennemi.ennemiesToPlayer()),
  1000 / 60
);

document.addEventListener("click", (event) => {
  if (event.button === 0) {
    player.shootProjectile(event.clientX, event.clientY);
  }
});
