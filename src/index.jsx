import React from 'react'
import { render } from 'react-dom'

import App from './components/App'
import './css/index.css'

let root = document.createElement('div')

root.id = 'root'
document.appendChild(root)

render(<App />, document.querySelector('#root'))
