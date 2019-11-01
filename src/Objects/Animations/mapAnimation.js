export default class MapAnimation {

	constructor(imgObject) {
		this.img = imgObject.img;
		this.obj = imgObject
	}

	drawImageBase(terrain, type, img, pos, ctx) {
		let image = this.obj.terrain[terrain][type].base[img];
		this.draw(this.img, image.x, image.y, image.width, image.height, pos.x, pos.y, ctx)
	}

	drawImageLayer(terrain, type, img, pos, ctx) {
		let image = this.obj.terrain[terrain][type][img];
		this.draw(this.img, image.x, image.y, image.width, image.height, pos.x, pos.y, ctx)
	}

	// drawGrass(type, img, pos, ctx) {
	// 	let image = this.obj.terrain.grass[type][img];
	// 	this.draw(this.img, image.x, image.y, image.width, image.height, pos.x, pos.y, ctx)

	// }

	draw(img, clipX, clipY, width, height, x, y, ctx) {
        ctx.drawImage(img, 
                      clipX,
                      clipY, 
                      width, 
                      height,
                      x,
                      y,
                      width,
                      height,
                    );
       

    }

}