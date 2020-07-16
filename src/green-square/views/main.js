import "./style.css";
import "./layout.html";

import axios from "axios";

export function renderMap(params) {
  console.log("params: ", params);

  window.dataLayer = window.dataLayer || [];

  const map = L.map(params, {
    center: [-33.885, 151.21085],
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

  let basemapLayer = L.esri.basemapLayer("Topographic").addTo(map);
  let results = L.layerGroup().addTo(map);

  let searchControl = L.esri.Geocoding.geosearch({
    providers: [
      L.esri.Geocoding.arcgisOnlineProvider({
        countries: ["AUS"], // search only US, Guan, Virgin Islands and Puerto Rico
        categories: ["Address", "Postal", "Populated Place"], // Don't search POIs
      }),
    ],
  }).addTo(map);

  searchControl.on("results", function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  // Make a request for a user with a given ID
  axios
    .get(
      "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/GreenSquareMask/FeatureServer/0"
    )
    .then(function (response) {
      // handle success
      const data = response.data;
      //console.log(data);

      L.geoJSON(data, {
        style: function (feature) {
          switch (feature.properties.Precinct) {
            case null:
              return {
                fillColor: "#000000",
                color: "#4F4F48",
                opacity: 1,
                fillOpacity: 0.2,
                //className: "label",
                weight: 1.7,
              };
            default:
              return {
                fillColor: "#F2EBA6",
                color: "#4F4F48",
                opacity: 1,
                weight: 1.7,
                fillOpacity: 0.8,
              };
          }
        },
        onEachFeature: function (feature, layer) {
          const label = L.marker(layer.getBounds().getCenter(), {
            icon: L.divIcon({
              className: "label-icon",
              html: feature.properties.Precinct,
            }),
          }).addTo(map);

          let Precinct = feature.properties.Precinct || "";

          let popupContent = `
            <h3 class="mw-popup-heading">${feature.properties.Label}</h3> 

            <p>Parking Permit Eligibility subject to application</p>
            <dl class="mw-popup-list">
              <dt>Area:</dt>
              <dd>${Precinct}</dd>
             
              <dt>Residential:</dt>
              <dd>${feature.properties.ResidentialEligible}</dd>
              <dt>Visitor:</dt>
              <dd>${feature.properties.VisitorEligible}</dd>
              <dt>Business:</dt>
              <dd>${feature.properties.BusinessEligible}</dd>
              
            </dl>
            `;

          layer.bindPopup(popupContent);
        },
      }).addTo(map);
    })
    .catch(function (error) {
      console.log(error);
    });
}
