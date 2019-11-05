import React from "react"
import Logic from "../../Objects/Logic"

export default class Draw extends React.Component {
	 constructor() {
      super()
      
      this.canvasRef = React.createRef();
      this.state = {
        logic : new Logic()
      }
    }

    componentDidMount() {
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

      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0,0, 480, 480);

      let player = this.state.logic.player;
      let enemies = this.state.logic.enemies;
      let map = this.state.logic.map;

      // let merchant = this.state.logic.merchant;
      if (this.state.logic) {
        this.updateLogic();

        this.state.logic.UI.drawMap(map, ctx);
      //   this.state.logic.UI.drawHomeDesign(player, merchant, ctx)
        this.state.logic.UI.drawInventory(player, ctx);
        this.state.logic.UI.drawMapInventory(map.inventory[player.status.currLevel - 1], ctx);

      //   this.state.logic.UI.drawOre(this.state.logic.ore, ctx);
      //   this.state.logic.UI.drawTrees(this.state.logic.trees, ctx);
      //   this.state.logic.UI.drawAnimals(this.state.logic.animals, ctx);
      //   this.state.logic.UI.drawFarm(player, ctx)
        this.state.logic.UI.drawPlayers(player, enemies, ctx);
      //   this.state.logic.UI.drawHome(player, this.state.logic.items, ctx);

      }
         
      this.rAF = requestAnimationFrame(this.updateCanvas);
  }

  handleClick = (e) => {
        const canvas = this.canvasRef.current;
        
        let player = this.state.logic.player
        let map = this.state.logic.map;

        this.state.logic.UI.menuClick(e, canvas);
        this.state.logic.UI.actionClick(e, player, canvas);
        if (player.status.currLevel > -1) {
          this.state.logic.UI.inventoryClick(e, player, canvas);
        }
        this.state.logic.UI.armorClick(e, player, canvas);
        this.state.logic.UI.magicClick(e, player, canvas)
        if (player.body.goHome && player.currLevel === 0) {
          this.state.logic.UI.bankButtonClick(e, player, canvas);
          this.state.logic.UI.homeButtonClick(e, player, canvas);
          this.state.logic.UI.buyButtonClick(e, player, canvas)
          this.state.logic.UI.craftButtonClick(e, player, canvas);
          
        } 
        if (player.body.goFarm && player.status.currLevel === -1) {

          this.state.logic.UI.farmButtonClick(e, player, canvas)
          this.state.logic.UI.farmInventoryClick(e, player, canvas)
        }

        // if (player.currLevel > 0) {
        //   this.state.logic.UI.mapInventoryClick(e, map.inventory[player.currLevel - 1], player,canvas)
        // }
    }

    handleMouseMove(e) {
        const canvas = this.canvasRef.current;

        let player = this.state.logic.player

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

                      if (player.body.goHome && player.currLevel === 0) {
                        this.state.logic.UI.buyButtonDoubleClick(e, player, canvas);
                        this.state.logic.UI.craftButtonDoubleClick(e, player, canvas);
                        this.state.logic.UI.bankButtonDoubleClick(e, player, canvas);
                        this.state.logic.UI.inventoryButtonDoubleClick(e, player, canvas);

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
            />
            </div>

         );
    }

}