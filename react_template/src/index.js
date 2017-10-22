import { getClient } from './swagger'
import { STATE } from './model'

function increment_counter(state) {
  return state.update('count', n => n + 1)
}

console.log(STATE.deref().toJS())

STATE.swap(increment_counter)

console.log(STATE.deref().toJS())
