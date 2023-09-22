const hasError = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Error]";
};

const sendError500 = (res, err) => {
    res.status(500).json({ message: err.message });
};

module.exports = { hasError, sendError500 };