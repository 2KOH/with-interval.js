(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.withInterval = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const getInterval = (() => {
	const toString = {}.toString;
	return (interval) =>
		toString.call(interval) === '[object Function]' ? interval() : +interval;
})();

const withInterval = (func, interval = 1000) => {
	let promise = Promise.resolve();
	const object = (...args) => {
		const ret = promise.then(() => func(...args));
		promise = ret.catch(() => {}).then(() => new Promise(
			(resolve) => setTimeout(resolve, getInterval(object.interval))
		));
		return ret;
	};
	object.interval = interval;
	return object;
};

module.exports = withInterval;

},{}]},{},[1])(1)
});
