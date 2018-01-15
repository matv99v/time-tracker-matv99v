import moment from 'moment';
import 'moment-duration-format';

const messages = [{
    text: '---===Logger===---',
    count: 1
}];


export default {
    // 1 - time

    // get time duration string
    formatTime(ms) {
        return moment.duration(ms).format({
            template: 'HH:mm:ss',
            trim: false
        });
    },

    // get time duration seconds
    getSeconds(ms) {
        return moment.duration(ms).format({
            template: 'ss',
            trim: false
        });
    },

    msToSeconds(ms) {
        return ms / 60000;
    },

    secondsToMs(sec) {
        return sec * 60000;
    },

    // 2 - logger

    log(newMsg) {
        const len = messages.length;
        const prevMsg = messages[len - 1];
        if (prevMsg.text === newMsg) {
            ++prevMsg.count;
        } else {
            messages.push({
                text: newMsg,
                count: 1
            });

        }
        console.log(newMsg);
    },

    getMessages() {
        return messages;
    },

    // 3 localStorage handler
    backup(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    },

    restore(key) {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    },

    // compare arrays of simple objects
    areArraysEqual(arrA, arrB) {
        const strA = JSON.stringify(arrA);
        const strB = JSON.stringify(arrB);
        return strA === strB;
    }

};
