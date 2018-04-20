# Hillsborough County Esri Search Widget

> A Vue.js project

## Installation

Install in browser or via NPM.

### CDN (Browser)

```html
<div id="app">
  <form is="HcEsriSearchWidget" @submit="reset" @result="handleResult"></form>
  <pre>{{ searchResult }}</pre>
</div>

<!-- include babel-polyfill for IE11 Promise support -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"></script> -->
<!-- include Vue -->
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<!-- set HcEsriSearchWidget Vue component -->
<script src="https://commbocc.github.io/hc-esri-search-widget/dist/build.js"></script>

<script type="text/javascript">
// compile with babel repl for IE11
var app = new Vue({
  el: '#app',
  components: { HcEsriSearchWidget },
  data() {
    return {
      searchResult: null
    }
  },
  methods: {
    reset(e) {
      this.searchResult = null
    },
    handleResult(result) {
      this.searchResult = result
    }
  }
})
</script>
```

### NPM

`npm i --save https://github.com/Commbocc/hc-esri-search-widget`

Example [Single File Component](https://vuejs.org/v2/guide/single-file-components.html)

```html
<!-- App.vue -->
<template>
  <main>
    <form is="HcEsriSearchWidget" @submit="reset" @result="handleResult"></form>
  </main>
</template>

<script>
import HcEsriSearchWidget from 'hc-esri-search-widget'

export default {
  // ...
  components: {
    HcEsriSearchWidget
  },
  methods: {
    reset (e) {/*...*/},
    handleResult (result) {/*...*/}
  }
  // ...
}
</script>
```

## Customizations

The `HcEsriSearchWidget` component accepts the following properties as options:

* `:load-map` Boolean
* `:show-map` Boolean
* `:search-sources` Array of [sources](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#sources)

The default values are shown below:

```html
<form is="HcEsriSearchWidget"
:load-map="false"
:show-map="false"
:search-sources="[Geocoder.esriSearchSource]"></form>
```

The map must be loaded if using a [Feature Layer](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#FeatureLayerSource) as a search source.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
