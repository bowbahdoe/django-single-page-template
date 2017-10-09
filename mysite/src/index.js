let swagger = require('./swagger')
let getClient = swagger.getClient
let csrf = swagger.CSRFTOKEN

let clientTest = async () => {
  let client = await getClient();
  let inari = client.apis.inari
  await inari.api_racks_create({data: {name: "aga"}})
  let racks = await inari.api_racks_list()
  for(rack of racks.body) {
    document.getElementById('mount').append(rack.name)
  }
}

clientTest()
