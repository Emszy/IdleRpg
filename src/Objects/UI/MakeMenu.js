import {userInterface, magicImages} from "../../Objects/Animations/images"
import {button} from "../../Helpers/functions"
import Grid from "./grid"

export default class MakeMenu {

	actionButtons(player) {
	   let keys =  Object.keys(player.status.actions)
	   let imgs = [];
	   let labels = [];
	   for (var i = 0; i < keys.length; i++) {
	        imgs.push(player.status.actions[keys[i]].button());
	        labels.push(player.status.actions[keys[i]].label())
	   }

	   let background = {
	      img: userInterface.actionButtonBackGround,
	      x : 0,
	      y : 430,
	      width : 360,
	      height : 180,
	   }

	   let actionButtons = new Grid({
	                                  x: 0,
	                                  y: 440,
	                                  width : keys.length,
	                                  height : 1,
	                                  cellWidth : 60,
	                                  cellHeight: 50,
	                                  labelOffsetX : 5,
	                                  labelOffsetY : 5,
	                                  labelSize : 10,
	                                  imgs : imgs,
	                                  labels :labels,
	                                  background : background,
	                                })
	   	return (actionButtons)
	}
	
	vendor(items, menuType) {
		let menu = {
			categoryGrid  : false,
			subCategoryGrids : {},
			currentCategory : items.categories[0].name,
			currentSubcategory : items.categories[0].subcategory[0].name,
		};

		let background = {
			img: userInterface.buyBackGround,
			x : 25,
			y : 25,
			width : userInterface.buyBackGround.pos.width,
			height : userInterface.buyBackGround.pos.height,
		}

		let categoryButtonImg = {
			image : userInterface.aquaButton,
			repeat : true,
		}

		let borderImg = {
			image : userInterface.itemBorder,
			repeat : true,
		}

		let SubCategoryButtonImg = {
			image : userInterface.greenButton,
			repeat : true,
		}

		let controls = 	[
							{
								button : button(295, 39, 16, 16),
								img : userInterface.closeButton,
							},
						];


		let labels = []

		let categoryCount = 0;
		
		for (let x = 0; x < items.categories.length; x++) {
			let categorySettings = items.returnCategorySettings(x)
			if (categorySettings[menuType]) {
			  labels.push(items.categories[x].name);
			  categoryCount++;
			}
		}


		menu.categoryGrid = new Grid({
		                              x: 50,
		                              y: 400,
		                              width : categoryCount,
		                              height : 1,
		                              cellWidth : 70,
		                              cellHeight: 50,
		                              labelOffsetX : 5,
		                              labelOffsetY : 30,
		                              labelSize : 10,
		                              imgs : categoryButtonImg,
		                              labels : labels,
		                              background : background,
		                              controls : controls
		                            })

		for (let x = 0; x < items.categories.length; x++) {
			labels = [];
			let subCategories = items.returnSubCategories(x);
			let subCategoryCount = 0;
			let categoryName = items.categories[x].name;
			let subCategoryCheck = false;
			let itemGrids = {};

			for (let y = 0; y < subCategories.length; y++) {
				let subCategorySettings = items.returnSubCategorySettings(x,y);
				if (subCategorySettings[menuType]) {
					subCategoryCheck = true
					labels.push(subCategories[y].name);
					subCategoryCount++;
					let subcategoryItems = items.returnItems(x,y);

					itemGrids[subCategories[y].name] = {
					                              grid : new Grid({
					                                    x: 40,
					                                    y: 70,
					                                    width : 4,
					                                    height : 3,
					                                    cellCount : subcategoryItems.length,
					                                    cellWidth : 70,
					                                    cellHeight: 50,
					                                    labelOffsetX : 5,
					                                    labelOffsetY : 5,
					                                    labelSize : 10,
					                                    imgs : borderImg,
					                                  }),

					                                items: subcategoryItems,
					}
				}
			}
			if (subCategoryCheck) {
			  menu.subCategoryGrids[categoryName] = {
			                                    first : labels[0],
			                                    grid:  new Grid({
			                                        x: 50,
			                                        y: 300,
			                                        width : 4,
			                                        height : 2,
			                                        cellCount : subCategoryCount,
			                                        cellWidth : 60,
			                                        cellHeight: 40,
			                                        labelOffsetX : 5,
			                                        labelOffsetY : 30,
			                                        labelSize : 10,
			                                        imgs : SubCategoryButtonImg,
			                                        labels : labels,
			                                      }),
			                                    itemGrids : itemGrids, 
			                                  }
			}
		}
		return menu
	}


