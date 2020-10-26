'use strict'

var test = require('tape')
var toggle = require('.')

test('toggle()', function (t) {
  t.test('no context object', function (st) {
    var ctx = {on: false}
    var exit

    ctx.enter = toggle('on', ctx.on)

    st.equal(ctx.on, false, 'should start off')
    exit = ctx.enter()
    st.equal(ctx.on, true, 'should toggle on')
    exit()
    st.equal(ctx.on, false, 'should revert')

    st.end()
  })

  t.test('context object', function (st) {
    var ctx = {on: false}
    var enter = toggle('on', ctx.on, ctx)
    var exit

    st.equal(ctx.on, false, 'should start off')
    exit = enter()
    st.equal(ctx.on, true, 'should toggle on')
    exit()
    st.equal(ctx.on, false, 'should revert')

    st.end()
  })

  t.test('initial state', function (st) {
    var ctx = {on: 1}
    var enter = toggle('on', false, ctx)
    var exit

    st.equal(ctx.on, 1, 'should start on the initial state')
    exit = enter()
    st.equal(ctx.on, true, 'should toggle on')
    exit()
    st.equal(ctx.on, 1, 'should revert')

    st.end()
  })

  t.test('multiple state', function (st) {
    var ctx = {on: false}
    var enter = toggle('on', ctx.on, ctx)
    var exitA
    var exitB

    st.equal(ctx.on, false, 'should start on the initial state')

    exitA = enter()
    st.equal(ctx.on, true, 'should toggle on')
    exitB = enter()
    st.equal(ctx.on, true, 'should not toggle again')

    exitB()
    st.equal(ctx.on, true, 'should not revert when nested')
    exitA()
    st.equal(ctx.on, false, 'should revert when not nested')

    st.end()
  })

  t.end()
})
