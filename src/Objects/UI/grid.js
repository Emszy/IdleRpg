import RigidBody from "../../Helpers/rigidBody"
import Draw from "./draw"

import ClickHandler from "../clickhandler"

export default class Grid {

	constructor(settings) {
		

		let x = settings.x ? settings.x : 0
		let y = settings.y ? settings.y : 0
		let width = settings.width ? settings.width : 3
		let height = settings.height ? settings.height : 4
		let cellWidth = settings.cellWidth ? settings.cellWidth : 32
		let cellHeight = settings.cellHeight ? settings.cellHeight : 32
		let labelOffsetX = settings.labelOffsetX ? settings.labelOffsetX : 0
		let labelOffsetY = settings.labelOffsetY ? settings.labelOffsetY : 10
		let labelSize = settings.labelSize ? settings.labelSize : 10
		let labels = settings.labels ? settings.labels : []
		let imgs = settings.imgs ? settings.imgs : []
		let xSpace = settings.xSpace ? settings.xSpace : 0;
		let ySpace = settings.ySpace ? settings.ySpace : 0;


		this.open = false;
		this.start = new RigidBody(x, y, width,height);
		this.cell = new RigidBody(0, 0, cellWidth, cellHeight)
		this.labelOffset = new RigidBody(labelOffsetX, labelOffsetY, labelSize, labelSize);
		this.cellSpace = new RigidBody(0,0, xSpace, ySpace);
		this.labels = labels
		this.imgs = imgs;
		this.spaces = [];
		this.controls = [];
		this.backGround = "insert button"
		this.page = 0;
		this.draw = new Draw();
		this.clickHandler = new ClickHandler();

		this.makeCells();

	}

	setLabelOffset(x, y) {
		this.labelOffset.pos.x = x;
		this.labelOffset.pos.y = y;
	}

	setLabelSize(size) {
		this.labelOffset.size.x = size;
		this.labelOffset.size.y = size;
	}

	setLabels(labels) {
		for (var i = 0; i < this.spaces.length; i++) {
			this.spaces[i].label.change(labels[i]);
		}
	}

	makeCells() {
		let x = this.start.pos.x;
		let y = this.start.pos.y;
		let width = this.start.size.x;
		let height = this.start.size.y;
		let cellWidth = this.cell.size.x;
		let cellHeight = this.cell.size.y;
		let labelSize = this.labelOffset.size.x;
		let labelOffsetX = this.labelOffset.pos.x;
		let labelOffsety = this.labelOffset.pos.y;

		for (var i = 0; i < height; i ++) {
			for (var j = 0; j < width; j ++) {
				let label = this.labels[i * width + j];
				if (!label) {
					label = "";
				}
				this.spaces.push({
					button: this.button(x + (j * cellWidth), y + (i * cellHeight), cellWidth,cellHeight),
					label : this.label(label, x + (j * cellWidth) + labelOffsetX, (y + (i * cellHeight)) + labelOffsety, labelSize)
				})
			}
		}
	}

	drawGrid(ctx) {
		for (var i = 0; i < this.spaces.length; i++) {
			if (this.imgs[i]) {
				this.draw.img(
								this.imgs[i],
								this.spaces[i].button.body.pos.x - 5, 
								this.spaces[i].button.body.pos.y,
								this.spaces[i].button.body.size.x, 
								this.spaces[i].button.body.size.y, 
								ctx
							)

				this.draw.label(this.spaces[i], ctx)
			} else {
				this.draw.button(this.spaces[i], ctx)
			}

		}
	}

	click(mouse, canvas) {
		let len = this.spaces.length
         for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.spaces[x].button, canvas))
            {
             	return ({click: true, index: x})
            }
        }
        return ({click: false, index: -1})
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

			change : function(label) {
				this.label = label;
			}

		})
	}


}