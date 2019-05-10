#!/usr/bin/env node

const baseURL = "http://drbalek-1.mapy-dev.ko1.os.scif.cz:8081";

const sources = {
    "osm-base": {
        'type': 'vector',
        'tiles': [ baseURL + '/mvt-test-1/{z}-{x}-{y}' ],
        'maxzoom': 18
    },
    "terrain": {
        'tiles': [ baseURL + '/test-terrain-1/{z}-{x}-{y}' ],
        "type": "raster-dem",
        "tileSize": 256,
        'maxzoom': 13
    }
};

const source = "osm-base";

const land = {
    "id": "pevnina",
    "type": "fill",
    "source": source,
    "source-layer": "pevnina",
    "paint": {
        "fill-color": "#f2f1e1",
    }
};

const hillshade = {
    "type": "hillshade",
    "paint": {
        "hillshade-shadow-color": "hsl(39, 21%, 33%)"
    },
    "layout": {
        "visibility": "visible"
    },
    "id": "terrain",
    "source": "terrain"
};

const landcover = [
    {
        "id": "landcover_green_1",
        "type": "fill",
        "source": source,
        "source-layer": "landcover_green_1",
        "paint": {
            "fill-color": "#d0e5b7",
            "fill-opacity": 0.5,
        }
    },
    {
        "id": "landcover_green_2",
        "type": "fill",
        "source": source,
        "source-layer": "landcover_green_2",
        "paint": {
            "fill-color": "#d0e5b7",
            "fill-opacity": 0.5,
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
];

const buildings = [

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
];

const streets = [
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
];

function make_place(layer) {
    return {
        "id": layer,
        "type": "symbol",
        "source": source,
        "source-layer": layer,
        "layout": {
            "symbol-placement": "point",
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
    }
}

const places_layers = [
    "nazvy-sidel-capital-city",
    "nazvy-sidel-low-zoom",
    "nazvy-sidel-town",
    "nazvy-sidel-ostatni",
]

var places = [];

for (const layer of places_layers) {
    places.push(make_place(layer));
}

const layers = [
    {
        "id": "background",
        "type": "background",
        "paint": {
            "background-color": "#8ebddd"
        }
    },

    land,
    hillshade,
    ...landcover,
    ...streets,
    ...buildings,
    ...places,
];

const style = {
    'version': 8,
    'name': 'Basic',
    "center": [11.06539, 49.45176],
    "zoom": 16,
    'sources': sources,
    "glyphs": "./assets/fonts/{fontstack}/{range}.pbf",
    'layers': layers,
};

process.stdout.write(JSON.stringify(style, null, 4));
