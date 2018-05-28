import urljoin from 'url-join'

// TODO Change Base URL when no apiKey variable
function getEndpoint (service) {
  return urljoin('https://rest.coinapi.io', service)
}

function requestProperties (method = 'GET') {
  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }

  return {
    method: method,
    headers: headers
  }
}

module.exports = {
  getEndpoint,
  requestProperties
}
