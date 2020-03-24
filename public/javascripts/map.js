let map;
let allKmls = [];

function initMap() {
  const mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(39.8333333, -98.585522)
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  kmlImport();
  addLoadListener();
}

function kmlImport() {
  fileNames.forEach(fileName => {
    const src = kmlSrc(fileName);
    const kml = new google.maps.KmlLayer(src, {
      suppressInfoWindows: false,
      preserveViewport: false,
      map: map
    });

    allKmls.push(kml)
  })
}

function kmlSrc(fileName) {
  let origin;

  if (environment == 'local') {
    origin = 'https://raw.githubusercontent.com/marker004/bike-trip/master';
  } else if (environment == 'production') {
    origin = location.origin;
  }
  return `${origin}/files/kmls/${fileName}`
}

function addLoadListener() {
  google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
    let totalBounds = new google.maps.LatLngBounds
    console.log(allKmls)
    allKmls.forEach((kml) => {
      const viewport = kml.getDefaultViewport();
      console.log(viewport);
      totalBounds = totalBounds.union(viewport);
    });
    console.log(totalBounds)
    map.fitBounds(totalBounds);
  })
}

initMap();


/* todo:
use network link kml?
automatically read new files in kmls folder
*/