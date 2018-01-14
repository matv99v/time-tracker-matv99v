import moment      from 'moment';
import 'moment-duration-format';

const messages = [
    // 'test msg1',
    // 'test msg2',
    // 'hello world',
    // 'comon baby light my fire',
    // 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];


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

    log(msg) {
        messages.push(msg);
        console.log(msg);
    },

    getMessages() {
        return messages;
    }
};
