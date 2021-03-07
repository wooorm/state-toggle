// Construct a state `toggler`: a function which inverses `property` in context
// based on its current value.
// The by `toggler` returned function restores that value.
export function stateToggle(key, state, ctx) {
  return enter

  function enter() {
    var context = ctx || this
    var current = context[key]

    context[key] = !state

    return exit

    function exit() {
      context[key] = current
    }
  }
}
