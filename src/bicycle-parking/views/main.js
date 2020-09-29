import axios from "axios";

import "./style.css";
import html from "./layout.html";

export function renderMap(params) {
  window.dataLayer = window.dataLayer || [];

  let elements = [];
  let htmlLayout;

  // convert plain HTML string into DOM elements
  let temporary = document.createElement("div");
  temporary.innerHTML = html;
  htmlLayout = document.getElementById("esri-map-widget");

  //add dynamic fields
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    htmlLayout.append(temporary.children[0]);
  }

  const map = L.map("map", {
    center: [-33.90551, 151.20472],
    zoom: 14,
    gestureHandling: true,
    gestureHandlingOptions: {
      duration: 2000,
      text: {
        touch: "Use two fingers to move the map",
        scroll: "Use ctrl + scroll to zoom the map",
        scrollMac: "Use \u2318 + scroll to zoom the map",
      },
    },
  });

  // Add ArcGIS Online basemap
  L.esri.basemapLayer("Gray").addTo(map);

  // create a new cluster layer (new syntax at 2.0.0)
  var earthquakes = L.esri.Cluster.featureLayer({
    url:
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services/Bicycle_parking/FeatureServer/0",
  }).addTo(map);

  earthquakes.bindPopup(function (layer) {
    return L.Util.template(
      "<strong>{StreetName}</strong><br> <strong>{Suburb}-{Postcode}</strong>",
      layer.feature.properties
    );
  });
}
