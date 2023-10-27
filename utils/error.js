const hasError = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Error]";
};

module.exports = { hasError };