const Swagger = require('swagger-client')
const cookie = require('cookie')

class CustomSwagger extends Swagger {
  buidRequest(options) {
    console.log("req built")
    let req = super.buildRequest(options)
    req.headers['X-CSRFToken'] = cookie.parse(document.cookie).csrftoken
    return req
  }
}

let getClient = async () => {
  let res = await fetch('http://' + window.location.host + '/docs?format=openapi')
  let json = await res.json()
  let spec = JSON.stringify(json)
  let client = await new CustomSwagger('data:application/json,' + spec)
  return client
}

let clientTest = async () => {
  let client = await getClient();
  console.log(client.apis)
  console.log(await client.apis.inari.whynot_list())
  console.log(client.apis.inari.whynot_list.toString())
  //console.log(await client.apis.inari.whynot_create())
}

clientTest()
