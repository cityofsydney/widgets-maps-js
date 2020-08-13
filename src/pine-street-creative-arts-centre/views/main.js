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

  const EsriMap = L.map("map", {
    center: [-33.88825, 151.19589],
    zoom: 18,
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

  const layer = L.esri.basemapLayer("Gray").addTo(EsriMap);

  const chippendale = L.marker([-33.88791, 151.19624])
    .addTo(EsriMap)
    .bindPopup("<h3>Chippendale centre</h3> 64 Pine Street <br> Chippendale");

  const darlington = L.marker([-33.8893, 151.19498])
    .addTo(EsriMap)
    .bindPopup(
      "<h3>Darlington centre</h3> Harry Burland Activity Centre <br> Corner of Shepherd and Ivy Streets <br> Darlington"
    );
}
