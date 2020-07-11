import React from 'react'
import styled from 'styled-components'

import Table from './table'
import { parseJson, filterObject } from './utils'

const DATA = window.ba_slideshow_data

const Box = styled.div`
  background: #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const ApiError = styled(({ className, error, setError }) => (
  <div className={className}>
    <span>{error}</span>
    <span onClick={() => setError(null)}>X</span>
  </div>
))`
  color: red;
  border: 1px solid red;
  padding: 5px 10px;
  margin-bottom: 10px;

  & span:last-child {
    cursor: pointer;
    float: right;
  }
`

const Button = styled.button`
  margin-bottom: 10px;
  margin-right: 10px;
`

const App = () => {
  const [initialized, setInitialized] = React.useState(false)
  const [answerList, setAnswers] = React.useState(DATA.savedAnswers)
  const [apiError, setApiError] = React.useState(null)

  React.useEffect(() => {
    if (initialized === true) {
      return
    }
    setInitialized(true)
    jQuery('#ba_reports_loading').hide();
  })

  return (
    <>
      {apiError && <ApiError error={apiError} setError={setApiError} />}
      <Box>
        <Table list={answerList} />
      </Box>
    </>
  )
}

export default App
