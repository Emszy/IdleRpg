import RigidBody from "../../Helpers/rigidBody"
import Draw from "./draw"
import DrawEntity from "./DrawEntity"
import MakeMenu from "./MakeMenu"
import {timer} from "../../Helpers/functions"
import ClickHandler from "../clickhandler"
import {userInterface} from "../../Objects/Animations/images"


export default class UI {
	constructor(items, player) {
    this.clickHandler = new ClickHandler();
    this.drawEntity = new DrawEntity();
    this.draw = new Draw();

    let makeMenu = new MakeMenu();

		this.currentHomeMenu = "none";
    this.inventoryMenu = "inventory";
    this.magicMenu = makeMenu.magic();
    this.buyMenu = makeMenu.vendor(items, "buyable");
    this.craftMenu = makeMenu.vendor(items, "craftable");

    this.inventoryMenuButtons = makeMenu.inventoryButtons()
    this.inventorySpaces = makeMenu.inventorySpaces();

		this.actionButtons = makeMenu.actionButtons(player);

		this.bankButtons = makeMenu.bank();
		
    this.armorButtons = [];

    this.infoBox = {
                  body : new RigidBody(150,150,50,50),
                  draw : new Draw(),
                  infoItem: false,
                  
                  timer : timer(500),

                  background : {
                    img: userInterface.itemInfoBackGround,
                    body : new RigidBody(150,150,50,50),
                    width : userInterface.itemInfoBackGround.pos.width,
                    height : userInterface.itemInfoBackGround.pos.height,

                     setPos : function(x,y) {
                        this.body.setPos(x,y)
                     }

                  },

                  display : function(ctx) {
                      if (this.infoItem && this.timer.isDone()) {
                        ctx.globalAlpha = 0.6;
                        this.draw.img(this.background.img, 
                                          this.background.body.pos.x-50,
                                          this.background.body.pos.y-50,
                                          this.background.body.size.x,
                                          this.background.body.size.y,
                                          ctx,
                                        );
                        ctx.globalAlpha = 1
                        this.draw.text(
                                          this.infoItem.info, 
                                          this.body.pos.x - 50, 
                                          this.body.pos.y - 40, 
                                          10,
                                          ctx,
                                          "white"
                                        )

                      }
                  },

                  setPos : function(x,y) {
                    this.body.setPos(x,y)
                  }
    }

    this.mouseSwapItem = {
                      inventory : {
                              swap : false,
                              index : false,
                              item : false
                      },

                      bank : {
                              swap : false,
                              index : false,
                              item : false
                      }
    };

    this.mousePosition = {
                  x: false,
                  y: false,
    }

    this.farmButtons = {
        spaces : [],
        controls: [],
        open : true,
    }

    this.waterWellButton = {
      open : false,
      collect : function(player) {
        if (this.open === true) {
          player.home.waterWell.getWater(player.inventory);
        }
      }
    }

    this.rightClickMenu = {
        background : this.button(0, 0, 50, 100),
        index : -1,
        buttons : [],
        open : false,
        menu : "",
        clear : function() {
                  this.menu = "";
                  this.open = false
                  this.index = -1
                  this.buttons = []
        }

    }

   
		this.homeMenuButtons = [];

		this.makeArmorMenu();

		this.makeHomeActionButtons(player);
    this.makeFarmButtons(player);

	}

  setInfoBox(mouse, canvas, menus) {
    
    let inventoryClick = menus.player.grid.click(mouse, canvas);
    let bankClick = menus.bank.grid.click(mouse, canvas);
    
    let buySettings = this.getMenuConfig(this.buyMenu)
    let buyClick = buySettings.items.grid.click(mouse, canvas);


    let craftSettings = this.getMenuConfig(this.craftMenu)
    let craftClick = craftSettings.items.grid.click(mouse, canvas);

    this.infoBox.timer.reset();
    if(inventoryClick.click) {
      this.infoBox.infoItem = menus.player.inventory.spaces[inventoryClick.index];
    } else if (bankClick.click && this.currentHomeMenu === "bank") {
      this.infoBox.infoItem = menus.bank.inventory.spaces[bankClick.index];
    } else if (buyClick.click && this.currentHomeMenu === "buy") {
      this.infoBox.infoItem = buySettings.items.items[buyClick.index];
    } else if (craftClick.click && this.currentHomeMenu === "craft") {
      this.infoBox.infoItem = craftSettings.items.items[craftClick.index];
    } else {
      this.infoBox.infoItem = false
    }

  }




  // setMenuInfoBox(mouse, canvas, inventory, grid) {
  //   let click = grid.click(mouse, canvas);
  //   if(click.click) {
  //     this.infoBox.infoItem = inventory.spaces[click.index];
  //   } else {
  //     this.infoBox.infoItem = false;
  //   }
  // }