	bank() {

		let bankButtons = {	
			page : 0,
		};

		let background = {
			img: userInterface.bankBackGround,
			x : 10,
			y : 30,
			width : 320,
			height : 430,
		}


		let img = {
			image : userInterface.itemBorder,
			repeat : true,
		}

		let controls = 	[
							{
								button : button(292, 390, 16, 16),
								img : userInterface.upArrow,
							},

							{
								button: button(292, 416, 16, 16),
								img : userInterface.downArrow,
							},

							{
								button: button(292, 45, 16, 16),
								img : userInterface.closeButton,
							},

							{
								button: button(292, 70, 16, 60),
								img : userInterface.bankScrollBar,
							},

						];


		bankButtons.grid = new Grid({
		                              x: 40,
		                              y: 40,
		                              width : 5,
		                              height : 10,
		                              cellWidth : 45,
		                              cellHeight: 40,
		                              labelOffsetX : 5,
		                              labelOffsetY : 5,
		                              labelSize : 10,
		                              imgs : img,
		                              background : background,
		                              controls : controls,
		                            })
		return bankButtons

	}



	inventorySpaces() {
		let background = {
			img: userInterface.stats,
			x : 360,
			y : 0,
			width : 120,
			height : 480,
		}


		let img = {
			image : userInterface.itemBorder,
			repeat : true,
		}

  		let inventorySpaces = new Grid({
		                                  x: 365,
		                                  y: 120,
		                                  width : 3,
		                                  height : 8,
		                                  cellWidth : 40,
		                                  cellHeight: 40,
		                                  labelOffsetX : 5,
		                                  labelOffsetY : 5,
		                                  labelSize : 10,
		                                  imgs : img,
		                                  background : background,
		                                })

  		return inventorySpaces;

	}

	inventoryButtons() {
    
    let menuImages = [
                      userInterface.inventoryIcon,
                      userInterface.armorIcon,
                      userInterface.statsIcon,
                      userInterface.magicIcon
                    ]
    let inventoryMenuButtons = new Grid({
                                  x: 365,
                                  y: 440,
                                  width : 4,
                                  height : 1,
                                  cellWidth : 30,
                                  cellHeight: 40,
                                  labelOffsetX : 2,
                                  labelOffsetY : 20,
                                  labelSize : 9,
                                  imgs : menuImages
                                })
    return inventoryMenuButtons;

   }


	magic() {
     let magicLabels = [ "Home", "+10", "+50",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",                     
                    
                      ];

     let magicImgs = [  
                        magicImages.teleportStone, magicImages.teleportStone, magicImages.teleportStone,
                        magicImages.rangeStone, magicImages.rangeStone, magicImages.rangeStone,
                        magicImages.defenseStone, magicImages.defenseStone, magicImages.defenseStone,
                        magicImages.attackStone, magicImages.attackStone, magicImages.attackStone,
                        magicImages.miningStone, magicImages.miningStone, magicImages.miningStone,
                        magicImages.woodcutStone, magicImages.woodcutStone, magicImages.woodcutStone,
                        magicImages.huntingStone, magicImages.huntingStone, magicImages.huntingStone,                        
                      ];

    let magicMenu = new Grid({
                                  x: 365,
                                  y: 140,
                                  width : 3,
                                  height : 7,
                                  cellWidth : 40,
                                  cellHeight: 40,
                                  labelOffsetX : 0,
                                  labelOffsetY : 10,
                                  labelSize : 9,
                                  labels : magicLabels,
                                  imgs : magicImgs,
                                  ySpace : 2,
                                  xSpace : 5,
                                })
    return magicMenu;

   }


}