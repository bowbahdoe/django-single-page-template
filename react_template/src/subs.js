import {reg_sub} from './global'

reg_sub("count",
  state => {
    state.get("count")
  })
