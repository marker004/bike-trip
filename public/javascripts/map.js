let map;
let allKmls = [];
let numKmlsLoaded = 0;

function initMap(fileNames) {
  const mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(39.8333333, -98.585522)
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  kmlImport(fileNames);
}

function kmlImport(fileNames) {
  fileNames.forEach(fileName => {
    const src = buildUrl(fileName)
    const kml = new google.maps.KmlLayer(src, {
      suppressInfoWindows: false,
      preserveViewport: false,
      map: map
    });
    kml.addListener('status_changed', () => {
      console.log(kml.url, kml.getStatus())
      if (kml.getStatus() == 'OK') numKmlsLoaded += 1
      if (numKmlsLoaded == allKmls.length) setTimeout(() => doTheBounds(), 0)
    })
    allKmls.push(kml)
  })
}

function buildUrl(fileName) {
  const buster = Number(new Date())
  return `https://raw.githubusercontent.com/marker004/bike-trip/master/public/files/${fileName}?buster=${buster}`
}

function doTheBounds() {
  let totalBounds = new google.maps.LatLngBounds
  console.log(allKmls)
  allKmls.forEach((kml) => {
    const viewport = kml.getDefaultViewport();
    totalBounds = totalBounds.union(viewport);
  });
  map.fitBounds(totalBounds);
}

function getFileNames(){
  fetch('/filenames').then((response) => {
    return response.json();
  }).then((fileNames) => {
    initMap(fileNames);
  });
}

getFileNames();