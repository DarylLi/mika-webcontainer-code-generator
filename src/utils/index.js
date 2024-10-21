export var fromArray2Object = function (arr) {
    var result = {};
    try {
        arr.forEach(function (e) {
            if (e.filename) {
                result[e.filename] = (e.children && e.children.length) > 0
                    ? { directory: fromArray2Object(e.children) }
                    : { file: { contents: e.value } };
            }
        });
    }
    catch (error) {
        console.log(error);
    }
    return result;
};
