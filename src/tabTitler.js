const changeTime = 250;
const titleSprites = ['>', '>>', '>>>', '>>>>', '>>>>>'];
let i = 0;
let intervalId = null;

function nextSprite() {
    const result = titleSprites[i];
    i = i === titleSprites.length - 1 ? 0 : ++i;
    document.title = result;
}

function firstSprite() {
    document.title = titleSprites[0];
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
    firstSprite();
}

module.exports = {startSprites, stopSprites};
