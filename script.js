var videoPlayer = document.getElementById('videoPlayer');
var videoSource = document.getElementById('videoSource');
var videos = [
    "./videos/34608-402679728_small.mp4",
    "./videos/3177845-hd_1920_1080_24fps.mp4",
    "./videos/31377-386628887_small.mp4"
];
var currentVideoIndex = 0;
videoPlayer.onended = function () {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoSource.src = videos[currentVideoIndex];
    videoPlayer.load();
    videoPlayer.play();
};