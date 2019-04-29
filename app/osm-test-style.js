#!/usr/bin/env node

//var chroma = require('chroma-js');

//var WATER_COLOR = '#ace';
//var BACKGROUND = chroma(WATER_COLOR).darken().hex();

var source = "osm-base";

var style = {
    'version': 8,
    'name': 'Basic',

    "center": [11.06539, 49.45176],
    //"pitch": 60,
    "zoom": 16,

    'sources': {
        'osm-base': {
            'type': 'vector',
            'tiles': [ 'http://drbalek-1.mapy-dev.ko1.os.scif.cz:8081/mvt-test-1/{z}-{x}-{y}' ],
            'maxzoom': 18
        }
    },

    //'sprite': '',
    //'glyphs': '',
    "glyphs": "./assets/fonts/{fontstack}/{range}.pbf",

    'layers': [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "#f2f1e1"
            }
        },

        {
            "id": "landcover_green_1",
            "type": "fill",
            "source": source,
            "source-layer": "landcover_green_1",
            "paint": {
                "fill-color": "#d0e5b7"
            }
        },

        {
            "id": "landcover_green_2",
            "type": "fill",
            "source": source,
            "source-layer": "landcover_green_2",
            "paint": {
                "fill-color": "#d0e5b7"
            }
        },

        {
            "id": "water_areas_8-18",
            "type": "fill",
            "source": source,
            "source-layer": "water_areas_8-18",
            "paint": {
                "fill-color": "#8ebddd"
            }
        },

        {
            "id": "landcover_civic",
            "type": "fill",
            "source": source,
            "source-layer": "landcover_civic",
            "paint": {
                "fill-color": "#e5d9b7"
            }
        },

        {
            "id": "asfalt",
            "type": "fill",
            "source": source,
            "source-layer": "asfalt-casing",
            "paint": {
                "fill-color": "lightgray"
            }
        },

        {
            "type": "line",
            "source": source,
            "source-layer": "3tridy-atd-casing",
            "id": "3tridy-atd-casing",
            "paint": {
                "line-color": "gray",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [ 4, 0.25 ],
                        [ 20, 80 ]
                    ]
                }
            },
        },

        {
            "type": "line",
            "source": source,
            "source-layer": "2tridy-casing",
            "id": "2tridy-casing",
            "paint": {
                "line-color": "gray",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [ 4, 0.25 ],
                        [ 20, 80 ]
                    ]
                }
            },
        },

        {
            "type": "line",
            "source": source,
            "source-layer": "3tridy-atd-casing",
            "id": "3tridy",
            "paint": {
                "line-color": "white",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [ 4, 0.2 ],
                        [ 20, 78 ]
                    ]
                }
            },
        },

        {
            "type": "line",
            "source": source,
            "source-layer": "2tridy-casing",
            "id": "2tridy",
            "paint": {
                "line-color": "yellow",
                "line-width": {
                    "base": 1.55,
                    "stops": [
                        [ 4, 0.2 ],
                        [ 20, 78 ]
                    ]
                }
            },
        },

        {
            "id": "nazvy-ulic-base",
            "type": "symbol",
            "source": source,
            "source-layer": "nazvy-ulic-base",
            "layout": {
                "symbol-placement": "line",
                "text-allow-overlap": false,
                "text-ignore-placement": false,
                "text-field": "{name}",
                "text-size": 14,
                "text-font": [
                    "DejaVuSans",
                ]
            },
            "paint": {
                "text-halo-width": 2,
                "text-halo-color": "white"
            }
        },

        {
            "id": "buildings",
            "type": "fill-extrusion",
            "source": source,
            "source-layer": "buildings",
            "paint": {
                "fill-extrusion-height": 10,
                "fill-extrusion-color": "gray"
            }
        },

        {
            "id": "buildings-historicke",
            "type": "fill-extrusion",
            "source": source,
            "source-layer": "budovy-ruzove-historicke",
            "paint": {
                "fill-extrusion-height": 10,
                "fill-extrusion-color": "sienna"
            }
        },

    ]
};

process.stdout.write(JSON.stringify(style, null, 4));
