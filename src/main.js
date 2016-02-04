import validators from './validators.js';
import Timer from './Timer.js';


const input = {
    name: 'Vova25',
    email: '@sdfgg.fg',
    username: 'Vas',
    password: 'shortshort+A1',
    repassword: '5555',
    month: '02',
    day: '03',
    year: '2020',
    gender: 'm',
    phone: '096-913-71-95'
};

console.log('===============input===============');
console.log(input);
console.log('===============errors===============');
console.log(validators.validateRegistrationData(input));

const t1 = new Timer();

console.log( 'spentTime: ', t1.getSpentTime() );
t1.start();

setTimeout( () => {
    t1.stop();
    t1.start();
    console.log( 'spentTime: ', t1.getSpentTime() );
}, 250);


setTimeout( () => {
    console.log( 'spentTime: ', t1.getSpentTime() );
}, 500);

setTimeout( () => {
    t1.stop();
    console.log( 'spentTime: ', t1.getSpentTime() );
}, 1000);

setTimeout( () => {
    console.log( 'spentTime: ', t1.getSpentTime() );
    t1.start();
}, 1500);

setTimeout( () => {
    console.log( 'spentTime: ', t1.getSpentTime() );
    t1.clear();
    console.log( 'spentTime: ', t1.getSpentTime() );
}, 2000);
