import React, { Component } from 'preact'
import { Exception } from './exceptions'

import { subscribe, dispatch } from './global'

//setInterval(() => {dispatch('increment')}, 1)
class RootComponent extends Component<any, any> {
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

export function render(): void {
  let mount = document.getElementById('mount')
  if(mount !== null) {
    React.render(<RootComponent />, mount)
  }
  else {
    throw new Exception('No suitable div to mount within found')
  }
}
