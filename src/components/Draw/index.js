import React from "react"
import Logic from "../../Objects/Logic"
import {timer} from "../../Helpers/functions"
export default class Draw extends React.Component {
	 constructor() {
      super()
      
      this.canvasRef = React.createRef();
      this.state = {
        logic : new Logic()
      }
    }

    componentDidMount() {
      let frameRate = 60
      this.frameRateTimer = timer(1000 / frameRate);
      document.getElementById("canvas").focus();
      document.getElementById("canvas").style.cursor = "initial";
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');


      this.updateCanvas();
    }

    componentWillUnmount() {
      cancelAnimationFrame(this.rAF);
    }



    updateLogic() {
      this.setState((prevState) => ({
          logic: prevState.logic.play(),
      }));   
    }

    updateCanvas = () => {

      if (this.state.logic) {
        if (this.frameRateTimer.check()) {
          const canvas = this.canvasRef.current;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0,0, 480, 480);
          this.updateLogic();
          
          let player = this.state.logic.player;
          let enemies = this.state.logic.enemies;
          let map = this.state.logic.map;
          let merchant = this.state.logic.merchant;
          let ui = this.state.logic.UI;

          ui.drawMap(map, ctx);
          ui.drawHomeDesign(player, merchant, ctx)
          ui.drawInventory(player, ctx);
          ui.drawMapInventory(map.inventory[player.status.currLevel - 1], ctx);

          ui.drawFarm(player, ctx);

          ui.drawEntity.handler({
              player: player,
              enemies: enemies,
              merchant: merchant,
              animals: this.state.logic.animals,
              trees: this.state.logic.trees,
              ore: this.state.logic.ore,

          }, ctx)
          // ui.drawPlayers(player, enemies, ctx);
          ui.drawHome(player, this.state.logic.items, ctx);
          ui.drawMouseSwapItem(ctx)

        }
          this.rAF = requestAnimationFrame(this.updateCanvas);
      }
  }

  handleClick = (e) => {
        const canvas = this.canvasRef.current;
        
        let player = this.state.logic.player
        let merchant = this.state.logic.merchant
        let map = this.state.logic.map;
        let ui = this.state.logic.UI;

        ui.menuClick(e, canvas);
        ui.actionClick(e, player, canvas);
        if (player.status.currLevel > -1) {
          ui.inventoryClick(e, player, canvas);
        }
        ui.armorClick(e, player, canvas);
        ui.magicClick(e, player, canvas)
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
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        let player = this.state.logic.player
        this.state.logic.UI.updateMouse(e, canvas);
        let map = this.state.logic.map;
        if (player.status.currLevel > 0) {
          this.state.logic.UI.mapInventoryClick(e, map.inventory[player.status.currLevel - 1], player ,canvas)
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
                        if (e.key == 1) {
                          this.state.logic.player.skills.attack.levelUpBy(2000);
                          this.state.logic.player.skills.attack.equalize();

                        }

                        if (e.key == 2) {
                          this.state.logic.player.skills.attackSpeed.levelUpBy(2000);
                          this.state.logic.player.skills.attackSpeed.equalize();

                        }

                        if (e.key == 3) {
                          this.state.logic.player.skills.health.levelUpBy(2000);
                          this.state.logic.player.skills.health.equalize();

                        }
                         if (e.key == 4) {
                          this.state.logic.player.skills.mining.levelUpBy(2000);
                          this.state.logic.player.skills.mining.equalize();

                        }
                        if (e.key == 5) {
                          this.state.logic.player.skills.woodcutting.levelUpBy(2000);
                          this.state.logic.player.skills.woodcutting.equalize();
                        }

                        if (e.key == 6) {
                          this.state.logic.player.skills.hunting.levelUpBy(2000);
                          this.state.logic.player.skills.hunting.equalize();
                        }
                      } 
                    }

                    onContextMenu = {(e) => {
                      e.preventDefault()
                      const canvas = this.canvasRef.current;
                      let player = this.state.logic.player

                      
                      if (player.status.destination === "home" && player.status.currLevel === 0) {
                        this.state.logic.UI.doubleClickHandler(player, e, canvas);

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
                      let player = this.state.logic.player

                      this.state.logic.UI.arrangeInventory(player.inventory, e, canvas)
                    }
                  }

                  onMouseUp = {(e) => {
                      const canvas = this.canvasRef.current;
                      let player = this.state.logic.player

                      this.state.logic.UI.swapInventory(player.inventory, e, canvas)
                    }
                  }
            />
            </div>

         );
    }

}