  drawInfoBox(ctx) {
        this.infoBox.background.setPos(this.mousePosition.x, this.mousePosition.y)
        this.infoBox.setPos(this.mousePosition.x, this.mousePosition.y)
        this.infoBox.display(ctx);
  }


  getMenuConfig(menu) {
            let subCategory = menu.subCategoryGrids[menu.currentCategory];
            let items = subCategory.itemGrids[menu.currentSubcategory];
          return({
            currentCategory : menu.currentCategory,
            currentSubcategory : menu.currentSubcategory,
            categories : menu.categoryGrid,
            subCategory : subCategory,
            items : items,
            imgs : items.items
          })

  }

	//map
	drawMap(map, ctx) {

    for (let x = 0; x < map.height; x++) {
      for (let y = 0; y < map.width; y++) {
        let tile = map.tiles[y][x]
        map.animation.drawImageBase(tile.info.terrain, tile.info.type, tile.info.img, tile.body.pos, ctx)
      }
    }

    for (let y = 0; y < map.layer.length; y++) {
        let tile = map.layer[y]
        map.animation.drawImageLayer(tile.info.terrain, tile.info.type, tile.info.img, tile.body.pos, ctx)
      }
  }

  drawMapInventory(inventory, ctx) {
    if (!inventory) {
      return (false);
    }
    for (let i = 0; i < inventory.spaces.length; i++) {
        if (inventory.spaces[i].id !== -1) {
          this.draw.inventoryItemImg(inventory.spaces[i].img, inventory.spaces[i].body.pos.x - 12, inventory.spaces[i].body.pos.y - 12, ctx)
        }
    }
  }

