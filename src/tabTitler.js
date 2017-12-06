const changeTime = 250;
const titleSprites = ['>', '>>', '>>>', '>>>>', '>>>>>', '◕‿◕'];
let i = 0;
let intervalId = null;

const getNextSprite = () => {
    const result = titleSprites[i];
    i = i === titleSprites.length - 1 ? 0 : ++i;
    return result;
};

const startTitleSprites = () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            document.title = getNextSprite();
        }, changeTime);
    }
};

const stopTitleSprites = () => {
    clearInterval(intervalId);
    intervalId = null;
};

module.exports = {startTitleSprites, stopTitleSprites};
