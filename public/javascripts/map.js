let map;
let allKmls = [];
let numKmlsLoaded = 0;

function initMap(mapIds) {
  const mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(39.8333333, -98.585522)
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  kmlImport(mapIds);
}

function kmlImport(mapIds) {
  // mapIds.forEach(mapId => {
  //   const src = buildUrl(mapId)
  //   // const src = 'https://drive.google.com/u/0/uc?id=1azKUneQJqPqH5gm_Qm3GCjKr2n6CMdvZ&export=download'
  //   const kml = new google.maps.KmlLayer(src, {
  //     suppressInfoWindows: false,
  //     preserveViewport: false,
  //     map: map
  //   });
  //   kml.addListener('status_changed', () => {
  //     console.log(kml.url, kml.getStatus())
  //     if (kml.getStatus() == 'OK') numKmlsLoaded += 1
  //     if (numKmlsLoaded == allKmls.length) setTimeout(() => doTheBounds(), 0)
  //   })
  //   allKmls.push(kml)
  // })
  const kml = new google.maps.KmlLayer('https://file.io/b0RwMZnc', {
    suppressInfoWindows: false,
    preserveViewport: true,
    map: map
  })
  console.dir(kml)
}

function buildUrl(mapId) {
  const buster = Number(new Date())
  const url = new URL('https://www.google.com/maps/d/kml')
  const params = { forcekml: 1, mid: mapId, buster: buster }
  Object.entries(params).forEach(param => { url.searchParams.append(param[0], param[1]) })
  return url.toString()
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

function getMapIdsFromGoogle(){
  fetch('/mapIds').then((response) => {
    return response.json();
  }).then((mapIds) => {
    console.log(mapIds)
    initMap(mapIds);
  });
}

getMapIdsFromGoogle();

// todo: figure out how to handle new kmls when roads are closed