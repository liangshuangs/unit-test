# 单元测试用例
## 单元测试的目的：
1. 每次迭代的时候，保证不破坏原有的逻辑
2. 方便阅读别人写的代码，单元测试可以知道方法的实现的功能，相对于一个方法的文档

## 单元测试的种类：
1. 黑盒测试（不知道实现的逻辑，只关注结果）
2. 白盒测试（知道实现的逻辑）
3. 单元测试（测试的范围是单元，比如一个函数，一个组件）
4. 集成测试（多个单元组合成的测试，也叫行为测试）

## TDD和BDD：
1. BDD：行为驱动测试，先开发功能，再测试功能是否符合预期
2. TDD：测试驱动开发，先写测试用例，再开发功能，即先有预期，再开发功能

## 前端比较流行的测试框架：
1. karma:跑在真正浏览器进行测试，比如测试一些UI组件
2. mocha: 只提供测试框架，比如提供断言库 可以合karma一起配合着使用(比如elementUI)
3. jest: 集成了mocha+jsdom，可以在node环境下，模拟dom,但是不能测试样式，自带测试覆盖率，优点：0配置

## jest 测试异步代码
1. 回调函数
应用场景：比如ajax请求，请求接口返回数据后，执行成功或者失败的回调
```
    // 异步代码 回调函数
    export function getData(cb) {
        setTimeout(() => {
            cb({ name: 'cb' });
        }, 4000)
    }   
```
那怎么测试呢？测试的思路是调用getData，然后创建给一个callBack函数，getData获取到数据后会调用callBack函数，在callBack函数里面做断言就可以了。
```
it('异步回调函数test1', () => {
        function callBack(data) {
            console.log(data, 'data');
            expect(data).toEqual({ name: 'cb' });
        }
        getData(callBack);
    })
```
执行 npm run test 测试通过，但是发现并没有打印 dada,说明并没有执行回调函数；
看下test case  首先是声明了一个callBack方法，然后执行了getData(callBack)，这个test case就结束了。异步代码并没有执行
### done关键字
```
it('done关键字回调函数获取数据', (done) => {
        function callBack(data) {
            expect(data).toEqual({ name: 'cb' });
            done();
        }
        getData(callBack);
    })
```
jest会判定是否有done参数传入，如果有的话，就会的等待，等待done被调用才会结束当前的test case，如果done没有结束，则不会执行下一个case。当然，jest 也不会一直在等待，默认是5s
```
export function getData(cb) {
    console.log('cb')
    setTimeout(() => {
        cb({ name: 'cb' });
    }, 6000)
}
it('done关键字回调函数获取数据', (done) => {
        function callBack(data) {
            expect(data).toEqual({ name: 'cb' });
            done();
        }
        getData(callBack);
    })

```
这个test case 也是失败的，5s没有调用done()的原因
那如何测试这用等待时间超过5s的？可以使用mock timer

### promise then 链式调用
promise可以进行链式调用，可以使用then方法接收返回的数据在进行断言即可。
```
export function getDataByPromise() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove({ name: 'promise' });
        }, 3000)
    })
}
// 测试
it('promise函数获取数据', () => {
    return getDataByPromise().then(res => {
        expect(res).toEqual({name: 'promise'})
    });
})
```
在测试用例中，需要 return Promise，jest就会等待这个Promise,如果没有，那个就不会等待
测试promise被拒绝，可以使用catch
```
it('promise reject', () => {
    expect.assertions(1); // 在进行测试时，需要进行一次断言，数字代表执行几次断言
    return getDataByPromiseRject().catch(e => expect(e).toBe('error'));
})
```
另外一种写法，因为expect()提供了resolves rejects属性 返回的就是resolve和reject的值
```
it('promise函数获取数据', () => {
    return expect(getDataByPromise()).resolves.toEqual({ name: 'promise' });
})
it('promise reject', () => {
    return expect(getDataByPromiseRject()).rejects.toBe('error');
})
```
### promise async await 结合使用
```
it('async promise 异步获取数据', async () => {
    let res = await getDataByPromise();
    expect(res).toEqual({ name: 'promise' });
})
it('async promise 异步获取数据', async () => {
    await expect(getDataByPromise()).resolves.toEqual({ name: 'promise' });
})
it('async promise reject', async () => {
    await expect(getDataByPromiseRject()).rejects.toBe('error');
})
```
## mock 函数
在测试中，经常需要依赖一些其他的内容，比如异步请求，依赖网络等等，这些数据有不可控的；我们可以对这些不可控的数据进行mock，变成我们可以控制的。
怎么创建mock 函数呢？
```
let mockFn = jest.fn();
```