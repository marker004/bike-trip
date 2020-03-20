let map;
let allKmls = [];

function initMap() {
  const mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(46.908312, -124.112932)
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  kmlImport();
  addLoadListener();
}

function kmlImport() {
  fileNames = ['5-30--6-7', '6-8--6-18', '6-19--6-28', '6-29--7-7'];
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
  return `${origin}/files/kmls/${fileName}.kml`
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