  mapInventoryClick(mouse, inventory, player, canvas) {
    let len = inventory.spaces.length
         for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, inventory.spaces[x], canvas))
            {
              if(player.inventory.addQuantity(inventory.spaces[x], inventory.spaces[x].quantity)) {
                inventory.delete(x);
              }
            }
        }
  }

 // stats

	drawPlayerStats(player, ctx) {
		let xOffset = 370;
		let yOffset = 50;
		let yIncrement = 15
		let yXpIncrement = 10

		let skills = player.skills
		let inventory = player.inventory

    let skillKeys = Object.keys(skills)
		let key = false;
    this.draw.img(userInterface.stats, 360, 0, 120,480, ctx)
		for (key of skillKeys) {
        this.draw.text(skills[key].show(), xOffset, yOffset += yIncrement, "10", ctx);
    		this.draw.text(skills[key].showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);
    }

		yOffset += 40
		this.draw.text("Gold: " + inventory.gold, xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text("Level: " + player.status.currLevel, xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text("Highest Level: " + player.status.highestLevel, xOffset, yOffset += yIncrement, "10", ctx);

  	}
  	
	// inventory


	drawSpacesForInventory(player, ctx) {   
      this.inventorySpaces.drawGrid(ctx)
      this.inventorySpaces.drawInventory(player.inventory, ctx)
  }

	drawInventory(player, ctx) { 
		  if (this.inventoryMenu === "inventory") {
		    this.drawSpacesForInventory(player, ctx);
		  } else if (this.inventoryMenu === "armor") {
		    this.drawSpacesForArmor(ctx);
		    this.drawPlayerArmor(player,ctx)
		  } else if (this.inventoryMenu === "stats") {
		    this.drawPlayerStats(player, ctx)
		  } else if (this.inventoryMenu === "magic") {
        this.draw.img(userInterface.stats, 360, 0,120,480, ctx)
        this.magicMenu.drawGrid(ctx);
      }

      this.inventoryMenuButtons.drawGrid(ctx);
		  this.drawActionButtons(ctx);
	}

  drawHomeDesign(player, merchant, ctx) {
      if (player.status.currLevel === 0) {
        for (var i = 0; i < player.home.floor.length; i++) {
          player.home.floorAnimation.drawFloor(player.home.floor[i].index, player.home.floor[i], ctx)
        }

        player.home.wallAnimation.drawWall(ctx);
        this.drawHomeActionButtons(player, ctx)
      }
  }

	drawHome(player, items, ctx) {
		if (player.status.currLevel === 0) {

			if (this.currentHomeMenu === "bank") {
				this.drawBankButtons(player, ctx);
			}
			if (this.currentHomeMenu === "buy") {
				this.drawMenu(this.buyMenu, ctx);
			}
      if (this.currentHomeMenu === "craft") {
        this.drawMenu(this.craftMenu, ctx);
      }
      if (this.rightClickMenu.open === true) {
        this.drawDoubleClickButtons(player, ctx);
      }
      this.waterWellButton.collect(player);

		}
      
	}

  drawFarm(player, ctx) {
    if (player.status.destination === "farm" && player.status.currLevel === -1) {
      this.drawFarmButtons(player, ctx);
    }
  }

  drawActionButtons(ctx){
      this.actionButtons.drawGrid(ctx);
  }

  drawHomeActionButtons(player, ctx){
    
      this.draw.img(userInterface.greenButton,this.homeMenuButtons[3].button.body.pos.x - 10,this.homeMenuButtons[3].button.body.pos.y - 13, 85, 30,  ctx);

      this.draw.label(this.homeMenuButtons[3], ctx);
      player.home.bank.animation.drawImage("open", player.home.bank, ctx)
      player.home.waterWell.animation.drawWaterWell(player.home.waterWell, ctx);

      player.home.buyMenu.animation.drawCraftCorner(player.home.buyMenu, ctx)


  }

// armor
  drawSpacesForArmor(ctx){
        this.draw.img(userInterface.armor, 360, 0, 120,480, ctx)
  }

  armorDrawCheck(armor, ctx) {
  		if (armor.id === -1) {
  			return false
  		}

      if (armor.img) {
        this.draw.inventoryItemImg(armor.img, armor.body.pos.x, armor.body.pos.y, ctx)
      } else {
    		this.draw.text(armor.name, armor.body.pos.x, armor.body.pos.y + 10, "9", ctx);
      }
  }

  arrowArmorDrawCheck(armor, ctx) {
      if (armor.id === -1) {
        return false
      }
      if (armor.img) {
        this.draw.inventoryItemImg(armor.img, armor.body.pos.x, armor.body.pos.y, ctx)
      } else {
        this.draw.text(armor.quantity, armor.body.pos.x, armor.body.pos.y + 20, "9", ctx);
        this.draw.text(armor.name, armor.body.pos.x, armor.body.pos.y + 10, "9", ctx);
      }


  }

  drawPlayerArmor(player, ctx) {
  	this.armorDrawCheck(player.armor.helm, ctx);
		this.armorDrawCheck(player.armor.chest, ctx);
		this.armorDrawCheck(player.armor.legs, ctx);
		this.armorDrawCheck(player.armor.feet, ctx);
		this.armorDrawCheck(player.armor.weapon, ctx);
		this.armorDrawCheck(player.armor.shield, ctx);
    this.armorDrawCheck(player.armor.pickAxe, ctx);
    this.armorDrawCheck(player.armor.axe, ctx);
    this.armorDrawCheck(player.armor.bow, ctx);
    this.arrowArmorDrawCheck(player.armor.arrows, ctx);


		this.draw.text("Attack Bonus: ", 360, 375, "10", ctx);
    this.draw.text(player.armor.attackBonus, 450, 375, "10", ctx);

    this.draw.text("Speed Bonus: ", 360, 385, "10", ctx);
    this.draw.text(player.armor.attackSpeedBonus, 450, 385, "10", ctx);

		this.draw.text("Defense Bonus: ", 360, 395, "10", ctx);
    this.draw.text(player.armor.defenseBonus, 450, 395, "10", ctx);

    this.draw.text("Mining Bonus: ", 360, 415, "10", ctx);
    this.draw.text(player.armor.miningBonus, 450, 415, "10", ctx);

    this.draw.text("Woodcut Bonus: ", 360, 435, "10", ctx);
    this.draw.text(player.armor.woodCuttingBonus, 450, 435, "10", ctx);


  }

  //toggle and settings

	menuClick(mouse, canvas) {
	
    let click = this.inventoryMenuButtons.click(mouse, canvas)
        if (click.click)
            {
              if (click.index === 0) {
                this.showItemMenu();
              } else if (click.index === 1) {
                this.showArmorMenu();
              } else if (click.index === 2) {
                this.showStatsMenu();
              } else if (click.index === 3) {
                this.showMagicMenu();
              }
            }
	}

  magicClick(mouse, player, canvas) {
    if (this.inventoryMenu !== "magic") {
      return false;
    }
    let click = this.magicMenu.click(mouse, canvas)
      if (click.click)
      {
         switch (click.index) {
          case 0:
            player.magic.teleport.home(player);
            break
          case 1:
            player.magic.teleport.ten(player);
            break
          case 2:
            player.magic.teleport.fifty(player);
            break
          case 3:
            player.magic.archery.five(player);
            break
          case 4:
            player.magic.archery.ten(player);
            break
          case 5:
            player.magic.archery.thirty(player);
            break
          case 6:
            player.magic.defense.five(player);
            break
          case 7:
            player.magic.defense.ten(player);
            break
          case 8:
            player.magic.defense.thirty(player);
            break
          case 9:
            player.magic.attack.five(player);
            break
          case 10:
            player.magic.attack.ten(player);
            break
          case 11:
            player.magic.attack.thirty(player);
            break
          case 12:
            player.magic.mining.five(player);
            break
          case 13:
            player.magic.mining.ten(player);
            break
          case 14:
            player.magic.mining.thirty(player);
            break
          case 15:
            player.magic.woodcutting.five(player);
            break
          case 16:
            player.magic.woodcutting.ten(player);
            break
          case 17:
            player.magic.woodcutting.thirty(player);
            break
          case 18:
            player.magic.hunting.five(player);
            break
          case 19:
            player.magic.hunting.ten(player);
            break
          case 20:
            player.magic.hunting.thirty(player);
            break
          default : 
            break;

         }
      }

  }

  teleportHomeLabel(player) {
         this.actionButtons[3].label.changeLabel("Stop");
  }

  actionToggle(action, index) {
    if (action.state === false) {
       action.start()
    } else {
       action.stop()
    }
    this.actionButtons.changeImg(index, action.button())
    this.actionButtons.changeLabel(index, action.label())

  }

	actionClick(mouse, player, canvas) {
      if (this.currentHomeMenu !== "none") {
        return false
      }

      let click = this.actionButtons.click(mouse, canvas)
		  if (click.click) {
        let keys =  Object.keys(player.status.actions)
        this.actionToggle(player.status.actions[keys[click.index]], click.index);
      }
   
	}

  
  arrangeInventory(inventory, mouse, canvas) {
    if (this.inventoryMenu !== "inventory") {
        return false
    }
        this.mouseSwapItem.inventory.swap = false;
        let click = this.inventorySpaces.click(mouse, canvas)
        if (click.click) {
            this.mouseSwapItem.inventory.index = click.index
            this.mouseSwapItem.inventory.item = inventory.spaces[click.index];
        }
  }

  swapInventory(inventory, mouse, canvas) {
        if (this.inventoryMenu !== "inventory") {
            return false
        }
        let click = this.inventorySpaces.click(mouse, canvas)
        if (click.click) {
            if (click.index !== this.mouseSwapItem.inventory.index && this.mouseSwapItem.inventory.item) {
              inventory.swap(this.mouseSwapItem.inventory.index, click.index);
              this.mouseSwapItem.inventory.swap = true;
            } else {
              this.mouseSwapItem.inventory.swap = false;
            }
        }
        this.mouseSwapItem.inventory.item = false;
        this.mouseSwapItem.inventory.index = false
  }

   arrangeBank(inventory, mouse, canvas) {
    if (this.currentHomeMenu !== "bank") {
        return false
    }
        this.mouseSwapItem.bank.swap = false;
        let click = this.bankButtons.grid.click(mouse, canvas)
        if (click.click) {
            this.mouseSwapItem.bank.index = click.index + this.bankButtons.page
            this.mouseSwapItem.bank.item = inventory.spaces[click.index + this.bankButtons.page];
        }
  }

  swapBank(inventory, mouse, canvas) {
        if (this.currentHomeMenu !== "bank") {
            return false
        }
        let click = this.bankButtons.grid.click(mouse, canvas)
        if (click.click) {
            if (click.index !== this.mouseSwapItem.bank.index && this.mouseSwapItem.bank.item) {
              inventory.swap(this.mouseSwapItem.bank.index, click.index + this.bankButtons.page);
              this.mouseSwapItem.bank.swap = true;
            } else {
              this.mouseSwapItem.bank.swap = false;
            }
        }
        this.mouseSwapItem.bank.item = false;
        this.mouseSwapItem.bank.index = false
  }

  drawMouseSwapItem(menu, ctx) {
      if (this.mouseSwapItem[menu].item.img && this.mousePosition.x && this.mousePosition.y && ctx) {
        this.draw.inventoryItemImg(this.mouseSwapItem[menu].item.img, this.mousePosition.x - 10, this.mousePosition.y - 10, ctx);
      } else if (this.mouseSwapItem[menu].item.name && this.mouseSwapItem[menu].item.id !== -1){
        this.draw.text(this.mouseSwapItem[menu].item.name, this.mousePosition.x - 10, this.mousePosition.y - 10, 10, ctx)
      }
  }

  updateMouse(mouse,canvas) {
    this.mousePosition = this.clickHandler.transformedCoordinate(mouse, canvas);
  }


	inventoryClick(mouse, player, canvas) {
		if (this.inventoryMenu !== "inventory" || this.mouseSwapItem.inventory.swap === true) {
			return false
 		} 

      let len = this.rightClickMenu.buttons.length;
        let bank = player.home.bank;
        if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "inventory" && (this.currentHomeMenu === "bank" || this.currentHomeMenu === "buy")) {
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let max = player.inventory.spaces[this.rightClickMenu.index].quantity
              let quantity = this.getDoubleClickQuantity(i, max);
              if (this.currentHomeMenu === "buy") {
                 if (player.inventory.sell(this.rightClickMenu.index, quantity)) {
                    this.rightClickMenu.clear();
                 }
              } else {
                bank.inventory.addQuantity(player.inventory.spaces[this.rightClickMenu.index], quantity)
                if (player.inventory.deleteQuantity(this.rightClickMenu.index, quantity))
                {
                  this.rightClickMenu.clear();
                }

              }
              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }


		  let click = this.inventorySpaces.click(mouse, canvas)
     
        if (click.click)
        {
          if (this.currentHomeMenu === "bank") {
            player.home.bank.inventory.add(player.inventory.spaces[click.index])
            player.inventory.deleteOne(click.index);
          } else if (this.currentHomeMenu === "buy") {
            player.inventory.sell(click.index, 1);
          } else {
            if (player.inventory.spaces[click.index].wearable) {
              player.inventory.wearItem(player.armor, click.index)
            } else if (player.inventory.spaces[click.index].magic) {
            } else {
              player.inventory.useItem(player.skills, click.index)
          }
        
      }
    }
	}


  farmInventoryClick(mouse, player, canvas) {
    
      let click = this.inventorySpaces.click(mouse, canvas)
        if (click.click)
        {
            if (player.inventory.spaces[click.index].quantity > 5) {
              if (player.home.farm.add(player.inventory.spaces[click.index])) {
                player.inventory.deleteQuantity(click.index,5);
              }
            }
            if (player.home.farm.addWater(player.inventory.spaces[click.index])) {
                player.inventory.deleteOne(click.index);
            }
        }
    }




  drawBankButtons(player, ctx){
        let page = this.bankButtons.page;
        this.bankButtons.grid.drawGrid(ctx)
        this.bankButtons.grid.drawInventory(player.home.bank.inventory, ctx, page)
        this.bankButtons.grid.drawControls(ctx);
    }


  drawMenu(menu, ctx){
      let settings = this.getMenuConfig(menu);
      settings.categories.drawGrid(ctx);
      settings.subCategory.grid.drawGrid(ctx);
      settings.items.grid.drawGrid(ctx);
      settings.items.grid.drawItems(settings.imgs, ctx);
      settings.categories.drawControls(ctx);

  }


    getDoubleClickQuantity(index, max) {
          let quantity = 0;
          if (index === 0) {
            quantity = 10;
          } else if (index === 1) {
            quantity = 50;
          } else if (index === 2) {
             quantity = max
          }

          if (quantity > max) {
              quantity = max
          }
          return (quantity)
    }



    menuButtonClick(menu, player, purchaseType, mouse, canvas) {
            let settings = this.getMenuConfig(menu)
            
            let click = settings.categories.controlClick(mouse, canvas)    
            if (click.click)
            {
              if (click.index === 0) {
                  this.currentHomeMenu = "none"
              }
            }

            click = settings.items.grid.click(mouse, canvas);

            if (click.click)
            {
              let item = settings.items.items[click.index];
              if (purchaseType === "buy") {
                player.inventory.buy(item, 1)
              } else if (purchaseType === "craft") {
                player.inventory.craft(item, 1)
              }
            }

            click = settings.categories.click(mouse, canvas);
            if (click.click)
            {
               menu.currentCategory = click.label;
               menu.currentSubcategory = menu.subCategoryGrids[menu.currentCategory].first
            }

            click = settings.subCategory.grid.click(mouse,canvas);
            if (click.click)
            {
              menu.currentSubcategory = click.label;
            }
    }


    buyButtonClick(mouse, player, canvas) {
    if (this.currentHomeMenu !== "buy") {
     return false
    }

    let len = this.rightClickMenu.buttons.length;

     if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "buy") {
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let item = this.buyMenu.subCategoryGrids[this.buyMenu.currentCategory].itemGrids[this.buyMenu.currentSubcategory].items[this.rightClickMenu.index];
              if (player.inventory.gold <= 0 || item.price > player.inventory.gold) {
                  return (false)
              }
              let quantity = this.getDoubleClickQuantity(i, Math.floor(player.inventory.gold / item.price));
              player.inventory.buy(item, quantity)
              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }

        this.menuButtonClick(this.buyMenu, player, "buy", mouse, canvas)

  }




  drawDoubleClickButtons(player, ctx) {

    if (this.rightClickMenu.open === true) {
        this.draw.fillRect(this.rightClickMenu.background, "black", ctx)
        for (var i = this.rightClickMenu.buttons.length - 1; i >= 0; i--) {
          this.draw.img(userInterface.aquaButton, this.rightClickMenu.buttons[i].button.body.pos.x,this.rightClickMenu.buttons[i].button.body.pos.y, 50, 35,  ctx)
          this.draw.label(this.rightClickMenu.buttons[i], ctx)

        }
    }
  }

  doubleClickHandler(player, mouse, canvas) {
      
      let menuSettings = {
        player : player,
        mouse : mouse, 
        canvas : canvas, 
      };

      let inventorySettings = {
        player : player,
        mouse : mouse, 
        canvas : canvas, 
      };

      switch (this.currentHomeMenu) {
        case "bank" :
          menuSettings.grid = this.bankButtons.grid;
          menuSettings.tag = "bank";
          menuSettings.page = this.bankButtons.page;

          inventorySettings.grid = this.inventorySpaces
          inventorySettings.tag = "inventory"

          break;
        case "buy" :
          menuSettings.grid = this.buyMenu.subCategoryGrids[this.buyMenu.currentCategory].itemGrids[this.buyMenu.currentSubcategory].grid;
          menuSettings.tag = "buy";

          inventorySettings.grid = this.inventorySpaces
          inventorySettings.tag = "inventory"

          break;
        case "craft":
          menuSettings.grid = this.craftMenu.subCategoryGrids[this.craftMenu.currentCategory].itemGrids[this.craftMenu.currentSubcategory].grid;
          menuSettings.tag = "craft";

            break;
        default :
          break;
      }
  
      if (menuSettings.grid) {
         this.doubleClick(menuSettings)
      }
      if (inventorySettings.grid) {
        this.doubleClick(inventorySettings)
      }
  }

  doubleClick(settings) {
                let page = settings.page || 0;

        let click = settings.grid.click(settings.mouse, settings.canvas);
        if (click.click)
        { 
          let coordinate = this.clickHandler.transformedCoordinate(settings.mouse, settings.canvas)
          this.makeRightClickButtons(settings.tag, click.index + page, coordinate.x, coordinate.y);
        }
  }

	bankButtonClick(mouse, player, canvas) {
		if (this.currentHomeMenu !== "bank" || this.mouseSwapItem.bank.swap === true) {
			return false
		}
        let page = this.bankButtons.page;
        let len = this.rightClickMenu.buttons.length;
        let bank = player.home.bank;
        if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "bank") {
          let maxAmount = bank.inventory.spaces[this.rightClickMenu.index].quantity
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let quantity = this.getDoubleClickQuantity(i, maxAmount);

              player.inventory.addQuantity(bank.inventory.spaces[this.rightClickMenu.index], quantity)
              if (bank.inventory.deleteQuantity(this.rightClickMenu.index, quantity))
              {
                this.rightClickMenu.clear();
              }
              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }

            let click = this.bankButtons.grid.click(mouse, canvas);
            console.log(page)
            if (click.click)
            { 
      				if (player.inventory.add(player.home.bank.inventory.spaces[click.index + page])) {
      				  player.home.bank.inventory.deleteOne(click.index + page)
              }
            }

            click = this.bankButtons.grid.controlClick(mouse, canvas);

            if (click.click)
            {
            	if (click.index === 0) {
              		this.bankButtons.page -= 20;
              		if (this.bankButtons.page < 0) {
              			this.bankButtons.page = 0
              			return false
              		}
              		this.bankButtons.grid.controls[3].button.body.pos.y -= 35;

              } else if (click.index === 1) {
            		this.bankButtons.page += 20;
            		  if (this.bankButtons.page > 150) {
              			this.bankButtons.page = 150
              			return false;
              		}
              		this.bankButtons.grid.controls[3].button.body.pos.y += 35;


              } else if (click.index === 2) {
                this.currentHomeMenu = "none";

              }
          }
	}


	

    craftButtonClick(mouse, player, canvas) {
    if (this.currentHomeMenu !== "craft") {
      return false
    }

    this.showItemMenu()

    let len = this.rightClickMenu.buttons.length;

     if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "craft") {
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let item = this.craftMenu.subCategoryGrids[this.craftMenu.currentCategory].itemGrids[this.craftMenu.currentSubcategory].items[this.rightClickMenu.index];
              let maxAmount = player.inventory.maxCraft(item);
              let quantity = this.getDoubleClickQuantity(i, maxAmount)
              player.inventory.craft(item, quantity)
              this.rightClickMenu.clear();
              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }


          let currentCategory = this.craftMenu.currentCategory;
          let currentSubcategory = this.craftMenu.currentSubcategory;

          let categories = this.craftMenu.categoryGrid
          let subCategory = this.craftMenu.subCategoryGrids[currentCategory];
          let itemGrid = subCategory.itemGrids[currentSubcategory]

            let click = categories.controlClick(mouse, canvas)    
            if (click.click)
            {
              if (click.index === 0) {
                  this.currentHomeMenu = "none"
              }
            }

            click = itemGrid.grid.click(mouse, canvas);

            if (click.click)
            {
              let item = this.craftMenu.subCategoryGrids[this.craftMenu.currentCategory].itemGrids[this.craftMenu.currentSubcategory].items[click.index];
              player.inventory.craft(item, 1)
            }

            click = categories.click(mouse, canvas);
            if (click.click)
            {
               this.craftMenu.currentCategory = click.label;
               this.craftMenu.currentSubcategory = this.craftMenu.subCategoryGrids[this.craftMenu.currentCategory].first
            }

            click = subCategory.grid.click(mouse,canvas);
            if (click.click)
            {
              this.craftMenu.currentSubcategory = click.label;
            }
  }




	homeButtonClick(mouse, player, merchant, canvas) {
		
    if (this.currentHomeMenu !== "none") {
      return false;
    }

    if (this.clickHandler.click(mouse, merchant, canvas)) {
      this.currentHomeMenu = "buy"
    }
    let len = this.homeMenuButtons.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.homeMenuButtons[x].button, canvas))
            {

            	if (x === 0) {
                this.currentHomeMenu = "bank";
                this.homeMenuButtons[x].label.changeLabel("Water");
            	} else if (x === 1) {
                this.currentHomeMenu = "craft";
                this.homeMenuButtons[x].label.changeLabel("Water");
            	} else if (x === 2) {

                if (this.waterWellButton.open) {
                  this.waterWellButton.open = false
                  this.homeMenuButtons[x].label.changeLabel("Water");
                } else {
                  if (this.currentHomeMenu === "none") {
                    this.waterWellButton.open = true
                    this.homeMenuButtons[x].label.changeLabel("Stop"); 
                  }
                }
            	} else if (x === 3) {
                  if (this.currentHomeMenu === "none") {
                    player.home.waterWell.upgrade(player.inventory);
                    this.homeMenuButtons[x].label.changeLabel(player.home.waterWell.upgradeStr());
                  }

            	}
            }
        }
	}


	armorClick(mouse, player, canvas) {
		if (this.inventoryMenu !== "armor") {
			return false
		}
		let len = this.armorButtons.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.armorButtons[x].button, canvas))
            {
                if (x === 0) {
                	player.armor.removeHelm(player.inventory);
                } else if (x === 1){
                	player.armor.removeChest(player.inventory);
                } else if (x === 2){
                	player.armor.removeWeapon(player.inventory);
                } else if (x === 3){
                	player.armor.removeShield(player.inventory);
                } else if (x === 4){
                	player.armor.removeLegs(player.inventory);
                } else if (x === 5){
               		player.armor.removeFeet(player.inventory);	
                } else if (x === 6){
                  player.armor.removePickAxe(player.inventory);  
                } else if (x === 7){
                  player.armor.removeAxe(player.inventory);  
                } else if (x === 8){
                  player.armor.removeArrows(player.inventory);  
                } else if (x === 9){
                  player.armor.removeBow(player.inventory);  
                } 
            }
        }
	}


	showItemMenu() {
    this.inventoryMenu = "inventory"
	}

	showArmorMenu() {
		this.inventoryMenu = "armor"
	}

	showStatsMenu() {
		this.inventoryMenu = "stats"
	}

	showMagicMenu() {
		this.inventoryMenu = "magic"
	}


	armorButton(button, label) {
		this.armorButtons.push({button: button, label:label})
	}

	homeButton(button, label) {
		this.homeMenuButtons.push({button: button, label:label})
	}

  

	button (x, y, width, height) {
		return ({
			body : new RigidBody(x,y,width,height)
		})
	}

	label(label, x, y, fontSize) {
		return ({
			body : new RigidBody(x,y,32,32),
			fontSize: fontSize,
			label: label,

			changeLabel : function(label) {
				this.label = label;
			}

		})
	}

	
	makeArmorMenu() {
          this.armorButton(
    			  this.button(400, 135, 40, 40),
    		  	this.label("Helm", 405, 130, "10")
    		  )

          this.armorButton(
    			  this.button(400, 195, 40, 40),
    			  this.label("Chest", 405, 190, "10")
		      )

          this.armorButton(
    			  this.button(360, 195, 40, 40),
    			  this.label("Weapon", 360, 190, "10")
		      )

          this.armorButton(
    			  this.button(440, 195, 40, 40),
    			  this.label("Shield", 440, 190, "10")
		      )

          this.armorButton(
    			  this.button(400, 255, 40, 40),
    			  this.label("Legs", 405, 250, "10")
		      )

         this.armorButton(
      			this.button(400, 315, 40, 40),
      			this.label("Boots", 405, 310, "10")
		      )
         this.armorButton(
            this.button(360, 15, 40, 40),
            this.label("Pic", 365, 10, "10")
          )
         this.armorButton(
            this.button(360, 70, 40, 40),
            this.label("Axe", 365, 65, "10")
          )

         this.armorButton(
            this.button(440, 15, 40, 40),
            this.label("Arrows", 440, 10, "10")
          )
         this.armorButton(
            this.button(440, 70, 40, 40),
            this.label("Bow", 440, 65, "10")
          )
     
	}

	makeHomeActionButtons(player) {

    let bank = player.home.bank;
    let buy = player.home.buyMenu;
    let waterWell = player.home.waterWell

		this.homeButton(
		  this.button(bank.body.pos.x, bank.body.pos.y, bank.body.size.x, bank.body.size.y),
		  this.label("Bank", bank.body.pos.x + 30, bank.body.pos.y + 25, "15")
		)

		this.homeButton(
		  this.button(buy.body.pos.x, buy.body.pos.y, buy.body.size.x, buy.body.size.y),
		  this.label("craft", buy.body.pos.x + 10, buy.body.pos.y + 50, "15")

		)

    this.homeButton(
      this.button(waterWell.body.pos.x, waterWell.body.pos.y, waterWell.body.size.x, waterWell.body.size.y),
      this.label("Water", waterWell.body.pos.x + 15, waterWell.body.pos.y + 50, "15")

    )

    this.homeButton(
      this.button(waterWell.body.pos.x, waterWell.body.pos.y + 100, 70, 25),
      this.label(waterWell.upgradeStr(), waterWell.body.pos.x + 5, waterWell.body.pos.y + 110, "9")

    )
	}



    makeRightClickButtons(menu, index, x, y) {
      
      let yOffset = 10;

      let xNameOffset = 10;
      let yNameOffset = 20;

      x = x - 30;
      y = y - 20;

      this.rightClickMenu.clear();
      this.rightClickMenu.open = true;
      this.rightClickMenu.index = index
      this.rightClickMenu.menu = menu;
      this.rightClickMenu.background = this.button(x,y, 50,120)

      this.rightClickMenu.buttons.push({
                                      button: this.button(x, y, 50, 40),
                                      label: this.label("10", x + xNameOffset, y + yNameOffset, "10")
                                  })
      yOffset += 30;
      yNameOffset += 40;

      this.rightClickMenu.buttons.push({
                                  button: this.button(x, y + yOffset, 50, 40),
                                  label: this.label("50", x + xNameOffset, y + yNameOffset, "10")
                                  })
      yOffset += 40;
      yNameOffset += 40

       this.rightClickMenu.buttons.push({
                                  button: this.button(x, y + yOffset, 50, 40),
                                  label: this.label("All", x + xNameOffset, y + yNameOffset, "10")
                                  })

    }

    makeFarmButton(button, label) {
      this.farmButtons.spaces.push({button: button, label:label})
    }

    farmControlButton(button, label) {
      this.farmButtons.controls.push({button: button, label:label})
    }

    makeFarmButtons(player) {
        let farm = player.home.farm;

        for (let i = 0; i < farm.spaces.length; i++) {
            this.makeFarmButton(this.button(farm.spaces[i].body.pos.x, 
                                            farm.spaces[i].body.pos.y, 
                                            32, 
                                            32),
            this.label("", 0, 0, "0")
            )
        }

        this.farmControlButton(this.button(50,250,100,50),
                                this.label(farm.waterLevel, 75, 275, "20")
                              )
    }

    drawFarmButtons(player, ctx) {
      player.home.farm.plot.drawFarmPlot(player.home.farm, ctx)
      for (let i = 0; i < this.farmButtons.spaces.length; i++) {

        if (player.home.farm.spaces[i].seed) {
          player.home.farm.spaces[i].seed.animation.drawPlants(player.home.farm.spaces[i], player.home.farm.spaces[i].level, ctx)
        }
      }

      this.draw.button({button: this.button(50,125,0,0),
                          label: this.label("Water:", 55, 100, "15")
                          }, ctx
                        );

      this.draw.button({button: this.button(50,75,100,50),
                          label: this.label(player.home.farm.waterLevelStr(), 55, 120, "15")
                        }, ctx
                      );
      }


    farmButtonClick(mouse, player, canvas) {
      let len = this.farmButtons.spaces.length
         for (let x = 0; x < len; x++) {        
            if (this.clickHandler.click(mouse, this.farmButtons.spaces[x].button, canvas))
            {
                player.home.farm.harvest(x, player.inventory)
            }
        }
      }



}