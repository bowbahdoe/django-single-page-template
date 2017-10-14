let swagger = require('./swagger')

let clientTest = async () => {
  let client = await swagger.getClient()
  console.log(client)
  console.log(await client.apis.rest.list())
}

clientTest()
