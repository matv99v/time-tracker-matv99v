/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _validatorsJs = __webpack_require__(/*! ./validators.js */ 1);
	
	var _validatorsJs2 = _interopRequireDefault(_validatorsJs);
	
	var _TimerJs = __webpack_require__(/*! ./Timer.js */ 2);
	
	var _TimerJs2 = _interopRequireDefault(_TimerJs);
	
	var input = {
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
	console.log(_validatorsJs2['default'].validateRegistrationData(input));
	
	// Псевдо код теста
	// timer.start()
	// wait 1 sec
	// timer.clear()
	// wait 1 sec
	// timer.getSpentTime(); // === 1 sec
	
	var t1 = new _TimerJs2['default']();
	
	console.log('1 before start!', t1, 'spent:', t1.getSpentTime());
	t1.start();
	console.log('2 start!', t1, 'spent:', t1.getSpentTime());
	
	setTimeout(function () {
	    t1.stop();
	    console.log('3 state in 0.5 sec!', t1, 'spent:', t1.getSpentTime());
	    t1.start();
	}, 500);
	
	setTimeout(function () {
	    console.log('3 state in one sec!', t1, 'spent:', t1.getSpentTime());
	    t1.clear();
	    console.log('4 cleared', t1, 'spent:', t1.getSpentTime());
	}, 1000);
	
	setTimeout(function () {
	    console.log('5 before stop in one sec: ', 'spent:', t1.getSpentTime());
	    t1.stop();
	    console.log('6 stopped in one sec: ', 'spent:', t1.getSpentTime());
	}, 2000);

/***/ },
/* 1 */
/*!***************************!*\
  !*** ./src/validators.js ***!
  \***************************/
/***/ function(module, exports) {

	'use strict';
	
	function validateRegistrationData(formData) {
	    var errors = {};
	
	    var criterions = {
	        name: {
	            matchTests: [{
	                regExp: /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019]*$/i,
	                errMsg: 'Should contain only letters latin/cyrillic'
	            }],
	            carrier: 'name',
	            required: true
	        },
	
	        email: {
	            matchTests: [{
	                regExp: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z0-9.-]{2,}$/ig,
	                errMsg: 'Wrong email format'
	            }],
	            carrier: 'email',
	            required: true
	        },
	
	        username: {
	            matchTests: [{
	                regExp: /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019]*$/i,
	                errMsg: 'Should contain only letters latin/cyrillic'
	            }],
	            carrier: 'username',
	            required: true
	        },
	
	        password: {
	            matchTests: [{
	                regExp: /[A-Z]/,
	                errMsg: 'Should contain at least one uppercase letter'
	            }, {
	                regExp: /[^a-z0-9]+/i,
	                errMsg: 'Should contain at least one special character'
	            }, {
	                regExp: /\d+/i,
	                errMsg: 'Should contain at least one digit'
	            }, {
	                regExp: /.{8,}/i,
	                errMsg: 'Should contain at least 8 characters'
	            }],
	            carrier: 'password',
	            required: true
	        },
	
	        repassword: {
	            matchTests: [{
	                regExp: /^(?!\s*$).+/,
	                errMsg: 'Require'
	            }],
	            carrier: 'repassword',
	            required: true
	        },
	
	        year: {
	            matchTests: [{
	                regExp: /^\d{4}$|^$/,
	                errMsg: 'Invalid date'
	            }],
	            carrier: 'birthday',
	            required: false
	        },
	
	        month: {
	            matchTests: [{
	                regExp: /^\d{0,2}$/,
	                errMsg: 'Invalid date'
	            }],
	            carrier: 'birthday',
	            required: false
	        },
	
	        day: {
	            matchTests: [{
	                regExp: /^\d{0,2}$/,
	                errMsg: 'Invalid date'
	            }],
	            carrier: 'birthday',
	            required: false
	        },
	
	        phone: {
	            matchTests: [{
	                regExp: /^[0-9+()-\s]*$/,
	                errMsg: 'Wrong number'
	            }],
	            carrier: 'phone',
	            required: false
	        }
	    };
	
	    // -----------------------checking RegExp tests--------------------------
	
	    var _loop = function (field) {
	        if (criterions[field]) {
	            (function () {
	                var matchTestsArr = criterions[field].matchTests; // array of regExp tests
	                var carrier = criterions[field].carrier;
	                var required = criterions[field].required;
	
	                /* eslint-disable */
	                matchTestsArr.forEach(function (claim) {
	                    /* eslint-disable */
	                    var isTestOk = claim.regExp.test(formData[field]);
	                    if (!isTestOk) errors[carrier] = claim.errMsg;
	                    if (required && !formData[field]) errors[carrier] = 'Required';
	                });
	            })();
	        }
	    };
	
	    for (var field in formData) {
	        _loop(field);
	    }
	
	    // --------------------Is password === repassword--------------------
	    if (formData.password !== formData.repassword) {
	        errors.repassword = 'Should be equal to password';
	    }
	
	    // --------------------Future date check--------------------
	    var grantedDate = new Date(formData.year, formData.month, formData.day);
	    if (grantedDate > Date.now()) {
	        errors.birthday = 'Date should not be in future';
	    }
	
	    return errors;
	}
	
	module.exports = { validateRegistrationData: validateRegistrationData };

/***/ },
/* 2 */
/*!**********************!*\
  !*** ./src/Timer.js ***!
  \**********************/
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Timer = (function () {
	    function Timer() {
	        _classCallCheck(this, Timer);
	
	        this.isPlaying = false;
	        this.timeStamp = 0;
	        this.accumulatedTime = 0;
	    }
	
	    _createClass(Timer, [{
	        key: 'start',
	        value: function start() {
	            if (!this.isPlaying) {
	                this.timeStamp = Date.now();
	            }
	            this.isPlaying = true;
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (this.isPlaying) {
	                this.isPlaying = false;
	                this.accumulatedTime += Date.now() - this.timeStamp;
	                this.timeStamp = 0;
	            }
	        }
	    }, {
	        key: 'getSpentTime',
	        value: function getSpentTime() {
	            if (this.isPlaying) {
	                return Date.now() - this.timeStamp + this.accumulatedTime;
	            }
	            return this.accumulatedTime;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.timeStamp = Date.now();
	            this.accumulatedTime = 0;
	        }
	    }]);
	
	    return Timer;
	})();
	
	module.exports = Timer;

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map