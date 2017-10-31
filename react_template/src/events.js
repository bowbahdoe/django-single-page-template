import { partialRight } from 'lodash'
import { reg_event } from './global'

function increment(n, x) {
  return n + Math.abs(x)
}

function decrement(n, x) {
  return n - Math.abs(x)
}

function increment_counter(state, n) {
  let inc = partialRight(increment, n === undefined ? 1 : n)
  return state.update("count", inc)
}

function decrement_counter(state, n) {
  let dec = partialRight(decrement, n === undefined ? 1 : n)
  return state.update("count", dec)
}

reg_event("increment", increment_counter)
reg_event("decrement", decrement_counter)
