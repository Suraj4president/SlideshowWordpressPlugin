import React from 'react'
import styled from 'styled-components'

import Slide from './components/slide'
import DebugPanel from './components/debug-panel'
import helpers from './helpers'

export const DATA = window.ba_slideshow_data
export const DEBUG_MODE = false
export const SLIDE_START = 1
export const SLIDE_END = 7
export const BASE_URL = `http://ownuparizona.org/wp-content/uploads/2020/`

export const MainContext = React.createContext({
  info: 'main context default value',
});

const App = () => {
  const [initialized, setInitialized] = React.useState(false)
  const [currentSlide, setSlide] = React.useState(SLIDE_START)
  const [currentScore, setScore] = React.useState(0)
  const [sessionAnswers, setSessionAnswers] = React.useState({})
  const [username, setUsername] = React.useState('')
  const [formSubmitted, setFormSubmitted] = React.useState(false)

  React.useEffect(() => {
    if (initialized === true) {
      return
    }
    setInitialized(true)
    helpers.preloadImages(BASE_URL)
  })

  React.useEffect(() => {
    if (currentSlide !== SLIDE_END) {
      return
    }

    console.log("[INFO]", 'useEffect')

    jQuery.ajax({
      url: DATA.ajaxUrl,
      type: 'POST',
      data: {
        my_api_route: 'session_answers_update',
        my_session_answers: {
          username,
          ...sessionAnswers,
        },
        my_nonce: DATA.nonce,
      },
      success: function( response ) {
        console.log(response);
      },
      error: function(jqXhr, status, error) {
        console.log(error);
      },
    })
  })

  const next = (slideNum, answer, correctAnswer) => {
    const updatedSessionAnswers = Object.assign({}, sessionAnswers, { [slideNum]: answer })
    setSessionAnswers(updatedSessionAnswers)
    if (answer === correctAnswer) {
      setScore(currentScore+1)
    }
    nextSlide();
  }

  const renderSlideButtons = () => {
    if (currentSlide === 1) {
      return null
    } else if (currentSlide > 6) {
      return null
    } else {

      const set = helpers.answerSets[currentSlide-2]
      const correctAnswer = helpers.getCorrectAnswer(set)
      const answers = set.slice(1)

      return (
        <>
        {answers.map((a,i) => <div className={`sBtn sBtn${i+1}`} key={a} onClick={() => next(currentSlide, a, correctAnswer)}><p>{a}</p></div>)}
        </>
      )
    }
  }

  const nextSlide = () => {
    if (currentSlide < SLIDE_END) {
      setSlide(currentSlide+1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > SLIDE_START) {
      setSlide(currentSlide-1)
    }
  }

  const startQ = () => {
    if (currentSlide === 1) {
      setFormSubmitted(true)
      if (helpers.validateUsername(username)) {
        setSlide(2)
      }
    }
  }

  const mainState = {
    currentSlide,
    currentScore,
    username,
    setUsername,
    startQ,
    formSubmitted,
  }

  return (
    <MainContext.Provider value={mainState}>
      <Slide slideButtons={renderSlideButtons(currentSlide)} />
      {DEBUG_MODE && <DebugPanel />}
    </MainContext.Provider>
  )
}

export default App
