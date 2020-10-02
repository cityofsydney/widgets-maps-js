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
    maxZoom: 24,
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
  L.esri.basemapLayer("Topographic").addTo(map);

  // create a new cluster layer (new syntax at 2.0.0)

  var bikeMarker = L.esri.Cluster.featureLayer({
    spiderfyOnMaxZoom: false,
    url:
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services/Bicycle_parking/FeatureServer/0",
    pointToLayer: function (geojson, latlng) {
      var mapIcon = L.icon({
        iconUrl: "./img/cycle.png",
      });
      return L.marker(latlng, {
        icon: mapIcon,
      });
    },
  }).addTo(map);

  bikeMarker.bindPopup(function (layer) {
    layer.feature.properties.bikeImportant =
      "Always secure your bike with sturdy lock, such as a ‘D’ lock. Record the serial number and keep a photo of your bike to help track it down should the worst happen. ";
    layer.feature.properties.bikeType =
      "These are free standing racks. You can lock your bike to both sides.";
    if (layer.feature.properties.Type == "O-Ring") {
      layer.feature.properties.bikeImportant =
        "Always secure your bike with sturdy lock, such as a ‘D’ lock. Record the serial number and keep a photo of your bike to help track it down should the worst happen.";
      layer.feature.properties.bikeType =
        "You’ll find these attached to a pole on the street.";
    }
    let popupContent = `<div>
    <div><strong>Bike Parking:  {StreetName}</strong></div>

    <dl>
    <dt>Type</dt>
    <dd>{Type}</dd>
    <dt></dt>
    <dd>{bikeType}</dd>
    <dt>Address</dt>
    <dd>{StreetName}, {Suburb}&nbsp;{Postcode}</dd>
    <dt>Important</dt>
    <dd>{bikeImportant}</dd>
  </dl>
  </div>`;
    return L.Util.template(popupContent, layer.feature.properties);
  });
}
