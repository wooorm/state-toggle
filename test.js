/**
 * @typedef {import('./index.js').Enter} Enter
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {stateToggle} from './index.js'

test('stateToggle()', async function (t) {
  await t.test('no context object', function () {
    /** @type {{on: boolean, enter?: Enter}} */
    const ctx = {on: false}

    ctx.enter = stateToggle('on', ctx.on)

    assert.equal(ctx.on, false, 'should start off')
    const exit = ctx.enter()
    assert.equal(ctx.on, true, 'should toggle on')
    exit()
    assert.equal(ctx.on, false, 'should revert')
  })

  await t.test('context object', function () {
    const ctx = {on: false}
    const enter = stateToggle('on', ctx.on, ctx)

    assert.equal(ctx.on, false, 'should start off')
    const exit = enter()
    assert.equal(ctx.on, true, 'should toggle on')
    exit()
    assert.equal(ctx.on, false, 'should revert')
  })

  await t.test('initial state', function () {
    const ctx = {on: 1}
    const enter = stateToggle('on', false, ctx)

    assert.equal(ctx.on, 1, 'should start on the initial state')
    const exit = enter()
    assert.equal(ctx.on, true, 'should toggle on')
    exit()
    assert.equal(ctx.on, 1, 'should revert')
  })

  await t.test('multiple state', function () {
    const ctx = {on: false}
    const enter = stateToggle('on', ctx.on, ctx)

    assert.equal(ctx.on, false, 'should start on the initial state')

    const exitA = enter()
    assert.equal(ctx.on, true, 'should toggle on')
    const exitB = enter()
    assert.equal(ctx.on, true, 'should not toggle again')

    exitB()
    assert.equal(ctx.on, true, 'should not revert when nested')
    exitA()
    assert.equal(ctx.on, false, 'should revert when not nested')
  })
})
