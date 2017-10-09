let swagger = require('./swagger')
let getClient = swagger.getClient
let csrf = swagger.CSRFTOKEN

let clientTest = async () => {
  let client = await getClient();
  console.log(await client.apis.inari.whynot_list())
  console.log(await client.apis.inari.whynot_create())
}

clientTest()
