class Player {
  constructor() {
    this.positionX = 20;
    this.positionY = 20;
    this.width = 40;
    this.height = 40;

    const playerElement = document.getElementById("Player");
    const mapElement = document.getElementById("Map1");

    let positionX = 20;
    let positionY = 20;
    this.majUi();
  }

  function positionOfPlayer() {
    playerElement.style.left = positionX + "px";
    playerElement.style.top = positionY + "px";
  }

  document.addEventListener("keydown",(event)=>{
    if(event.key === "z" || event.key === "ArrowUp "){
      moveUp();
    }else if (event.key ==="q" || event.key === "") {
      moveLeft();
    }else if (event.key === "s") {
      moveDown()
    }else if (event.key === "d") {
      moveRight()
    }
  })

  majUi() {
    this.playerElm.style.width = this.width + "vw";
  }

  moveLeft() {
    this.positionX--;
    console.log("new position for left", this.positionX);
  }
  moveRight() {
    this.positionX++;
    console.log("new position for right", this.positionX);
  }
  moveDown() {
    this.positionY--;
    console.log("new position for down", this.positionY);
  }
  moveUp() {
    this.positionY++;
    console.log("new position for up", this.positionY);
  }
}

const player = new Player();

player.moveLeft();
player.moveRight();
player.moveLeft();
player.moveRight();
