# widgets-maps-js

A lightweight JS script to embed maps into pages.

https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/Green_Square_Development_Areas/FeatureServer/0/query

where 1=1

Out Fields: \*

Format: geojson

Output Spatial Reference: 4326

here is another example https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/Waste_Service_Day/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=

we can query data from any feature layer

https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services

Parse a feature collection contained in a webmap to GeoJSON.
https://esri.github.io/esri-leaflet/examples/parse-feature-collection.html

## Embeddable JS Map Widgets

### Install dependencies

```sh
$ npm install
```

### Start the development server

```sh
$ npm start
... server running at http://localhost:9000/
```

### Production build

```
$ npm run build
... create files in /dist
```

## Create a widget

1. Add a new component folder
2. Follow some file structer as `widget-starter` example.
   - index.js - entry point
   - main.js - main app
   - css - styling
   - layout - html markup
3. Duplicate the webpack module object for new component
