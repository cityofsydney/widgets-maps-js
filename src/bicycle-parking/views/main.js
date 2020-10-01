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
  L.esri.basemapLayer("Topographic").addTo(map);
  var searchControl = L.esri.Geocoding.geosearch().addTo(map);

  // create a new cluster layer (new syntax at 2.0.0)
  var earthquakes = L.esri.Cluster.featureLayer({
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

  earthquakes.bindPopup(function (layer) {
    console.log(layer.feature);

    return L.Util.template(
      `<div>
      <div><strong>Bike Parking: {StreetName}</strong></div>

      <table cellpadding="0px" cellspacing="3px">
      <tbody>
            <tr valign="top">
                <td><b>Type</b></td>
                <td><span>{Type}</span> 
                </td>
             </tr>
             <tr valign="top">
                <td></td>
                <td>You’ll find these attached to a pole on the street.</td>
             </tr>
             <tr valign="top">
                <td><b>Address</b></td>
                <td>{StreetName}, {Suburb}&nbsp;{Postcode}</td>
             </tr>
             <tr valign="top">
                <td><b>Important</b></td>
                <td>Always secure your bike with sturdy lock, such as a ‘D’ lock. Record the serial number and keep a photo of your bike to help track it down should the worst happen.</td>
             </tr>
       </tbody>
 </table></div>`,
      layer.feature.properties
    );
  });
}
