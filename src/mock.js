export function forEachFn(array, cb) {
    for (let index = 0; index < array.length; index++) {
        let el = array[index];
        cb(el);
    }
}