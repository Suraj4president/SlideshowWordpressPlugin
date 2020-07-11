import React, { useContext } from 'react'
import styled from 'styled-components'

import StartScreen from './start-screen'
import { MainContext, SLIDE_START, SLIDE_END, BASE_URL } from '../app'

const SLIDE_WIDTH = 'auto'

const Wrapper = styled.div`
  position: relative;
  width: ${SLIDE_WIDTH};
`
const ImgWrapper_ = styled.div`
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
`

const FinalScore_ = styled.div`
  > img {
    position: absolute;
    height: 70% !important;
    width: auto !important;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const FinalScore = ({ currentScore }) => (
  <FinalScore_>
    <img src= {`${BASE_URL}06/score${currentScore}.png`}/>
  </FinalScore_>
)

const Slide = ({ className, slideButtons }) => {
  const { currentSlide, currentScore } = useContext(MainContext)
  const styles = slideStyles[`s${currentSlide}`]
  const ImgWrapper = styled(ImgWrapper_)`${styles}`

  return (
    <Wrapper>
      { currentSlide === 1 && <StartScreen /> }
      <ImgWrapper className="img-wrapper">
        <img src={`${BASE_URL}05/quiz${currentSlide}.png`} />
        {slideButtons}
        { currentSlide === SLIDE_END && <FinalScore currentScore={currentScore} />}
      </ImgWrapper>
    </Wrapper>
  )
}

export default Slide
