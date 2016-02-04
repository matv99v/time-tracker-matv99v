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

// Псевдо код теста
// timer.start()
// wait 1 sec
// timer.clear()
// wait 1 sec
// timer.getSpentTime(); // === 1 sec

const t1 = new Timer();


console.log('1 before start!', t1, 'spent:',  t1.getSpentTime());
t1.start();
console.log('2 start!', t1, 'spent:', t1.getSpentTime());

setTimeout( () => {
    t1.stop();
    console.log('3 state in 0.5 sec!', t1, 'spent:', t1.getSpentTime());
    t1.start();
}, 500);


setTimeout( () => {
    console.log('3 state in one sec!', t1, 'spent:', t1.getSpentTime());
    t1.clear();
    console.log('4 cleared', t1, 'spent:', t1.getSpentTime());
}, 1000);

setTimeout( () => {
    console.log( '5 before stop in one sec: ', 'spent:', t1.getSpentTime() );
    t1.stop();
    console.log( '6 stopped in one sec: ', 'spent:', t1.getSpentTime() );
}, 2000);
