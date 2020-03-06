import "./style.css";

import "./layout.html";

export function renderMap(params) {
  console.log("params: ", params);

  window.dataLayer = window.dataLayer || [];

  let map = L.map(params).setView([37.75, -122.23], 10);

  L.esri.basemapLayer("Topographic").addTo(map);
}
