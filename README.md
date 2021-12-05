# Firefox_YoutubeChatSlider
Show chat on video.


## System Architecture
* Canvas: to show chat comment
```
type Canvas = {
    createCanvas
    drawCanvas
    cleanCanvas
} 
```

* Player: video player


* Message: chat comment
```
type Message = {
    messageQueue
    receiveMessage
    cleanQueue
}
```