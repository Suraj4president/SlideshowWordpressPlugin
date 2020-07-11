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
