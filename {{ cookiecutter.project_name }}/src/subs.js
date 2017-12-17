import {reg_sub} from './global'

reg_sub("count",
  state => {
    return state.get("count")
  })
