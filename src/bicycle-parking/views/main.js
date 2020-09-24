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

  const layer = L.esri.basemapLayer("Gray").addTo(EsriMap);

  // Method 2: add via geojson server
  axios
    .get(
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services/Bicycle_parking/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token="
    )
    .then(function (response) {
      // handle success
      const data = response.data;
      //console.log(data);
      let myIcon = L.icon({
        iconUrl: "./img/cycle.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28],
      });

      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: myIcon });
        },
      }).addTo(EsriMap);
    })
    .catch(function (error) {
      console.log(error);
    });
}
