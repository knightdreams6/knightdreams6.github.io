---
title: video
date: 2024-01-02
tags:
  - html
---

### 示例

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
```



### 定义和用法

`<video>` 标签用于嵌入视频 文档中的内容，例如影片剪辑或其他视频流。

`<video>` 标签包含一个或多个 `<source>` 标签 具有不同的视频源。浏览器会选择第一个来源 支持。

`<video>` 和 `</video>` 之间的文本 标签只会在不支持 `<video>` 元素的浏览器中显示。

HTML 支持三种视频格式：`MP4、WebM 和 OGG`。

| Browser | MP4  | WebM | Ogg  |
| :------ | :--- | :--- | :--- |
| Edge    | YES  | YES  | YES  |
| Chrome  | YES  | YES  | YES  |
| Firefox | YES  | YES  | YES  |
| Safari  | YES  | YES  | NO   |
| Opera   | YES  | YES  | YES  |



### 可选属性

| Attribute                                                    | Value              | Description                                          |
|:-------------------------------------------------------------| :----------------- | :--------------------------------------------------- |
| autoplay                                                     | autoplay           | 指定视频是否一旦准备好就开始播放                     |
| controls                                                     | controls           | 指定应显示视频控件（例如播放/暂停按钮等）。          |
| height                                                       | *pixels*           | 设置视频播放器的高度                                 |
| loop                                                         | loop               | 指定视频每次结束时都会重新开始                       |
| muted                                                        | muted              | 指定视频的音频输出应静音                             |
| poster                                                       | *URL*              | 指定在视频下载时或直到用户点击播放按钮之前显示的图像 |
| preload                                                      | auto metadata none | 指定作者认为在页面加载时是否以及如何加载视频         |
| src                                                          | *URL*              | 指定视频文件的 URL                                   |
| width                                                        | *pixels*           | 设置视频播放器的宽度                                 |



### 自定义视频控件示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>videoDemo</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"/>
</head>

<style>
  .container {
    position: relative;
    display: flex;
    width: max-content;
    height: max-content;
    justify-content: center;
    align-items: center;
  }

  .container #video {
    width: 600px;
    height: 400px;
    border-radius: 20px;
  }

  .container .controls {
    position: absolute;
    bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    opacity: 0.2;
    transition: opacity 0.4s;
  }

  .container:hover .controls {
    opacity: 1;
  }
  .container .controls button {
    background: transparent;
    color: #fff;
    font-weight: bolder;
    text-shadow: 2px 1px 2px #000;
    border: none;
    cursor: pointer;
  }
  .container .controls .timeline {
    flex: 1;
    display: flex;
    align-items: center;
    border: none;
    border-right: 3px solid #ccc;
    border-left: 3px solid #ccc;
  }
  .container .controls .timeline .bar{
    background: rgb(1, 1, 65);
    height: 4px;
    flex: 1;
  }
  .container .controls .timeline .bar .inner{
    background: #ccc;
    width: 0%;
    height: 100%;
  }
  .fa {
    font-size: 20px !important;
  }
  .play-pause-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
  }

</style>

<body>
<div class="container">
  <video onclick="play(event)" src="https://res.cloudinary.com/codelife/video/upload/v1637805738/intro_l5ul1k.mp4" id="video"></video>
  <button class="play-pause-btn" onclick="play(event)"><i class="fa fa-play"></i><i class="fa fa-pause"></i></button>
  <div class="controls">
    <button onclick="rewind(event)"><i class="fa fa-fast-backward"></i></button>
    <div class="timeline">
      <div class="bar">
        <div class="inner"></div>
      </div>
    </div>
    <button onclick="forward(event)"><i class="fa fa-fast-forward"></i></button>
    <button onclick="fullScreen(event)"><i class="fa fa-expand"></i></button>
    <button onclick="download(event)"><i class="fa fa-cloud-download"></i></button>
  </div>
</div>
</body>

<script>
  // Select the HTML5 video
  const video = document.querySelector("#video")
  // set the pause button to display:none by default
  document.querySelector(".fa-pause").style.display = "none"
  // update the progress bar
  video.addEventListener("timeupdate", () => {
    let curr = (video.currentTime / video.duration) * 100
    if(video.ended){
      document.querySelector(".fa-play").style.display = "block"
      document.querySelector(".fa-pause").style.display = "none"
    }
    document.querySelector('.inner').style.width = `${curr}%`
  })
  // pause or play the video
  const play = (e) => {
    // Condition when to play a video
    if(video.paused){
      document.querySelector(".fa-play").style.display = "none"
      document.querySelector(".fa-pause").style.display = "block"
      video.play()
    }
    else{
      document.querySelector(".fa-play").style.display = "block"
      document.querySelector(".fa-pause").style.display = "none"
      video.pause()
    }
  }
  // trigger fullscreen
  const fullScreen = (e) => {
    e.preventDefault()
    video.requestFullscreen()
  }
  // download the video
  const download = (e) => {
    e.preventDefault()
    let a = document.createElement('a')
    a.href = video.src
    a.target = "_blank"
    a.download = ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  // rewind the current time
  const rewind = (e) => {
    video.currentTime = video.currentTime - ((video.duration/100) * 5)
  }
  // forward the current time
  const forward = (e) => {
    video.currentTime = video.currentTime + ((video.duration/100) * 5)
  }
</script>

</html>

```


