//function addYoutubePlayer() {
//  const url = "https://www.youtube.com/embed/" + document.querySelector("#urlInput").value.split('?v=')[1]
//  document.getElementById("players").insertAdjacentHTML("afterend",
//    `<iframe id="frame" width="800" height="600" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
//}

function createCanvas() {
  const canvas = document.createElement("canvas")
  canvas.id = "youtubeBarrageCanvas";
  canvas.style.cssText = "z-index: 10; position: absolute;";
  canvas.height = 300
  canvas.width = 800
	return canvas
}

//function drawTest(canvas, player, text) {
//  let ctx = canvas.getContext("2d")
//  ctx.lineWidth = 3
//  ctx.fillStyle = "#FFFFFF"
//  ctx.font = "48px Arial"
//  repeat_drawing()
//  function repeat_drawing() {
//    ctx.clearRect(0, 0, canvas.width, canvas.height)
//    ctx.fillText(text, canvas.width - 100 * player.getCurrentTime(), 48)
//    requestAnimationFrame(repeat_drawing)
//  }
//}

class Barrage {
  constructor({ ctx, width, height}) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.data = []
  }

  addBarrage(options) {
    const barrage = {
      x: this.width,
      y: this.height,
      speed: options.speed || Math.random() * 3 + 0.5,
      fontSize: options.fontSize || Math.random() * 10 + 16,
      color: options.color || `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
      text: options.text || 'ABC'
    }
    this.data.push(barrage)
  }

  //draw() {
  //  for (let i = this.data.length - 1; i >= 0; i -= 1) {
  //    const barrage = this.data[i]
  //    this.ctx.font = `${barrage.fontSize}px Microsoft JhengHei, PMingLiU, sans-serif`

  //    const textWidth = this.ctx.measureText(barrage.text).width
  //    const checkDisappear = barrage.x + textWidth < 0
  //    if (checkDisappear) {
  //      this.data.splice(i, 1)
  //    } else {
  //      this.ctx.fillStyle = barrage.color
  //      barrage.x = barrage.x - barrage.speed
  //      this.ctx.fillText(barrage.text, barrage.x, barrage.y)
  //    }
  //  }

  //  requestAnimationFrame(this.draw)
  //}
}

function httpGet(url) {
    var httpReq = new XMLHttpRequest()
    httpReq.open("GET", url, false)
    httpReq.send(null)
    return httpReq.responseText
}

function getYoutubeLiveChatId() {
    const youtubeAPIKey = ""
    const videoId = document.querySelector("#urlInput").value.split('?v=')[1]
    const url = 'https://www.googleapis.com/youtube/v3/videos?' +
        `key=${youtubeAPIKey}` +
        `&id=${videoId}` +
        '&part=liveStreamingDetails'
    var getRequest = httpGet(url)
    //const youtubeLiveChatId = JSON.parse(getRequest).items[0].liveStreamingDetails.activeLiveChatId
    return(JSON.parse(getRequest).items[0].liveStreamingDetails.activeLiveChatId)
}

function getYoutubeLiveChatMessage() {
    const youtubeAPIKey = ""
    const videoId = document.querySelector("#urlInput").value.split('?v=')[1]
    const liveChatId = getYoutubeLiveChatId()
    const url = 'https://www.googleapis.com/youtube/v3/liveChat/messages?' +
        `key=${youtubeAPIKey}`+
        `&liveChatId=${liveChatId}` +
        '&part=snippet' +
        '&maxResult=2000'
    var getRequest = httpGet(url)
    return(JSON.parse(getRequest).items[10].snippet.textMessageDetails.messageText)
}