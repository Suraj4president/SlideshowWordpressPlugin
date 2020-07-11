import React from 'react'
import styled from 'styled-components'

const App = () => {
  const DATA = window.ba_slideshow_data
  const DEBUG_MODE = false
  const BASE_URL = `http://ownuparizona.org/wp-content/uploads/2020/`
  const SLIDE_START = 1
  const SLIDE_END = 7
  const SLIDE_WIDTH = 'auto'
  const [initialized, setInitialized] = React.useState(false)
  const [currentSlide, setSlide] = React.useState(SLIDE_START)
  const [currentScore, setScore] = React.useState(0)
  const [sessionAnswers, setSessionAnswers] = React.useState({})

  const preloadImages = () => {
    const imageList1 = [...Array(7).keys()].map((num) => `${BASE_URL}05/quiz${num+1}.png`)
    imageList1.forEach((image) => {
      new Image().src = image
    })
    const imageList2 = [...Array(5).keys()].map((num) => `${BASE_URL}06/score${num+1}.png`)
    imageList2.forEach((image) => {
      new Image().src = image
    })
  }

  React.useEffect(() => {
    if (initialized === true) {
      return
    }
    setInitialized(true)
    preloadImages()
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
        my_session_answers: sessionAnswers,
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
      setSlide(2)
    }
  }

  const next = (slideNum, answer, correctAnswer) => {
    const updatedSessionAnswers = Object.assign({}, sessionAnswers, { [slideNum]: answer })
    setSessionAnswers(updatedSessionAnswers)
    if (answer === correctAnswer) {
      setScore(currentScore+1)
    }
    nextSlide();
  }

  const answerSets = [
    [2, 'Yes', 'No'],
    [1, '4-5', '10', '15+'],
    [3, '5oz', '3oz', '1.5oz'],
    [1, '25', '18', '21'],
    [2, '3', '6', '10'],
  ]

  const getCorrectAnswer = (answerSet) => {
    const correctAnswerNum = answerSet[0]
    return answerSet[correctAnswerNum]
  }

  const renderSlideButtons = (slideNum) => {
	  if (slideNum === 1) {
		  return (<><div className={`sBtn startBtn`} onClick={() => startQ}><p>Click to take the quiz!</p></div></>)
	  } else if (slideNum > 6) {
      return null
      } else {

		const set = answerSets[slideNum-2]
		const correctAnswer = getCorrectAnswer(set)
		const answers = set.slice(1)

		return (
		  <>
			{answers.map((a,i) => <div className={`sBtn sBtn${i+1}`} key={a} onClick={() => next(slideNum, a, correctAnswer)}><p>{a}</p></div>)}
		  </>
		)
	}
  }

  const DebugPanel = () => (
    <div>
      <pre>
        <strong>DebugPanel</strong>
        <br />
        <a onClick={prevSlide}>Back</a>{'  '}|{' '}
        <a onClick={nextSlide}>Next</a>
        <hr />
        currentSlide: {currentSlide}
        <br />
        currentScore: {currentScore}
        <br />
        Session answers:
        <br />
{JSON.stringify(sessionAnswers)}
      </pre>
    </div>
  )

  const FinalScore = () => (
    <div>
	  <img class="resultImage" src= {`${BASE_URL}06/score${currentScore}.png`}/>
    </div>
  )

  const Slide = ({ className, slideNum }) => {
    return (
      <div className={className} onClick={startQ}>
        <img src={`${BASE_URL}05/quiz${slideNum}.png`} />
        {renderSlideButtons(slideNum)}
        { slideNum === SLIDE_END && <FinalScore />}
      </div>
    )
  }

  const BaseSlide = styled(Slide)`
    position: relative;
    width: ${SLIDE_WIDTH};

	img {
		width: 100%;
		}

    .sBtn {
      cursor: pointer;
      display: inline-block;
      padding: 5px
      background: transparent;
      color: red;
      border: 1px solid red;
      position: absolute;
      bottom: 0;
      width: 100px;
      height: 50px;
    }

	.sBtn p {
		transform: translate(0, 100%);
	}

    /* NOTE: delete these */
    & :nth-child(2) {
      bottom: 0;
      left: 0;
    }

    & :nth-child(3) {
      bottom: 0;
      left: 40%;
    }

    & :nth-child(4) {
      bottom: 0;
      right: 0;
    }
    /* end NOTE */

    & .finalScore {
    }
  `

  const slideStyles = {}
  slideStyles.s1 = `
    cursor: pointer;

	.startBtn {
		bottom: 50%;
		left: 30%;
		width: 42%;
		height: 10%;
		font-size: 2.5em;
		border-radius: 20px;
		border: 2px solid #75ABBC;
		background: #FFFF00;
		color: #75ABBC;
		text-align: center;
		transform: translate(-50%, 50%);
	}

	.startBtn:hover {
			background: #D6CB00;
	}

	.startBtn p {
		transform: translate(0,25%);
	}
  `

  // NOTE: Below is the CSS to position the buttons for the first question
  slideStyles.s2 = `
    .sBtn1 {
      top: 46%;
      left: 4%;
      height: 22%;
      width: 19%;
	  background: #58B6C0;
      border: 2px solid #fff;
      color: #fff;
  	  font-family: Arial, sans-serif;
	  font-size: 5em;
	  text-align: center;
  	  border-radius: 25px;
    }
    .sBtn2 {
      top: 46%;
      left: 27%;
      height: 22%;
      width: 19%;
	  background: #75BDA5;
      border: 2px solid #fff;
      color: #fff;
  	  font-family: Arial, sans-serif;
	  font-size: 5em;
	  text-align: center;
  	  border-radius: 25px;
    }
    .sBtn1:hover {
		background: #3D8184;
    }
    .sBtn2:hover {
		background: #507F6E;
    }
  `

  // You can write CSS to position the buttons for each slide like above example
  slideStyles.s3 = `
  .sBtn1 {
    bottom: 20%;
    left: 12%;
    width: 150px;
    height: 150px;
	font-size: 4.5em;
  	border-radius: 50%;
    border: 2px solid #fff;
	background: #EF0A0A;
    color: #fff;
	text-align: center;
    transform: translate(-50%, 50%);
  }
  .sBtn2 {
    bottom: 20%;
    left: 50%;
    width: 150px;
    height: 150px;
	font-size: 4.5em;
  	border-radius: 50%;
    border: 2px solid #fff;
	background: #EF0A0A;
    color: #fff;
	text-align: center;
    transform: translate(-50%, 50%);
  }
  .sBtn3 {
    bottom: 20%;
    left: 88%;
    width: 150px;
    height: 150px;
	font-size: 4.5em;
  	border-radius: 50%;
    border: 2px solid #fff;
	background: #EF0A0A;
    color: #fff;
	text-align: center;
    transform: translate(-50%, 50%);
  }
    .sBtn1:hover {
		background: #BA0606;
    }
    .sBtn2:hover {
		background: #BA0606;
    }
    .sBtn3:hover {
		background: #BA0606;
    }
  `

	slideStyles.s4 = `
	  .sBtn1 {
		bottom: 60%;
		left: 15%;
		width: 20%;
		height: 10%;
		font-size: 3.5em;
		border-radius: 20px;
		border: 2px solid #fff;
		background: #EF0A0A;
		color: #fff;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
	  .sBtn2 {
		bottom: 40%;
		left: 15%;
		width: 20%;
		height: 10%;
		font-size: 3.5em;
		border-radius: 20px;
		border: 2px solid #fff;
		background: #EF0A0A;
		color: #fff;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
	  .sBtn3 {
		bottom: 20%;
		left: 15%;
		width: 20%;
		height: 10%;
		font-size: 3.5em;
		border-radius: 20px;
		border: 2px solid #fff;
		background: #EF0A0A;
		color: #fff;
		text-align: center;
		transform: translate(-50%, 50%);
	  }

		.sBtn1 p {
			transform: translate(0, 30%);
		}
		.sBtn2 p {
			transform: translate(0, 30%);
		}
		.sBtn3 p {
			transform: translate(0, 30%);
		}
		.sBtn1:hover {
			background: #BA0606;
		}
		.sBtn2:hover {
			background: #BA0606;
		}
		.sBtn3:hover {
			background: #BA0606;
		}
  `

	slideStyles.s5 = `
	  .sBtn1 {
		bottom: 50%;
		left: 10%;
		width: 120px;
		height: 120px;
		font-size: 3.5em;
		border-radius: 50%;
		border: 2px solid #fff;
		background: #B1CFF2;
		color: #fff;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
	  .sBtn2 {
		bottom: 38%;
		left: 27%;
		width: 120px;
		height: 120px;
		font-size: 3.5em;
		border-radius: 50%;
		border: 2px solid #fff;
		background: #B1CFF2;
		color: #fff;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
	  .sBtn3 {
		bottom: 26%;
		left: 44%;
		width: 120px;
		height: 120px;
		font-size: 3.5em;
		border-radius: 50%;
		border: 2px solid #fff;
		background: #B1CFF2;
		color: #fff;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
		.sBtn1:hover {
			background: #86A8D1;
		}
		.sBtn2:hover {
			background: #86A8D1;
		}
		.sBtn3:hover {
			background: #86A8D1;
		}
  `

	slideStyles.s6 = `
	  .sBtn1 {
		bottom: 48%;
		left: 51%;
		width: 120px;
		height: 120px;
		font-size: 3.5em;
		border-radius: 50%;
		border: 2px solid #75ABBC;
		background: #FFFF00;
		color: #75ABBC;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
	  .sBtn2 {
		bottom: 28%;
		left: 73%;
		width: 120px;
		height: 120px;
		font-size: 3.5em;
		border-radius: 50%;
		border: 2px solid #75ABBC;
		background: #FFFF00;
		color: #75ABBC;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
	  .sBtn3 {
		bottom: 58%;
		left: 88%;
		width: 120px;
		height: 120px;
		font-size: 3.5em;
		border-radius: 50%;
		border: 2px solid #75ABBC;
		background: #FFFF00;
		color: #75ABBC;
		text-align: center;
		transform: translate(-50%, 50%);
	  }
		.sBtn1:hover {
			background: #D6CB00;
		}
		.sBtn2:hover {
			background: #D6CB00;
		}
		.sBtn3:hover {
			background: #D6CB00;
		}
  `

	slideStyles.s7 = `
	.resultImage {
		position: absolute;
		height: 70% !important;
		width: auto;
		top: 58%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	`

  const renderSlide = (currentSlide) => {
    const styles = slideStyles[`s${currentSlide}`]
    const Component = styled(BaseSlide)`${styles}`
    return <Component slideNum={currentSlide} />
  }

  return (
    <>
      {renderSlide(currentSlide)}
      {DEBUG_MODE && <DebugPanel />}
    </>
  )
}

export default App
