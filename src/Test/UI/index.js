import UI from "../../Objects/UI"

export default class UITest {
	constructor() {
		this.ui = new UI();
		// this.ui.inventoryButtons();
		this.run(); 
	}


	run() {
		for (var i = this.ui.buttons.length - 1; i >= 0; i--) {
			// console.log(this.ui.buttons[i]);
		}

		this.ui.buttons[1].button.click();

		console.log(this.ui.showItems);
		console.log(this.ui.showBuy);
		console.log(this.ui.showStats);


	}


}