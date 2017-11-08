import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Exception } from '@mccue/exceptions'
import { subscribe, dispatch } from './global'

class RootComponent extends Component {
  render() {
    return (
      <div>
        <p>Count: {subscribe(this, 'count')}</p>
        <button onClick={() => dispatch('increment')}> inc </button>
        <button onClick={() => dispatch('decrement')}> dec </button>
      </div>
    )
  }
}

export function render() {
  let mount = document.getElementById('mount')
  if(mount !== null) {
    ReactDOM.render(<RootComponent />, mount)
  }
  else {
    throw new Exception('No suitable div to mount within found')
  }
}
