# [Mapbox GL](https://www.mapbox.com/mapbox-gl/) Code Flow Example

This repository is a simple example of a development environment for Mapbox GL
styles that is based on editing raw code with a text editor. This style
of editing is similar to [TileMill](https://www.mapbox.com/tilemill/)
or the [Mapbox Studio](https://www.mapbox.com/mapbox-studio/) desktop
tools.

This example is based on [Gulp](http://gulpjs.com/) as a framework for its
basic utilities:

* A [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/)-powered page for
  previewing the style
* You can also specify an executable JavaScript file with a `.js` extension
  and hashbang and the file will be run and its output piped into the style
  definition.
* Live-reloading when the style is changed

## Install

First, clone this git repository:

    git clone https://github.com/mapbox/mapbox-gl-codeflow-example.git
    cd mapbox-gl-codeflow-example

And then install the dependencies:

    npm install

And then start up:

    gulp --style=style.json

You can also specify `style.json5`, `style.yml`, or `style.toml` as your
inputs. Unlike JSON, these alternative formats support commenting, so you
can annotate your styles. Note that this is a one-way conversion, like the conversion
from [CartoCSS](https://www.mapbox.com/tilemill/docs/manual/carto/)
to [Mapnik XML](https://github.com/mapnik/mapnik/wiki/XMLConfigReference)
was.

## Update

### Generate new `style_spec.js`

```sh
browserify ./src/style-spec/validate_style.js --standalone validate > ../mapbox-gl-style-editor/app/mapbox-gl/style_spec.js
```

### Generate font

Using https://github.com/sabas/genfontgl

```sh
./index.js font.ttf output-dir
```
