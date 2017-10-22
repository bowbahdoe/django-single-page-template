import { Atom } from './atom'
import Immutable from 'Immutable'

const initial_state = {
  count: 0
}

export const STATE = new Atom(Immutable.fromJS(initial_state))
