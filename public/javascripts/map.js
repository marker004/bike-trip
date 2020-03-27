let map;
let allKmls = [];

function initMap(mapIds) {
  const mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(39.8333333, -98.585522)
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  kmlImport(mapIds);
  addLoadListener();
}

function kmlImport(mapIds) {
  mapIds.forEach(mapId => {
    const buster = Number(new Date())
    const src = `https://www.google.com/maps/d/kml?forcekml=1&mid=${mapId}&buster=${buster}`
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

function getMapIdsFromGoogle(){
  fetch('/mapIds').then((response) => {
    return response.json();
  }).then((mapIds) => {
    initMap(mapIds);
  });
}

getMapIdsFromGoogle();