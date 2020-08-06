import axios from "axios";

import "./style.css";
import html from "./layout.html";
import colors from "../../libs/colors.js";

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
    center: [-33.88686, 151.20467],
    zoom: 13,
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

  const layer = L.esri.basemapLayer("Topographic").addTo(EsriMap);

  const globalFeatureStyle = {
    color: colors.greenTint110Darken20,
    opacity: 1,
    fillColor: colors.green,
    fillOpacity: 0.2,
    weight: 1,
  };

  const arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();
  const featureLayer = L.esri.Geocoding.featureLayerProvider({
    url:
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services/SydneyLEP2012MapSheet/FeatureServer/0",
    searchFields: ["MAP_SHEET"], // Search these fields for text matches
    label: "Map sheets", // Group suggestions under this header
    formatSuggestion: function (feature) {
      return feature.properties.MAP_SHEET;
    },
  });

  //https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html
  const geosearch = L.esri.Geocoding.geosearch({
    placeholder: "Search for places or addresses",
    zoomToResult: true,
    useMapBounds: true,
    position: "topright",
    providers: [arcgisOnline, featureLayer],
  }).addTo(EsriMap);

  // Method 2: add via geojson server
  axios
    .get(
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services/SydneyLEP2012MapSheet/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token="
    )
    .then(function (response) {
      // handle success
      const data = response.data;
      //console.log(data);
      //https://leafletjs.com/reference-1.6.0.html#geojson
      const SydneyLEP2012MapSheet = L.geoJSON(data, {
        style: function (feature) {
          return { ...globalFeatureStyle };
        },
        onEachFeature: function (feature, layer) {
          const label = L.marker(layer.getBounds().getCenter(), {
            icon: L.divIcon({
              className: "icon-label",
              iconSize: null,
              html: feature.properties.MAP_SHEET,
            }),
          }).addTo(EsriMap);

          let popupContent = `
          <h4>Sheet ${feature.properties.MAP_SHEET}</h4>
          `;

          layer.bindPopup(popupContent);
        },
      }).addTo(EsriMap);
    })
    .catch(function (error) {
      console.log(error);
    });
}
