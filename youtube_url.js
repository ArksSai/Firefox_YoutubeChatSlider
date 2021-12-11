function createCanvas() {
  const canvas = document.createElement("canvas")
  canvas.id = "youtubeBarrageCanvas";
  canvas.style.cssText = "z-index: 10; position: absolute;";
  canvas.height = 450
  canvas.width = 800
	return canvas
}

class Barrage {
  constructor({ ctx, width, height}) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.data = []
  }

  addBarrage(options) {
    const barrage = {
      x: 800 + 0.5 * options.time,
      y: 150 + 350 * Math.random(),
      //speed: options.speed || Math.random() * 3 + 0.5,
      speed: 6,
      //fontSize: options.fontSize || Math.random() * 10 + 16,
      //fontSize: 24,
      //color: options.color || `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
      text: options.text || 'ABC'
    }
    this.data.push(barrage)
  }

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
    return(JSON.parse(getRequest).items)
}