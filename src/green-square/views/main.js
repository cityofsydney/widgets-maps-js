import "./style.css";
import "./layout.html";

import axios from "axios";

export function renderMap(params) {
  console.log("params: ", params);

  window.dataLayer = window.dataLayer || [];

  let EsriMap = L.map(params, {
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

  let layer = L.esri.basemapLayer("Gray").addTo(EsriMap);

  //Add mask using feature layer
  // https://leafletjs.com/reference-1.6.0.html#path-option
  /*   const GreenSquareMask = L.esri.featureLayer({
    url:
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/GreenSquareMask/FeatureServer/0",
    style: function () {
      return { opacity: 0.3, weight: 1, stroke: false };
    },
  }); */

  // Method 1: add via feature server
  // https://esri.github.io/esri-leaflet/api-reference/layers/feature-layer.html
  const Green_Square_Development_Areas_feature = L.esri.featureLayer({
    url:
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/Green_Square_Development_Areas/FeatureServer/0",

    style: function () {
      return { color: "#2DB84B", opacity: 1, weight: 1, stroke: false };
    },
  });

  // Method 2: add via geojson server
  axios
    .get(
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/Green_Square_Development_Areas/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token="
    )
    .then(function (response) {
      // handle success
      const data = response.data;
      //console.log(data);
      const Green_Square_Development_Areas_geojson = L.geoJSON(data, {
        style: function (feature) {
          switch (feature.properties.FID) {
            case 1:
              return {
                fillColor: "#2DB84B",
                opacity: 0.3,
                color: "#2DB84B",
                weight: 1,
              };
              break;
            case 2:
              return {
                fillColor: "#2DB84B",
                color: "#2DB84B",
                opacity: 1,
                weight: 1,
              };
              break;
            default:
            // code block
          }
        },
      }).addTo(EsriMap);
    })
    .catch(function (error) {
      console.log(error);
    });

  let iconGreenSquare = L.divIcon({
    className: "icon-label",
    iconSize: null,
    html: "Green Square",
  });

  let iconTownCentre = L.divIcon({
    className: "icon-label",
    iconSize: null,
    html: "Town centre",
  });

  const markerGreenSquare = L.marker([-33.9032, 151.19846], {
    icon: iconGreenSquare,
  }).addTo(EsriMap);

  const markerTownCentre = L.marker([-33.90743, 151.20347], {
    icon: iconTownCentre,
  }).addTo(EsriMap);
}
