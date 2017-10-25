import { ReactGlobalStore } from './state'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
  count: 0,
  navbar: {
    open: false
  }
})

const STORE = new ReactGlobalStore(INITIAL_STATE)

export const subscribe = STORE.subscribe.bind(STORE)
export const dispatch = STORE.dispatch.bind(STORE)
export const reg_sub = STORE.reg_sub.bind(STORE)
export const reg_event = STORE.reg_event.bind(STORE)
