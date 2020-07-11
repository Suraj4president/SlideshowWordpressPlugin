const helpers = {}

helpers.preloadImages = (baseUrl) => {
  const imageList1 = [...Array(7).keys()].map((num) => `${baseUrl}05/quiz${num+1}.png`)
  imageList1.forEach((image) => {
    new Image().src = image
  })
  const imageList2 = [...Array(5).keys()].map((num) => `${baseUrl}06/score${num+1}.png`)
  imageList2.forEach((image) => {
    new Image().src = image
  })
}

helpers.answerSets = [
  [2, 'Yes', 'No'],
  [1, '4-5', '10', '15+'],
  [3, '5oz', '3oz', '1.5oz'],
  [1, '25', '18', '21'],
  [2, '3', '6', '10'],
]

helpers.getCorrectAnswer = (answerSet) => {
  const correctAnswerNum = answerSet[0]
  return answerSet[correctAnswerNum]
}

helpers.validateUsername = (username) => {
  return !!username
}

helpers.filterObject = function(obj, predicate) {
  let key, result = {}

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
        result[key] = obj[key]
    }
  }

  return result
}

helpers.parseJson = (text) => {
  let data = {}
  try {
    data = JSON.parse(text)
    return data
  } catch(error) {
    return data
  }
}

export default helpers
