import moment      from 'moment';
import 'moment-duration-format';

export default {
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
    }

};
