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
  fileNames = ['5-30--6-7', '6-8--6-18', '6-19--6-28'];
  fileNames.forEach(fileName => {
    let src;
    if (environment == 'local') {
      src = `https://raw.githubusercontent.com/marker004/bike-trip/master/public/files/kmls/${fileName}.kml`;
    } else if (environment == 'production') {
      src = `${location.origin}/files/kmls/${fileName}.kml`;
    }

    const kml = new google.maps.KmlLayer(src, {
      suppressInfoWindows: false,
      preserveViewport: false,
      map: map
    });

    allKmls.push(kml)
  })
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
