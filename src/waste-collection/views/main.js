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

  const globalFeatureStyle = {
    opacity: 1,
    weight: 0,
  };

  // Method 2: add via geojson server
  axios
    .get(
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services/Waste_Service_Day/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token="
    )
    .then(function (response) {
      // handle success
      const data = response.data;
      //console.log(data);
      //https://leafletjs.com/reference-1.6.0.html#geojson
      const Green_Square_Development_Areas_geojson = L.geoJSON(data, {
        style: function (geoJsonFeature) {
          switch (geoJsonFeature.properties.DomesticWasteRecycling) {
            case "Monday":
              return {
                fillColor: "Orange",
                color: "Orange",
                ...globalFeatureStyle,
              };
              break;
            case "Tuesday":
              return {
                fillColor: "pink",
                color: "pink",
                ...globalFeatureStyle,
              };
              break;
            case "Wednesday":
              return {
                fillColor: "brown",
                color: "brown",
                ...globalFeatureStyle,
              };
              break;
            case "Thursday":
              return {
                fillColor: "green",
                color: "green",
                ...globalFeatureStyle,
              };
              break;
            case "Friday":
              return {
                fillColor: "blue",
                color: "blue",
                ...globalFeatureStyle,
              };
              break;
            default:
              return {
                fillColor: "#2DB84B",
                color: "#2DB84B",
                ...globalFeatureStyle,
              };
          }
        },
        onEachFeature: function (feature, layer) {
          /*           const label = L.marker(layer.getBounds().getCenter(), {
            icon: L.divIcon({
              className: "icon-label",
              iconSize: null,
              html: feature.properties.DomesticWasteRecycling,
            }),
          }).addTo(EsriMap); */

          let DomesticWasteRecycling =
            feature.properties.DomesticWasteRecycling || "";
          let OrganicWasteWeek = feature.properties.OrganicWasteWeek || "";
          let IfTwiceWeekly = feature.properties.IfTwiceWeekly || "";
          let IfThriceWeekly = feature.properties.IfThriceWeekly || "";

          let popupContent = `
           

            
            <dl class="mw-popup-list">
              <dt>Standard service day</dt>
              <dd>${DomesticWasteRecycling}</dd>

              <dt>2 x week</dt>
              <dd>${IfTwiceWeekly}</dd>

              <dt>3 x week</dt>
              <dd>${IfThriceWeekly}</dd>

              <dt>Garden organics bin:</dt>
              <dd>${OrganicWasteWeek}</dd>


            </dl>


            `;

          layer.bindPopup(popupContent);
        },
      }).addTo(EsriMap);
    })
    .catch(function (error) {
      console.log(error);
    });
}
