function CreateCanvas() {
    var canvas = document.createElement("canvas");
    canvas.id = "CanvasId";
    canvas.style.cssText = "z-index: 10; position: absolute;";
    canvas.height = 100
    canvas.width = 800
	return canvas
}

function draw(canvas, player, text) {
    let ctx = canvas.getContext("2d")
    ctx.lineWidth = 3
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "48px Arial"
	repeat_drawing()
	function repeat_drawing() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	    ctx.fillText(text, canvas.width - 100 * player.getCurrentTime(), 48)
	    requestAnimationFrame(repeat_drawing)
	}
}


let player = document.getElementById("movie_player").wrappedJSObject
let canvas = CreateCanvas()
player.appendChild(canvas)
//player.addEventListener("playing", draw(canvas, player, "chat_text"))
player.addEventListener("playing", draw(canvas, player, "ABC"))
//draw(canvas, player)
