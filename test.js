import test from 'tape'
import {stateToggle} from './index.js'

test('stateToggle()', function (t) {
  t.test('no context object', function (t) {
    var ctx = {on: false}
    var exit

    ctx.enter = stateToggle('on', ctx.on)

    t.equal(ctx.on, false, 'should start off')
    exit = ctx.enter()
    t.equal(ctx.on, true, 'should toggle on')
    exit()
    t.equal(ctx.on, false, 'should revert')

    t.end()
  })

  t.test('context object', function (t) {
    var ctx = {on: false}
    var enter = stateToggle('on', ctx.on, ctx)
    var exit

    t.equal(ctx.on, false, 'should start off')
    exit = enter()
    t.equal(ctx.on, true, 'should toggle on')
    exit()
    t.equal(ctx.on, false, 'should revert')

    t.end()
  })

  t.test('initial state', function (t) {
    var ctx = {on: 1}
    var enter = stateToggle('on', false, ctx)
    var exit

    t.equal(ctx.on, 1, 'should start on the initial state')
    exit = enter()
    t.equal(ctx.on, true, 'should toggle on')
    exit()
    t.equal(ctx.on, 1, 'should revert')

    t.end()
  })

  t.test('multiple state', function (t) {
    var ctx = {on: false}
    var enter = stateToggle('on', ctx.on, ctx)
    var exitA
    var exitB

    t.equal(ctx.on, false, 'should start on the initial state')

    exitA = enter()
    t.equal(ctx.on, true, 'should toggle on')
    exitB = enter()
    t.equal(ctx.on, true, 'should not toggle again')

    exitB()
    t.equal(ctx.on, true, 'should not revert when nested')
    exitA()
    t.equal(ctx.on, false, 'should revert when not nested')

    t.end()
  })

  t.end()
})
