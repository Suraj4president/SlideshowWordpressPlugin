import { parseJson } from './utils'
import config from './config'

export const fetchFileList = (setData, setError) => {
  jQuery.ajax({
    url: config.ajaxUrl,
    method: 'POST',
    data: {
      my_api_route: 'files_list',
      my_nonce: config.nonce,
    },
    success: (response) => {
      setData(response.data)
    },
    error: (jqXHR, status, error) => {
      const data = parseJson(jqXHR.responseText)
      setError(data.error)
      console.log("[DEBUG] error =", error)
    }
  })
}

export const fetchFile = (params, setData, setError) => {
  jQuery.ajax({
    url: config.ajaxUrl,
    method: 'POST',
    data: {
      my_api_route: 'files_get',
      my_nonce: config.nonce,
      filename: params.filename,
    },
    success: (response) => {
      setData(params.filename, response.data)
    },
    error: (jqXHR, status, error) => {
      const data = parseJson(jqXHR.responseText)
      setError(data.error)
      console.log("[DEBUG] error =", error)
    }
  })
}

export const batchDeleteFiles = (params, setData, setError) => {
  jQuery.ajax({
    url: config.ajaxUrl,
    method: 'POST',
    data: {
      my_api_route: 'files_batch_delete',
      my_nonce: config.nonce,
      files: params.files,
    },
    success: (response) => {
      setData(response.data)
    },
    error: (jqXHR, status, error) => {
      const data = parseJson(jqXHR.responseText)
      setError(data.error)
      console.log("[DEBUG] error =", error)
    }
  })
}

