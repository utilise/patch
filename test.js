var expect = require('chai').expect
  , patch = require('./')
  , last = require('utilise.last')
  , set = require('utilise.set')

describe('patch', function() {

  it('should patch', function(){
    var o = set()({ a: { b: { c: { x: 9 }}}}, 0, 100)

    expect(patch('a.b.c', { x: 1, y: 2, z: 3 })(o)).to.equal(o)
    expect(o).to.be.eql({ a: { b: { c: { x: 1, y: 2, z: 3 }}}})
    expect(o.log.length).to.eql(4)
    expect(o.log).to.eql([
       { value: { a: { b: { c: { x: 9 }}}}, type: 'update', time: 0 }
     , { value: 1, type: 'update', time: 1, key: 'a.b.c.x' }
     , { value: 2, type: 'update', time: 2, key: 'a.b.c.y' }
     , { value: 3, type: 'update', time: 3, key: 'a.b.c.z' }
    ])
  })

  it('should skip gracefully', function(){
    expect(patch('foo', 'bar')(true)).to.be.eql(true)
    expect(patch('foo', 'bar')(5)).to.be.eql(5)
  })
})