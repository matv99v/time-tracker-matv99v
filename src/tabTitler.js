const changeTime = 125;
const titleSprites = ['>', '>>', '>>>'];
let i = 0;
let intervalId = null;


function setTitle(str) {
    document.title = str;
}

function nextSprite() {
    const result = titleSprites[i];
    i = i === titleSprites.length - 1 ? 0 : ++i;
    setTitle('⏸ ' + result);
}

function firstSprite() {
    setTitle(titleSprites[0]);
}

function startSprites() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            nextSprite();
        }, changeTime);
    }
}

function stopSprites() {
    clearInterval(intervalId);
    intervalId = null;
    // firstSprite();
    setPlay();
}

function setPlay() {
    setTitle('▶ time');
}

function setStop() {
    setTitle('⏹ time');
}


module.exports = {startSprites, stopSprites, setPlay, setStop};
