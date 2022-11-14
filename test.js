import test from 'tape'
import {stateToggle} from './index.js'

test('stateToggle()', function (t) {
  t.test('no context object', function (t) {
    const ctx = {on: false}

    ctx.enter = stateToggle('on', ctx.on)

    t.equal(ctx.on, false, 'should start off')
    const exit = ctx.enter()
    t.equal(ctx.on, true, 'should toggle on')
    exit()
    t.equal(ctx.on, false, 'should revert')

    t.end()
  })

  t.test('context object', function (t) {
    const ctx = {on: false}
    const enter = stateToggle('on', ctx.on, ctx)

    t.equal(ctx.on, false, 'should start off')
    const exit = enter()
    t.equal(ctx.on, true, 'should toggle on')
    exit()
    t.equal(ctx.on, false, 'should revert')

    t.end()
  })

  t.test('initial state', function (t) {
    const ctx = {on: 1}
    const enter = stateToggle('on', false, ctx)

    t.equal(ctx.on, 1, 'should start on the initial state')
    const exit = enter()
    t.equal(ctx.on, true, 'should toggle on')
    exit()
    t.equal(ctx.on, 1, 'should revert')

    t.end()
  })

  t.test('multiple state', function (t) {
    const ctx = {on: false}
    const enter = stateToggle('on', ctx.on, ctx)

    t.equal(ctx.on, false, 'should start on the initial state')

    const exitA = enter()
    t.equal(ctx.on, true, 'should toggle on')
    const exitB = enter()
    t.equal(ctx.on, true, 'should not toggle again')

    exitB()
    t.equal(ctx.on, true, 'should not revert when nested')
    exitA()
    t.equal(ctx.on, false, 'should revert when not nested')

    t.end()
  })

  t.end()
})
