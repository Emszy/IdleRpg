import RidgidBody from "../../Helpers/rigidBody"

export default class ClickHandler {

	click(mouse, obj, canvas) {


		var transformedClickX = mouse.pageX - canvas.offsetLeft;
   		var transformedClickY = mouse.pageY - canvas.offsetTop;
		let point = new RidgidBody(transformedClickX, transformedClickY, 1,1)

		if (point.collide(obj.body)) {
			return true
		}
		return false
	}

	transformedCoordinate(mouse, canvas) {
		var transformedClickX = mouse.pageX - canvas.offsetLeft;
   		var transformedClickY = mouse.pageY - canvas.offsetTop;
		return ({x : transformedClickX, y : transformedClickY})
	}

}