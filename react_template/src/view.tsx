import React, { Component } from 'preact'
import { RAtom } from './ratom'
import { ReactGlobalStore } from './store'
import { Exception } from './exceptions'
import {List} from 'immutable'

const STATE = new ReactGlobalStore(List.of(1,2,3,4))

const reg_sub = STATE.reg_sub.bind(STATE)
const reg_event = STATE.reg_event.bind(STATE)
const subscribe = STATE.subscribe.bind(STATE)
const dispatch = STATE.dispatch.bind(STATE)

reg_event('add n', (l, n) => l.map(x => x + n).toList())
reg_event('append n', (l, n) => l.concat(n))
reg_sub('max', l => {console.log('c');return l.max()})
reg_sub('avg', average)
reg_sub('whole list', l => l)

class LogNotifier {
  notify() {
    console.log('notified')
  }
}

subscribe(new LogNotifier, 'avg')
function average(l) {
  let sum = 0
  for(let i of l.toJS()) {
    sum+=i
  }
  return sum / l.size
}

class RootComponent extends Component<any, any> {
  render() {
    let list = subscribe(this, 'whole list').toJS()
    return (
      <div>
        <p>Max: {subscribe(this, 'max')} </p>
        <p>Max: {subscribe(this, 'max')} </p>
        <p>Max: {subscribe(this, 'max')} </p>
        <p>Avg: {subscribe(this, 'avg')} </p>
        {list.map(function(n, i){
          return <p> {n} </p>;
        })}
        <button onClick={() => dispatch('add n', 1)}> add one </button>
        <button onClick={() => dispatch('add n', -1)}> sub one </button>
        <button onClick={() => dispatch('add n', 2)}> add two </button>
        <button onClick={() => dispatch('append n', -10)}> append -10 </button>
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
