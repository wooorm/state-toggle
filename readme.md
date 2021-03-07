# state-toggle

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Enter/exit a state.

## Install

[npm][]:

```sh
npm install state-toggle
```

## Use

```js
import {stateToggle} from 'state-toggle'

var ctx = {on: false}
var enter = stateToggle('on', ctx.on, ctx)
var exit

// Entering:
exit = enter()
console.log(ctx.on) // => true

// Exiting:
exit()
console.log(ctx.on) // => false
```

## API

`state-toggle` exports the following identifier: `stateToggle`.
There is no default export.

### `toggle(key, initial[, ctx])`

Create a toggle, which when entering toggles `key` on `ctx` (or `this`, if `ctx`
is not given) to `!initial`, and when exiting, sets `key` on the context back to
the value it had before entering.

###### Returns

`Function` — [`enter`][enter].

### `enter()`

Enter the state.

###### Context

If no `ctx` was given to `toggle`, the context object (`this`) of `enter()` is
used to toggle.

###### Returns

`Function` — [`exit`][exit].

### `exit()`

Exit the state, reverting `key` to the value it had before entering.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/state-toggle/workflows/main/badge.svg

[build]: https://github.com/wooorm/state-toggle/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/state-toggle.svg

[coverage]: https://codecov.io/github/wooorm/state-toggle

[downloads-badge]: https://img.shields.io/npm/dm/state-toggle.svg

[downloads]: https://www.npmjs.com/package/state-toggle

[size-badge]: https://img.shields.io/bundlephobia/minzip/state-toggle.svg

[size]: https://bundlephobia.com/result?p=state-toggle

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[enter]: #enter

[exit]: #exit
