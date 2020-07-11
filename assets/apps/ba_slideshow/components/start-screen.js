import React, { useContext } from 'react'
import styled from 'styled-components'

import helpers from '../helpers'
import { MainContext } from '../app'

const StartScreen_ = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;

  > div {
    position: absolute;
    top: 20%;
    left: 10%;
  }

  > div > div {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 800;
    color: #000;
  }

  & input {
    display: block;
    padding: 8px;
    width: 200px;
    margin-bottom: 5px;
  }
`

const StartScreen = () => {
  const { username, setUsername, formSubmitted, startQ } = useContext(MainContext)
  return (
    <StartScreen_>
      <div>
        <div>Please Enter Your Name</div>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        {formSubmitted === true && !helpers.validateUsername(username) && <div style={{color: 'red'}}>* A name is required</div>}
        <button className="button" onClick={startQ}>Click to take the quiz!</button>
      </div>
    </StartScreen_>
  )
}

export default StartScreen
