const request = require("request")

class Youtube_API {
	constructor(KEY, youtube_url) {
		this.YT_API_KEY = KEY
		this.video_id = youtube_url.replace('https://www.youtube.com/watch?v=', '')
		this.get_live()
	}

	get_live() {
	    let url = 'https://www.googleapis.com/youtube/v3/videos?' +
		    `key=${this.YT_API_KEY}` +
		    `&id=${this.video_id}` +
		    '&part=liveStreamingDetails'
		this.request(url, data => {
			this.chat_id = data.items[0].liveStreamingDetails.activeLiveChatId
			this.start_time = data.items[0].liveStreamingDetails.actualStartTime
			this.get_chat(this.pageToken)
		})
	}

	get_chat(nextPageToken) {
		let pageToken = nextPageToken
        let url = 'https://www.googleapis.com/youtube/v3/liveChat/messages?' +
		    `key=${this.YT_API_KEY}` +
		    `&liveChatId=${this.chat_id}` +
		    '&part=snippet' +
			'&maxResult=2000'
		if (pageToken) {
			url = url + `&pageToken=${pageToken}`
		}
		this.request(url, data => {
			if (pageToken) {
			    pageToken = data.nextPageToken
			    for (let chat of data.items) {
			    	console.log(new Date(chat.snippet.publishedAt).getTime(), chat.snippet.displayMessage)
			    }
			    this.sleep(5000)
			    this.get_chat(pageToken)
			}
			else {
				pageToken = data.nextPageToken
				this.sleep(5000)
				this.get_chat(pageToken)
			}
		})
	}

	sleep(ms) {
		var start = new Date().getTime(), expire = start + ms
		while(new Date().getTime() < expire) {}
		return
	}

	request(url, callback) {
		request({
			url: url,
			mothod: 'GET',
			json: true,
		}, (error, response, data) => {
			if (error || !data)
				return
			else
				callback(data)
		})
	}
}

