import { getData, getDataByPromise, getDataByPromiseRject } from '../src/async';

// describe 套件 是划分作用域的  
describe('test getData', () => {
    // it('异步回调函数test1', () => {
    //     function callBack(data) {
    //         console.log(data, 'data');
    //         expect(data).toEqual({ name: 'cb' });
    //     }
    //     getData(callBack);
    // })


    // 测试用例是同步执行的，如果有异步代码，那么测试用例执行完成了，异步代码都还没开始执行呢？
    // 可以使用done关键字，jest就会等到done被调用才会结束当前的test case
    // it('done关键字回调函数获取数据', (done) => {
    //     function callBack(data) {
    //         expect(data).toEqual({ name: 'cb' });
    //         done();
    //     }
    //     getData(callBack);
    // })


    // it('promise函数获取数据', () => {
    //     return getDataByPromise().then(res => {
    //         expect(res).toEqual({name: 'promise'})
    //     });
    // })


    // 另外一种写法
    // it('promise函数获取数据', () => {
    //     return expect(getDataByPromise()).resolves.toEqual({ name: 'promise' });
    // })


    // it('promise reject', () => {
    //     expect.assertions(1); // 在进行测试时，需要进行一次断言，数字代表执行几次断言
    //     return getDataByPromiseRject().catch(e => expect(e).toBe('error'));
    // })


    // it('promise reject', () => {
    //     return expect(getDataByPromiseRject()).rejects.toBe('error');
    // })

    // async await
    // it('async promise 异步获取数据', async () => {
    //     // let res = await getDataByPromise();
    //     // expect(res).toEqual({ name: 'promise' });
    //     // await expect(getDataByPromise()).resolves.toEqual({ name: 'promise' });
    // })
    it('async promise reject', async () => {
        await expect(getDataByPromiseRject()).rejects.toBe('error');
    })

})