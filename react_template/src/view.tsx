import React, { Component } from 'preact'
import { Exception } from './exceptions'
import { RAtom, ReactGlobalStore } from './state'
import { Map, List } from 'immutable'

const ratom = new RAtom(234123)
const rstore = new ReactGlobalStore(Map.of("count", 0, "nums", List.of(1)))

rstore.reg_sub("count", state => state.get("count"))
rstore.reg_sub("nums", state => state.get("nums"))
rstore.reg_sub("max", state => state.get("nums").max())

rstore.reg_event("inc", state => state.update("count", n => n + 1))
rstore.reg_event("dec", state => state.update("count", n => n - 1))
rstore.reg_event("append", (state, x) => state.update("nums", l => l.unshift(x)))

function collatz(n) {
  if(n % 2 == 0) {
    return n / 2
  }
  else {
    return 3 * n + 1
  }
}

class RootComponent extends Component<any, any> {
  render() {
    return (
      <div>
        <p>Collatz Conjecture: {ratom.deref(this)}</p>
        <button onClick={() => ratom.swap(n => collatz(n))}> Hailstone </button>

        <p> Count: {rstore.subscribe(this, "count")} </p>
        <p> Numbers: {JSON.stringify(rstore.subscribe(this, "nums").toJS())} </p>
        <p> Max: {(rstore.subscribe(this, "max"))} </p>
        <button onClick={()=>{rstore.dispatch("inc")}}>
          Increment
        </button>
        <button onClick={()=>{rstore.dispatch("dec")}}>
          Decrement
        </button>
        <button onClick={()=>{
          rstore.dispatch("append", rstore.subscribe(this, "max") as any + 1)
        }}>
          Append 1 + max
        </button>
      </div>
    )
  }
}

export function render(): void {
  let mount = document.getElementById('mount')
  if(mount !== null) {
    React.render(<RootComponent />, mount)
  }
  else {
    throw new Exception('No suitable div to mount within found')
  }
}
