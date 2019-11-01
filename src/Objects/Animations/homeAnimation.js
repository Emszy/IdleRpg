export default class HomeAnimation {
	constructor(resource) {
		this.resource = resource
		this.img = resource.img		
		this.resourceTimer = this.makeTimer(10);

	}

	makeTimer(animationTime) {
		return ({
			time : 0,
			index : 0,
			end : 3,
			animationTime: animationTime,
			done : false,
			clear: function() {
				this.time = 0
				this.index = 0
			},

			timer : function() {
				this.time ++;
				if (this.time > this.animationTime) {
					this.time = 0;
					this.index++;
					if (this.index > this.end) {
						this.done = true
						this.index = 0;
					}
				}
			}
		})
	}

	drawImage(name, obj, ctx) {
		this.draw(this.img, this.resource[name].x,this.resource[name].y, this.resource[name].width, this.resource[name].height, obj.body.pos.x, obj.body.pos.y, obj.body.size.x, obj.body.size.y, ctx )
	}

	drawFloor(index, obj, ctx) {
		this.draw(this.img, this.resource.panels[index].x, this.resource.panels[index].y, this.resource.panels[index].width, this.resource.panels[index].height, obj.body.pos.x, obj.body.pos.y, obj.body.size.x, obj.body.size.y, ctx )
	}

	drawWall(ctx) {
		for (var i = 0; i < 11; i++) {
			if (i < 5 || i > 6) {
				this.draw(
					this.img, 
					this.resource.horizontal.x,
					this.resource.horizontal.y,
					this.resource.horizontal.width,
					this.resource.horizontal.height,
					i * this.resource.horizontal.width,
					0,
					this.resource.horizontal.width,
					this.resource.horizontal.height,
					ctx 
				)

			this.draw(
					this.img, 
					this.resource.horizontal.x,
					this.resource.horizontal.y,
					this.resource.horizontal.width,
					this.resource.horizontal.height,
					i * this.resource.horizontal.width,
					450,
					this.resource.horizontal.width,
					this.resource.horizontal.height,
					ctx 
				)

			}
		}


		for (var i = 0; i < 5; i++) {
				this.draw(
					this.img, 
					this.resource.vertical.x,
					this.resource.vertical.y,
					this.resource.vertical.width,
					this.resource.vertical.height,
					0,
					i * this.resource.vertical.height,
					this.resource.vertical.width,
					this.resource.vertical.height,
					ctx 
				)

				this.draw(
					this.img, 
					this.resource.vertical.x,
					this.resource.vertical.y,
					this.resource.vertical.width,
					this.resource.vertical.height,
					32 * 10 + 8,
					i * this.resource.vertical.height,
					this.resource.vertical.width,
					this.resource.vertical.height,
					ctx 
				)
				
		}
	}



	drawCraftCorner(obj, ctx) {
		this.draw(
					this.img, 
					this.resource.stove.x,
					this.resource.stove.y, 
					this.resource.stove.width,
					this.resource.stove.height,
					obj.body.pos.x + 3,
					obj.body.pos.y + 40,
					this.resource.stove.width,
					this.resource.stove.height,
					ctx
				)
		this.draw(
					this.img, 
					this.resource.anvil.x,
					this.resource.anvil.y, 
					this.resource.anvil.width,
					this.resource.anvil.height,
					obj.body.pos.x + 3,
					obj.body.pos.y,
					this.resource.anvil.width,
					this.resource.anvil.height,
					ctx
				)
	}

	drawWaterWell(obj, ctx) {
		this.draw(
					this.img, 
					this.resource.base.main.x,
					this.resource.base.main.y, 
					this.resource.base.main.width,
					this.resource.base.main.height,
					obj.body.pos.x + 3,
					obj.body.pos.y + 40,
					this.resource.base.main.width,
					this.resource.base.main.height,
					ctx
				)

		this.draw(
					this.img,
					this.resource.bucket.empty.x,
					this.resource.bucket.empty.y,
					this.resource.bucket.empty.width,
					this.resource.bucket.empty.height,
					obj.body.pos.x + 22,
					obj.body.pos.y + 10,
					this.resource.bucket.empty.width,
					this.resource.bucket.empty.height,

					ctx
				)


		this.draw(
					this.img,
					this.resource.base.frontLayer.x,
					this.resource.base.frontLayer.y,
					this.resource.base.frontLayer.width,
					this.resource.base.frontLayer.height,
					obj.body.pos.x + 3,
					obj.body.pos.y + 60,
					this.resource.base.frontLayer.width,
					this.resource.base.frontLayer.height,

					ctx 
				 )

		this.draw(
					this.img,
					this.resource.arms.one.x,
					this.resource.arms.one.y,
					this.resource.arms.one.width,
					this.resource.arms.one.height,
					obj.body.pos.x - 10,
					obj.body.pos.y,
					this.resource.arms.one.width,
					this.resource.arms.one.height,

					ctx
				)

		this.draw(
					this.img,
					this.resource.handles.one.x,
					this.resource.handles.one.y,
					this.resource.handles.one.width,
					this.resource.handles.one.height,
					obj.body.pos.x + 67,
					obj.body.pos.y + 1,
					this.resource.handles.one.width,
					this.resource.handles.one.height,

					ctx
				)

	}

	draw(img, clipX, clipY, width, height, x, y, drawWidth, drawHeight, ctx) {
        ctx.drawImage(img, 
                      clipX,
                      clipY, 
                      width, 
                      height,
                      x,
                      y,
                      drawWidth,
                      drawHeight,
                    );
       

    }


}