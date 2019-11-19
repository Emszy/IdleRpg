import React from "react"
import Logic from "../../Objects/Logic"
import {timer} from "../../Helpers/functions"
import GameStartScreen from "../../Objects/UI/gameStartScreen"

// import RigidBody from "../../Helpers/rigidBody"

// import ClickHandler from "../../Objects/clickhandler"

export default class Draw extends React.Component {
	 constructor() {
      super()
      
      this.canvasRef = React.createRef();
      this.gameStartScreen = new GameStartScreen();
      this.logic = new Logic();
      this.gameStart = false;
      // this.clickHandler = new ClickHandler();
      this.testTimer = timer(100);
    }

    componentDidMount() {
      let frameRate = 60
      this.frameRateTimer = timer(1000 / frameRate);
      document.getElementById("canvas").focus();
      document.getElementById("canvas").style.cursor = "initial";

      this.updateCanvas();
    }

    componentWillUnmount() {
      cancelAnimationFrame(this.rAF);
    }



    updateLogic() {
      
          this.logic = this.logic.play()
      
    }

    updateCanvas = () => {
          const canvas = this.canvasRef.current;
          const ctx = canvas.getContext('2d');


          let player = this.logic.player;
          let ui = this.logic.UI;

          if (!this.gameStart && this.testTimer.check() ) {
            this.gameStartScreen.display(player, ctx);
            ui.drawEntity.handler({
                player: player,
            }, ctx)
          }


      if (this.logic && this.gameStart) {
        if (this.frameRateTimer.check()) {
          ctx.clearRect(0,0, 480, 480);
          this.updateLogic();
          
          let enemies = this.logic.enemies;
          let map = this.logic.map;
          let merchant = this.logic.merchant;

          ui.drawMap(map, ctx);
          ui.drawHomeDesign(player, merchant, ctx)
          ui.drawInventory(player, ctx);
          ui.drawMapInventory(map.inventory[player.status.currLevel - 1], ctx);

          ui.drawFarm(player, ctx);

          ui.drawEntity.handler({
              player: player,
              enemies: enemies,
              merchant: merchant,
              animals: this.logic.animals,
              trees: this.logic.trees,
              ore: this.logic.ore,

          }, ctx)
          ui.drawHome(player, this.logic.items, ctx);
          ui.drawMouseSwapItem("inventory", ctx)
          ui.drawMouseSwapItem("bank", ctx)
          ui.drawInfoBox(ctx, player.inventory);


        }
      }
          this.rAF = requestAnimationFrame(this.updateCanvas);
  }

  handleClick = (e) => {
        const canvas = this.canvasRef.current;
       

        let player = this.logic.player

        if (!this.gameStart) {
          this.gameStartScreen.clickHandler(player,e,canvas);          
          this.gameStart = this.gameStartScreen.startGame;
          
          if (this.gameStart) {
            this.gameStartScreen = null;
          }
          return false;
        } 

        let merchant = this.logic.merchant
        let ui = this.logic.UI;

          // fire arrow with mouse, might implement this as main way to shoot arrows; 

          // let mouse = this.clickHandler.transformedCoordinate(e, canvas)
          // mouse = {body: new RigidBody(mouse.x, mouse.y, 1,1)};
          // player.range.shoot(player, mouse, 20);


        ui.menuClick(e, canvas);
        ui.actionClick(e, player, canvas);
        if (player.status.currLevel > -1) {
          ui.inventoryClick(e, player, canvas);
        }
        ui.armorClick(e, player, canvas);
        ui.magicClick(e, player, canvas);

        if (player.status.destination === "home" && player.status.currLevel === 0) {
          ui.bankButtonClick(e, player, canvas);
          ui.homeButtonClick(e, player, merchant, canvas);
          ui.buyButtonClick(e, player, canvas)
          ui.craftButtonClick(e, player, canvas);
          
        } 
        if (player.status.destination === "farm" && player.status.currLevel === -1) {
          ui.farmButtonClick(e, player, canvas)
          ui.farmInventoryClick(e, player, canvas)
        }
    }

    handleMouseMove(e) {

        if (!this.gameStart) {
          return false;
        } 

        const canvas = this.canvasRef.current;
        let player = this.logic.player
        this.logic.UI.updateMouse(e, canvas);
        if (player.status.location === "home") {
            this.logic.UI.setHomeInfoBox(
                                      e, 
                                      canvas, 
                                      {
                                        player: {
                                                  inventory: player.inventory,
                                                  grid : this.logic.UI.inventorySpaces,
                                                },
                                        bank : {
                                                  inventory: player.home.bank.inventory,
                                                  grid: this.logic.UI.bankButtons.grid
                                        },
                                        merchant : this.logic.merchant,

                                      }, 
                                      player
                                    );

        }

        if (player.status.location === "wild") {
            this.logic.UI.setWildInfoBox(
                                      e, 
                                      canvas, 
                                      {
                                        enemies : this.logic.enemies,
                                        ore : this.logic.ore,
                                        trees : this.logic.trees,
                                        animals : this.logic.animals,
                                      }, 
                                    );

        }

        let map = this.logic.map;
        if (player.status.currLevel > 0) {
          this.logic.UI.mapInventoryClick(e, map.inventory[player.status.currLevel - 1], player ,canvas)
        }
    }

    render() {
         return (
          <div>
            <canvas ref={this.canvasRef} 
                    width={480} 
                    height={480}
                    style={{border: "1px solid black"}}
                    id = "canvas"

                    tabIndex="0" 
                    onKeyPress={ (e) => {
                      } 
                    }

                    onContextMenu = {(e) => {
                      e.preventDefault()
                      const canvas = this.canvasRef.current;
                      let player = this.logic.player

                      
                      if (player.status.destination === "home" && player.status.currLevel === 0) {
                        this.logic.UI.doubleClickHandler(player, e, canvas);

                      }

                    }
                  }
                    onMouseMove = {(e) => {
                      this.handleMouseMove(e)
                    }
                  }

                  onClick = {(e) => {
                      this.handleClick(e)

                    }
                  }

                  onMouseDown = {(e) => {
                      const canvas = this.canvasRef.current;
                      let player = this.logic.player

                      this.logic.UI.arrangeInventory(player.inventory, e, canvas)
                      this.logic.UI.arrangeBank(player.home.bank.inventory, e, canvas)

                    }
                  }

                  onMouseUp = {(e) => {
                      const canvas = this.canvasRef.current;
                      let player = this.logic.player

                      this.logic.UI.swapInventory(player.inventory, e, canvas)
                      this.logic.UI.swapBank(player.home.bank.inventory, e, canvas)

                    }
                  }
            />
            </div>

         );
    }

}