export const filterObject = function(obj, predicate) {
  let key, result = {}

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
        result[key] = obj[key]
    }
  }

  return result
}

export const parseJson = (text) => {
  let data = {}
  try {
    data = JSON.parse(text)
    return data
  } catch(error) {
    return data
  }
}
