import { forEachFn } from '../src/mock';
describe('mock 函数', () => {
    it('mock fn be call', () => {
        let mockCb = jest.fn();
        let array = [4, 5];
        forEachFn(array, mockCb);
        console.log(mockCb.mock);
        expect(mockCb.mock.calls.length).toBe(2)
    })
})