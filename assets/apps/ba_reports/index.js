import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('ba_reports_root'))
  console.log("[INFO]", 'ba_reports loaded!')
})

