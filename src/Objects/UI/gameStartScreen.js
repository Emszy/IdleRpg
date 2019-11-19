import RigidBody from "../../Helpers/rigidBody"
import Draw from "./draw"
import {userInterface, playerImages, playerHair, playerPants, playerShirts} from "../../Objects/Animations/images"
import ClickHandler from "../clickhandler"

export default class GameStartScreen {

	constructor() {
		
		this.page = "start";
		this.startGame = false;

		this.background = {
			img : userInterface.bankBackGround,
			body : new RigidBody(0,0,480,480),
			draw : new Draw(),
			info: "IDLE FOREST",
			display : function(ctx) {
				this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
				this.draw.text(this.info, this.body.pos.x + 70, this.body.pos.y + 100, 50, ctx)
			}
		}


								
		this.start = {
			startButton : {
				img : userInterface.greenButton,
				body : new RigidBody(150, 100, 200,100),
				info : "Start",
				draw : new Draw(),
				clickHandler : new ClickHandler(),
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 35, this.body.pos.y + 60, 40, ctx, "purple")
				},

				onClick : function(mouse,canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "chooseName";
					}
					return false;
				}
			},

			optionsButton : {
				img : userInterface.greenButton,
				body : new RigidBody(150, 200, 200,100),
				info : "Options",
				draw : new Draw(),
				clickHandler : new ClickHandler(),
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 25, this.body.pos.y + 60, 40, ctx, "purple")
				},
				onClick : function(mouse,canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "options";
					}
					return(false)
				}
			},

			creditsButton : {
				img : userInterface.aquaButton,
				body : new RigidBody(150, 300, 200,100),
				info : "Credits",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info , this.body.pos.x + 35, this.body.pos.y + 60, 30, ctx, "purple")
				},

				onClick : function(mouse,canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "credits";
					}
					return(false)
				}
			}
		}

		this.options = {
			backButton : {
				img : userInterface.redButton,
				body : new RigidBody(150, 100, 200,100),
				info : "Back",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 35, this.body.pos.y + 60, 40, ctx, "purple")
				},

				onClick : function(mouse, canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "start";
					}
					return("options")
				}
			},

			soundButton : {
				img : userInterface.aquaButton,
				body : new RigidBody(150, 200, 200,100),
				info : "Sound",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				on: false,
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info + " " + (this.on ? "on" : "off") , this.body.pos.x + 35, this.body.pos.y + 60, 30, ctx, "purple")
				},

				onClick : function(mouse, canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						this.on = !this.on;
					}
					return(false)
				}
			},

			difficultyButton : {
				img : userInterface.aquaButton,
				body : new RigidBody(150, 300, 200,100),
				info : "difficulty",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				difficulties : ["Easy", "Medium", "Hard"],
				index: 0,
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.difficulties[this.index] , this.body.pos.x + 35, this.body.pos.y + 60, 30, ctx, "purple")
				},

				onClick : function(mouse, canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						this.index++;
						if (this.index >= this.difficulties.length) {
							this.index = 0;
						}
					}
					return(false)
				}
			}
		}


		this.credits = {
			backButton : {
				img : userInterface.redButton,
				body : new RigidBody(150, 100, 200,100),
				info : "Back",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 35, this.body.pos.y + 60, 40, ctx, "purple")
				},

				onClick : function(mouse, canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "start";
					}
					return("credits")
				}
			},
		}




		this.chooseName = {
			label : "Name :",
			letters : this.makeLetterButtons(),
			draw: new Draw(),

			display(player, ctx) {
				this.draw.text(this.label, 120, 330, 35, ctx, "blue");
				this.draw.text(player.name, 240, 330, 35, ctx, "blue");
				for (let x = 0; x < this.letters.length; x++) {
					this.letters[x].display(ctx)
				}
			},

			add : function(player, letter) {
				player.name = player.name += letter;
			},

			delete : function(player, mouse,canvas) {
				if (this.deleteButton.onClick(mouse, canvas)) {
					player.name = player.name.substring(0, player.name.length - 1);
					return false
				}
				return false
			},

			onClick : function(player, mouse,canvas) {
				for (let x = 0; x < this.letters.length; x++) {
					let currLetter = this.letters[x].onClick(mouse,canvas);
					if (currLetter) {
						this.add(player, currLetter);
						return true
					}
				}
				return false
			},

			startButton : {
				img : userInterface.greenButton,
				body : new RigidBody(240, 400, 100,50),
				info : "Next",
				draw : new Draw(),
				clickHandler : new ClickHandler(),
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 20, this.body.pos.y + 30, 20, ctx, "purple")
				},

				onClick : function(mouse,canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "characterSelect";
					}
					return false;
				},
			},

			backButton : {
				img : userInterface.redButton,
				body : new RigidBody(130, 400, 100,50),
				info : "Back",
				draw : new Draw(),
				clickHandler : new ClickHandler(),
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 20, this.body.pos.y + 30, 20, ctx, "purple")
				},

				onClick : function(mouse,canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "start";
					}
					return false;
				},
			},

			deleteButton : {
				img : userInterface.redButton,
				body : new RigidBody(390, 247, 80,40),
				info : "Delete",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 20, this.body.pos.y + 25, 15, ctx, "purple")
				},

				onClick : function(mouse, canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return (true)
					}
					return(false);
				}
			}

		}

		this.choosePlayer = {
			

			startButton : {
				img : userInterface.greenButton,
				body : new RigidBody(240, 400, 100,50),
				info : "Start",
				draw : new Draw(),
				clickHandler : new ClickHandler(),
				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 20, this.body.pos.y + 30, 20, ctx, "purple")
				},

				onClick : function(mouse,canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return true;
					}
					return false;
				},
			},

			backButton : {
				img : userInterface.redButton,
				body : new RigidBody(130, 400, 100,50),
				info : "Back",
				draw : new Draw(),
				clickHandler : new ClickHandler(),

				display : function(ctx) {
					this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
					this.draw.text(this.info, this.body.pos.x + 20, this.body.pos.y + 30, 20, ctx, "purple")
				},

				onClick : function(mouse, canvas) {
					let click = this.clickHandler.click(mouse, this, canvas);
					if (click) {
						return "chooseName";
					}
					return("characterSelect");
				}
			},


			skin: {
				types : [
						 playerImages.coffee,
						 playerImages.comet,
						 playerImages.copper,
						 playerImages.dove,
						 playerImages.gold,
						 playerImages.gray,
						 playerImages.ivory,
						 playerImages.sienna
						 ],
				index : 0,
				info : "skin",
				draw : new Draw(),

				display : function (ctx){
					this.prevButton.display(ctx);
					this.nextButton.display(ctx);
					this.draw.text(this.info, this.prevButton.body.pos.x + 57, this.prevButton.body.pos.y + 30, 20, ctx, "purple")

				},

				change: function(player) {
					player.armor.animation.changePlayer(this.types[this.index]);
				},

				next: function(player) {
					this.index++;
					if (this.index >= this.types.length) {
						this.index = 0;
					}
					this.change(player);
				},

				prev: function(player) {
					this.index--;
					if (this.index < 0) {
						this.index = this.types.length;
					}
					this.change(player);
				},

				onClick(player, mouse, canvas) {
					if (this.prevButton.onClick(mouse,canvas)) {
						this.prev(player);
					}
					if (this.nextButton.onClick(mouse,canvas)) {
						this.next(player);
					}
				},

				prevButton : {
					img : userInterface.greenButton,
					body : new RigidBody(160, 150, 50,50),
					info : "<",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				},

				nextButton : {
					img : userInterface.greenButton,
					body : new RigidBody(260, 150, 50,50),
					info : ">",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				}

			},

			hair: {
				types : [
						 playerHair.black,
						 playerHair.brown,
						 playerHair.gold,
						 playerHair.red,
						 playerHair.darkRed,
						 ],
				index: 0,
				info : "hair",
				draw : new Draw(),

				display : function (ctx){
					this.prevButton.display(ctx);
					this.nextButton.display(ctx);
					this.draw.text(this.info, this.prevButton.body.pos.x + 57, this.prevButton.body.pos.y + 30, 20, ctx, "purple")

				},
				next: function(player) {
					this.index++;
					if (this.index >= this.types.length) {
						this.index = 0;
					}
					this.change(player)
				},
				prev: function(player) {
					this.index--;
					if (this.index < 0) {
						this.index = this.types.length;
					}
					this.change(player)
				},
				change: function(player) {
					player.armor.animation.addHair(this.types[this.index]);
				},
				onClick(player, mouse, canvas) {
					if (this.prevButton.onClick(mouse,canvas)) {
						this.prev(player);
					}
					if (this.nextButton.onClick(mouse,canvas)) {
						this.next(player);
					}
				},
				prevButton : {
					img : userInterface.greenButton,
					body : new RigidBody(160, 200, 50,50),
					info : "<",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				},

				nextButton : {
					img : userInterface.greenButton,
					body : new RigidBody(260, 200, 50,50),
					info : ">",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				}


			},

			shirt: {
				types : [
						 playerShirts.black,
						 playerShirts.blue,
						 playerShirts.forest,
						 playerShirts.gray,
						 playerShirts.lavender,
						 playerShirts.sky,
						 playerShirts.teal,
						 ],
				index: 0,
				info : "shirt",
				draw : new Draw(),

				display : function (ctx){
					this.prevButton.display(ctx);
					this.nextButton.display(ctx);
					this.draw.text(this.info, this.prevButton.body.pos.x + 52, this.prevButton.body.pos.y + 30, 20, ctx, "purple")

				},
				next: function(player) {
					this.index++;
					if (this.index >= this.types.length) {
						this.index = 0;
					}
					this.change(player)
				},
				prev: function(player) {
					this.index--;
					if (this.index < 0) {
						this.index = this.types.length;
					}
					this.change(player)
				},
				change: function(player) {
					player.armor.animation.addShirt(this.types[this.index]);
				},

				onClick(player, mouse, canvas) {
					if (this.prevButton.onClick(mouse,canvas)) {
						this.prev(player);
					}
					if (this.nextButton.onClick(mouse,canvas)) {
						this.next(player);
					}
				},

				prevButton : {
					img : userInterface.greenButton,
					body : new RigidBody(160, 250, 50,50),
					info : "<",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				},

				nextButton : {
					img : userInterface.greenButton,
					body : new RigidBody(260, 250, 50,50),
					info : ">",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				}


			},

			pants: {
				types : [
						 playerPants.black,
						 playerPants.blue,
						 playerPants.forest,
						 playerPants.gray,
						 playerPants.lavender,
						 playerPants.sky,
						 playerPants.teal,
						 ],
				index: 0,
				info : "pants",
				draw : new Draw(),

				display : function (ctx){
					this.prevButton.display(ctx);
					this.nextButton.display(ctx);
					this.draw.text(this.info, this.prevButton.body.pos.x + 49, this.prevButton.body.pos.y + 30, 20, ctx, "purple")

				},
				next: function(player) {
					this.index++;
					if (this.index >= this.types.length) {
						this.index = 0;
					}
					this.change(player)
				},
				prev: function(player) {
					this.index--;
					if (this.index < 0) {
						this.index = this.types.length;
					}
					this.change(player)
				},
				change: function(player) {
					player.armor.animation.addPants(this.types[this.index]);
				},

				onClick(player, mouse, canvas) {
					if (this.prevButton.onClick(mouse,canvas)) {
						this.prev(player);
					}
					if (this.nextButton.onClick(mouse,canvas)) {
						this.next(player);
					}
				},

				prevButton : {
					img : userInterface.greenButton,
					body : new RigidBody(160, 300, 50,50),
					info : "<",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				},

				nextButton : {
					img : userInterface.greenButton,
					body : new RigidBody(260, 300, 50,50),
					info : ">",
					draw : new Draw(),
					clickHandler : new ClickHandler(),
					index: 0,
					display : function(ctx) {
						this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
						this.draw.text(this.info , this.body.pos.x + 20, this.body.pos.y + 30, 30, ctx, "purple")
					},
					onClick(mouse, canvas) { 
						let click = this.clickHandler.click(mouse, this, canvas);
						if (click) {
							return (true);
						}
						return(false)
					}
				}


			},



		}
	}

	letter(x,y,w,h, letter) {
		let button = {
			clickHandler : new ClickHandler(),
			img : userInterface.greenButton,
			draw : new Draw(),
			body : new RigidBody(x, y, w,h),
			info : letter,
			display : function(ctx) {
				this.draw.img(this.img, this.body.pos.x, this.body.pos.y, this.body.size.x, this.body.size.y, ctx);
				this.draw.text(this.info, this.body.pos.x + 10, this.body.pos.y + 20, 15, ctx, "purple")
			},
			onClick : function(mouse, canvas) {
				let click = this.clickHandler.click(mouse, this, canvas);
				if (click) {
					return this.info;
				}
				return(false)
			}
		}
		return button
	}

	makeLetterButtons() {
		let line1 = ["q","w","e","r","t","y","u","i","o","p"]
		let line2 = ["a","s","d","f","g","h","j","k","l"]
		let line3 = ["z","x","c","v","b","n","m"]
		let letters = []

		for (let x = 0; x < line1.length; x++) {
			letters.push(this.letter((x * 45) + 20, 150 ,40,40, line1[x]));
		}
		for (let x = 0; x < line2.length; x++) {
			letters.push(this.letter((x * 45) + 40, 200 ,40,40, line2[x]));
		}
		for ( let x = 0; x < line3.length; x++) {
			letters.push(this.letter((x * 45) + 70, 250 ,40,40, line3[x]));
		}
		return letters
	}
	

	display(player,ctx) {
		  this.background.display(ctx);
          if (this.page === "start") {
	          this.start.startButton.display(ctx);
	          this.start.optionsButton.display(ctx);
	          this.start.creditsButton.display(ctx);	
          } else if (this.page === "chooseName") {
          	this.chooseName.display(player, ctx);
          	this.chooseName.deleteButton.display(ctx);
          	this.chooseName.startButton.display(ctx);
          	this.chooseName.backButton.display(ctx);

          } else if (this.page === "options") {
	          this.options.backButton.display(ctx);
	          this.options.soundButton.display(ctx);
	          this.options.difficultyButton.display(ctx);
          } else if (this.page === "credits") {
          	  this.credits.backButton.display(ctx);
          }

          if (this.page === "characterSelect") {
          	this.choosePlayer.skin.display(ctx);
          	this.choosePlayer.hair.display(ctx);
          	this.choosePlayer.shirt.display(ctx);
          	this.choosePlayer.pants.display(ctx);
          	this.choosePlayer.startButton.display(ctx);
          	this.choosePlayer.backButton.display(ctx);

          }

	}

	characterSelectClick(player, mouse, canvas) {

			this.choosePlayer.skin.onClick(player,mouse,canvas);
			this.choosePlayer.hair.onClick(player,mouse,canvas);
			this.choosePlayer.shirt.onClick(player,mouse,canvas);
			this.choosePlayer.pants.onClick(player,mouse,canvas);
			this.page = this.choosePlayer.backButton.onClick(mouse,canvas)
			this.startGame = this.choosePlayer.startButton.onClick(mouse,canvas)

	}

	clickHandler(player, mouse,canvas) {
		let click = false;
		if (this.page === "start") {

			if (this.page = this.start.startButton.onClick(mouse,canvas)) {
				return false
			}
			if (this.page = this.start.optionsButton.onClick(mouse,canvas)) {
				return false
			}
			if (this.page = this.start.creditsButton.onClick(mouse,canvas)) {
				return false
			}
		}
		else if (this.page === "chooseName") {
			click = this.chooseName.onClick(player,mouse,canvas);
			if (click) {
				return false;
			}

			click = this.chooseName.delete(player,mouse,canvas);
			if (click) {
				return false;
			}

			click = this.chooseName.backButton.onClick(mouse,canvas);
			if (click) {
				this.page = click;
				return false;
			}
			click = this.page = this.chooseName.startButton.onClick(mouse,canvas)
			if (click) {
				this.page = click;
				return false;
			}
			this.page = "chooseName"
		}

		if (this.page === "options") {
			this.page = this.options.backButton.onClick(mouse,canvas)
			this.options.soundButton.onClick(mouse,canvas)
			this.options.difficultyButton.onClick(mouse,canvas)
		}

		if (this.page === "credits") {
			this.page = this.credits.backButton.onClick(mouse,canvas)
		}

		if (this.page === "characterSelect") {
			this.characterSelectClick(player, mouse, canvas)
		}

	}
}