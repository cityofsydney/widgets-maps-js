const leaflet = [
  "https://unpkg.com/leaflet@1.6.0/dist/leaflet.js",
  "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
];

const leafletAjax = [
  "https://unpkg.com/leaflet-ajax@2.1.0/dist/leaflet.ajax.min.js"
];

/* Load Esri Leaflet from CDN */
const esriLeaflet = [
  "https://unpkg.com/esri-leaflet@2.3.3/dist/esri-leaflet.js"
];
/* https://github.com/Leaflet/Leaflet.label */
const leafletLabel = [
  "https://unpkg.com/leaflet-label@0.2.1-0/dist/leaflet.label.js",
  "https://unpkg.com/leaflet-label@0.2.1-0/dist/leaflet.label.css"
];

/* Load Esri Leaflet Geocoder from CDN */
/* The Esri Leaflet Geocoder is a small series of API helpers and UI controls to interact with the ArcGIS Online geocoding services. https://github.com/Esri/esri-leaflet-geocoder */
const esriLeafletGeocoder = [
  "https://unpkg.com/esri-leaflet-geocoder@2.3.2/dist/esri-leaflet-geocoder.css",
  "https://unpkg.com/esri-leaflet-geocoder@2.3.2/dist/esri-leaflet-geocoder.js"
];

/*  https://esri.github.io/esri-leaflet/examples/clustering-feature-layers.html  */
const markercluster = [
  "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css",
  "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css",
  "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js",
  "https://unpkg.com/esri-leaflet-cluster@2.0.1/dist/esri-leaflet-cluster.js"
];


const gesturehandling = [
  "https://unpkg.com/leaflet-gesture-handling@1.1.8/dist/leaflet-gesture-handling.min.css",
  "https://unpkg.com/leaflet-gesture-handling@1.1.8/dist/leaflet-gesture-handling.min.js"
];

export default {
  leaflet,
  leafletAjax,
  esriLeaflet,
  esriLeafletGeocoder,
  markercluster,
  leafletLabel,
  gesturehandling
};
