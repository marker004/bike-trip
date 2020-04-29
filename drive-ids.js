const { google } = require('googleapis');
const credentials = JSON.parse(process.env.CREDENTIALS)
const fs = require('fs');
const axios = require('axios')

const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: "v3", auth });

module.exports = getEm = async () => {
  try {
    params = { q: "mimeType = 'application/vnd.google-apps.map'", pageSize: 15 }
    res = await drive.files.list(params)
    list = res.data.files
    const axiosConfig = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    for await (file of [list[0]]) {
      let url = buildUrl(file.id)
      const { data } = await axios.get(url)
      const localFile = fs.writeFileSync(`${file.id}.kml`, data)

      const tempUrl = await axios.post('https://file.io', data, axiosConfig)

      console.log(tempUrl)
      // const response = await drive.files.get({ fileId: id, alt: 'media' })
      // console.log(id)
    }
    // list.forEach(function(file){
      // let id = file.id
      // const { data } = await drive.files.get({ fileId: id, alt: 'media' })

      // axios.post('https://whatever.com/todos', { text: data })
      //   .then(res => {
      //     console.log(`statusCode: ${res.statusCode}`)
      //     console.log(res)
      //   })

      // let dest_file = fs.createWriteStream(`${file.id}.kml`);
      // drive.files.get({ fileId: file.id, alt: 'media' })
      //            .on('end', () => console.log('Done'))
      //            .pipe(dest_file)
    // })

    // const id = '1azKUneQJqPqH5gm_Qm3GCjKr2n6CMdvZ'
    // const {data} = await drive.files.get({ fileId: id, alt: 'media' })
    // console.log(data)
    // // const destFile = fs.createWriteStream(`${id}.kml`)
    // fs.writeFileSync(`${id}.kml`, data, function(){
    //   console.log(data)
    // })

    // const id = '1azKUneQJqPqH5gm_Qm3GCjKr2n6CMdvZ'
    // const dest_file = fs.createWriteStream(`${id}.kml`);
    // drive.files.get({ fileId: id, alt: 'media' })
    //           .on('end', function () { console.log('Done'); })
    //           .pipe(dest_file)
    return list.map(file => file.id)
  } catch(e) {
    console.log(e)
  }
}

function buildUrl(mapId) {
  const buster = Number(new Date())
  const url = new URL('https://www.google.com/maps/d/kml')
  const params = { forcekml: 1, mid: mapId, buster: buster }
  Object.entries(params).forEach(param => { url.searchParams.append(param[0], param[1]) })
  return url.toString()
}