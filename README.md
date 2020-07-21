# widgets-maps-js

A lightweight JS script to embed maps into pages.

We need to doc how we use the esri maps
ID

How do we take a GIS map and gt thae data we need.

https://services1.arcgis.com/cNVyNtjGVZybOQWZ/ArcGIS/rest/services

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
