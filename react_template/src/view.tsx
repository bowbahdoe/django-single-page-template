import React, { Component } from 'preact'
import { RAtom } from './ratom'
import { ReactGlobalStore } from './store'
import { Exception } from './exceptions'

const STATE = new ReactGlobalStore("No message yet")

const reg_sub = STATE.reg_sub.bind(STATE)
const reg_event = STATE.reg_event.bind(STATE)
const subscribe = STATE.subscribe.bind(STATE)
const dispatch = STATE.dispatch.bind(STATE)

import { getClient } from './swagger'

reg_sub('message', s => s)
reg_event('replace message', (s, new_msg) => new_msg)

async function getHelloMessage(event) {
    let c = await getClient
    let val = await c.apis.rest.list()
    dispatch('replace message', val.body)
}

class RootComponent extends Component<any, any> {
  render() {
    return (
      <div>
        <p> {subscribe(this, 'message')} </p>
        <button onClick={getHelloMessage}> Fetch Hello </button>
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
