import React from "react"
import Logic from "../../Objects/Logic"
import PlayerUpdater from "../../Objects/playerUpdater"

import {timer} from "../../Helpers/functions"
import GameStartScreen from "../../Objects/UI/gameStartScreen"
import axios from "axios"
// import RigidBody from "../../Helpers/rigidBody"

// import ClickHandler from "../../Objects/clickhandler"

export default class Draw extends React.Component {
	 constructor() {
      super()
      this.state = {
        greeting : ""
      }
      this.canvasRef = React.createRef();
      this.gameStartScreen = new GameStartScreen();
      this.logic = new Logic();

      this.gameStart = false;
      this.loadHandler = {
          bankLoaded : false,
          playerLoaded : false,
          inventoryLoaded : false,
          skillsLoaded : false,
          armorLoaded : false,


          gameStart : function() {
              if (this.bankLoaded && 
                  this.playerLoaded && 
                  this.inventoryLoaded && 
                  this.skillsLoaded &&
                  this.armorLoaded) {
                return true
              } else {
                return false
              }
          }
      }

      this.playerUpdater = new PlayerUpdater(this.logic.items);
      this.gameStartTimer = timer(100);
      this.saveTimer = timer (4000);
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

    savePlayerInfo() {
       axios.post(`/save`, { 
                                player : {
                                          name: this.logic.player.name,
                                          info : this.logic.player.name,
                                        },
                                gold : this.logic.player.inventory.gold
                              }
                )
      .then(res => {
      })
    }

    savePlayerSkills() {
        axios.post(`/saveSkills`, { 
                                    skills : this.logic.player.skills
                                }
                  )
        .then(res => {
        })
    }

    updatePlayerSkills() {
        axios.post(`/updateSkills`, { 
                                    skills : this.logic.player.skills
                                }
                  )
        .then(res => {
        })
    }

    getPlayerSkills() {
      axios.get(`/skills`)
        .then(res => {
          this.logic.player = this.playerUpdater.updateSkills(this.logic.player, res.data.skills);
          this.loadHandler.skillsLoaded = true;
        })
    }

    getPlayerInventory() {
      axios.get(`/inventory`)
        .then(res => {
          this.logic.player = this.playerUpdater.updateInventory(this.logic.player, res.data.inventory)
          this.loadHandler.inventoryLoaded = true;

        })

    }

    savePlayerInventory() {
       axios.post(`/saveInventory`, { 
                                    inventory : this.logic.player.inventory.spaces
                                }
                  )
        .then(res => {
        })
    }

    getPlayerBank() {
      axios.get(`/bank`)
        .then(res => {
          if (res.data.code === 1) {
            this.logic.player = this.playerUpdater.updateBank(this.logic.player, res.data.bank)
            this.loadHandler.bankLoaded = true;

            
          }
        })
        
    }

    savePlayerBank() {
       axios.post(`/saveBank`, { 
                                    bank : this.logic.player.home.bank.inventory.spaces
                                }
                  )
        .then(res => {
          
        })
    }

    savePlayerArmor() {
      console.log(this.logic.player.armor.getEquipment());
       axios.post(`/saveArmor`, { 
                                    armor : this.logic.player.armor.getEquipment()
                                }
                  )
        .then(res => {
          
        })
    }

     updatePlayerArmor() {
       axios.post(`/updateArmor`, { 
                                    armor : this.logic.player.armor.getEquipment()
                                }
                  )
        .then(res => {
          
        })
    }

     getPlayerArmor() {
      axios.get(`/armor`)
        .then(res => {
          this.logic.player = this.playerUpdater.updateArmor(this.logic.player, res.data.armor)
          this.loadHandler.armorLoaded = true;

        })

    }

    saveCharacter() {
      
      this.savePlayerInfo();
      this.updatePlayerSkills();
      this.savePlayerInventory();
      this.savePlayerBank();
      this.updatePlayerArmor();


    }

    login() {
      axios.post(`/register`, { 
                                name: this.logic.player.name,
                                password: this.logic.player.password,
                              }
                )
      .then(res => {
        if (res.data.code === 1) {
          this.logic.player.password = null;
          //load DATA HERE
          this.logic.player = this.playerUpdater.update(this.logic.player, res.data.user)
          this.getPlayerSkills();
          this.getPlayerInventory();
          this.getPlayerBank();
          this.getPlayerArmor();
          this.loadHandler.playerLoaded = true;
          
        } if (res.data.code === 2) {
          this.savePlayerSkills();
          this.savePlayerArmor();
          this.logic.player.password = null;
          this.gameStartScreen.page = "characterSelect"
          this.gameStartScreen.open = true
        } else {
          this.gameStartScreen.open = true

          this.gameStartScreen.page = "choosePassword"
        }

      })
    }

    updateLogic() {
      
          this.logic = this.logic.play()
      
    }

    updateCanvas = () => {
          const canvas = this.canvasRef.current;
          const ctx = canvas.getContext('2d');


          let player = this.logic.player;
          let ui = this.logic.UI;

          if (!this.gameStart && this.gameStartTimer.check() ) {
            if (this.loadHandler.gameStart()) {
              this.gameStartScreen.open = false;
              this.gameStart = true
            }
            this.gameStartScreen.display(player, ctx);
            ui.drawEntity.handler({
                player: player,
            }, ctx)
          }


      if (this.logic && this.gameStart) {
        if (this.saveTimer.check()) {
            this.saveCharacter()
        }
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
          
          if (this.gameStartScreen.open === false) {
            let res = this.login()

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
          <div style={{width:480, height: 480}}>
            {this.state.greeting}
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