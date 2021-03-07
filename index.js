/**
 * Create a toggle, which when entering toggles `key` on `ctx` (or `this`, if `ctx`
 * is not given) to `!initial`, and when exiting, sets `key` on the context back to
 * the value it had before entering.
 *
 * @param {string} key
 * @param {boolean} state
 * @param {*} ctx
 * @returns {() => Function}
 */
export function stateToggle(key, state, ctx) {
  return enter

  /**
   * Bound enter function to set `state` as `key` on `ctx`.
   * @returns {() => void}
   */
  function enter() {
    var context = ctx || this
    var current = context[key]

    context[key] = !state

    return exit

    /**
     * Configured exit function to revert setting `state` as `key` on `ctx`.
     */
    function exit() {
      context[key] = current
    }
  }
}
