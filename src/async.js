
// 异步代码 回调函数
export function getData(cb) {
    console.log('cb')
    setTimeout(() => {
        cb({ name: 'cb' });
    }, 4000)
}
// promise方式
export function getDataByPromise() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove({ name: 'promise' });
        }, 3000)
    })
}
export function getDataByPromiseRject() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reject('error');
        }, 3000)
    })
}