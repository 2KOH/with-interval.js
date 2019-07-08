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
