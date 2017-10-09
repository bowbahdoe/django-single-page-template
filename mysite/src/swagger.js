const Swagger = require('swagger-client')
const cookie = require('cookie')

export
const CSRFTOKEN = cookie.parse(document.cookie).csrftoken

export
let getClient = (function() {
    var client = null;
    return async () => {
      if(client === null) {
        let {host, protocol} = window.location
        let url = `${protocol}//${host}/docs?format=openapi`
        let res = await fetch(url)
        let json = await res.json()
        let spec = JSON.stringify(json)
        client = await Swagger({
          url: `data:application/json,${spec}`,
          requestInterceptor: (req) => {
            req.headers['X-CSRFToken'] = CSRFTOKEN
            return req
          }
        })
      }
      return client
    }
  })();
