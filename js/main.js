const playerElement = document.getElementById("Player");
const mapElement = document.getElementById("Map1");

const sizeMapX = mapElement.offsetWidth; // Taille de la carte en largeur
const sizeMapY = mapElement.offsetHeight; // Taille de la carte en hauteur

class Player {
  constructor() {
    this.positionX = 80;
    this.positionY = 90;
    this.width = 50;
    this.height = 30;

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

  //mapElement.offsetHeight for the total height of the element map1(html)
  moveLeft() {
    this.positionX -= 10;
    this.positionX = Math.max(0, this.positionX);
    this.majUi();
  }

  moveRight() {
    this.positionX += 10; // Déplacer vers la droite
    this.positionX = Math.min(
      mapElement.offsetWidth - this.width, // Limite à droite
      this.positionX
    );
    this.majUi();
  }

  moveDown() {
    this.positionY += 10; // Déplacer vers le bas
    this.positionY = Math.min(
      mapElement.offsetHeight - this.height, // Limite en bas
      this.positionY
    );
    this.majUi();
  }

  moveUp() {
    this.positionY -= 10;
    this.positionY = Math.max(0, this.positionY);
    this.majUi();
  }

  shootProjectile(clickX, clickY) {
    const projectileX = this.positionX + this.width / 2 - 5; // Position du projectile devant le joueur
    const projectileY = this.positionY + this.height / 2 - 5; // Centré verticalement

    let newProjectile = new Projectile(
      projectileX,
      projectileY,
      clickX,
      clickY
    );
  }
}

class Ennemies {
  constructor(x = 50, y = 25) {
    this.positionX = x;
    this.positionY = y;
    this.width = 35;
    this.height = 35;
    console.log(this.positionX, this.positionY);
    this.EnnemiesElm = document.createElement("div"); // je créé mon element// i create my element

    this.EnnemiesElm.className = "ennemies";

    this.EnnemiesElm.style.width = this.width + "px";
    this.EnnemiesElm.style.height = this.height + "px";
    this.EnnemiesElm.style.position = "absolute";
    this.EnnemiesElm.style.left = this.positionX + "px";
    this.EnnemiesElm.style.top = this.positionY + "px";

    mapElement.appendChild(this.EnnemiesElm);

    this.speed = 1; // speed of the ennemi/vitesse de l'ennemie
  }

  ennemiesToPlayer() {
    let diffX = player.positionX - this.positionX;
    let diffY = player.positionY - this.positionY;

    let distancePlayerEnnemies = Math.sqrt(diffX * diffX + diffY * diffY); // calcul distance between player and ennemi

    if (distancePlayerEnnemies > 0.1) {
      //like that we dont have the minimal value but not zero
      let directionX = diffX / distancePlayerEnnemies;
      let directionY = diffY / distancePlayerEnnemies;

      this.positionX += directionX * this.speed;
      this.positionY += directionY * this.speed;

      //the ennemi cant go out of the map
      if (this.positionX < 0) {
        this.positionX = 0;
      }
      if (this.positionX + this.width > sizeMapX) {
        this.positionX = sizeMapX - this.width;
      }
      if (this.positionY < 0) {
        this.positionY = 0;
      }
      if (this.positionY + this.height > sizeMapY) {
        this.positionY = sizeMapY - this.height;
      }

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
    this.moveInterval = setInterval(() => this.moveProjectile(), 1000 / 60); // Deplacement en continu
  }

  moveProjectile() {
    // calcul the direction for the projectile
    let diffX = this.targetX - this.positionX;
    let diffY = this.targetY - this.positionY;

    let distance = Math.sqrt(diffX * diffX + diffY * diffY);
    let directionX = diffX / distance;
    let directionY = diffY / distance;

    this.positionX += directionX * this.speed;
    this.positionY += directionY * this.speed;

    this.projectileElement.style.left = this.positionX + "px";
    this.projectileElement.style.top = this.positionY + "px";
    // the projectile dont go out of the map
    if (
      this.positionX < 0 ||
      this.positionX > sizeMapX ||
      this.positionY < 0 ||
      this.positionY > sizeMapY
    ) {
      clearInterval(this.moveInterval);
      this.projectileElement.remove(); // delete the projectile if its out of the map
    }
  }
}

const player = new Player();
const ennemiList = [];
let ennemi1 = new Ennemies(100, 500);

ennemiList.push(ennemi1); // on ajoute le premier ennemie a la liste de tout les ennemies

function spawnEnnemi() {
  const sizeMapX = mapElement.offsetWidth;
  const sizeMapY = mapElement.offsetHeight;

  let randomX = Math.floor(Math.random() * sizeMapX);
  let randomY = Math.floor(Math.random() * sizeMapY);

  let newEnnemi = new Ennemies(randomX, randomY);
  ennemiList.push(newEnnemi);
}

setInterval(spawnEnnemi, 3000); // spawn a new ennemie every 3 seconds

setInterval(() => {
  ennemiList.forEach((ennemi) => {
    ennemi.ennemiesToPlayer();
  });
}, 1000 / 60);

// Écouter les clics de la souris pour tirer un projectile
document.addEventListener("click", (event) => {
  if (event.button === 0) {
    // Clic gauche de la souris
    player.shootProjectile(event.clientX, event.clientY);
  }
});
