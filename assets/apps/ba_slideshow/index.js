import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('ba_slideshow_root'))
  console.log("[INFO]", 'ba_slideshow loaded!')
})
