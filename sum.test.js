const sum = require('./sum')

test("Mengecek fungsi tambah", ()=>{
    expect(sum(2,3)).toBe(5)
})