import { getMonth } from './index'

describe('Date helper', () => {
    describe('When getMonth is called', () => {
        it('the function return janvier for 2022-01-01 as date', () => {
            const date = '2022-01-01'
            const result = getMonth(new Date(date))
            expect(result).toBe('janvier')
        })
        it('the function return juillet for 2022-07-08 as date', () => {
            const date = '2022-07-08'
            const result = getMonth(new Date(date))
            expect(result).toBe('juillet')
        })
    })
})
