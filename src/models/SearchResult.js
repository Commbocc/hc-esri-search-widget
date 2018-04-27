import { loadModules } from 'esri-loader'

function SearchResult (data, props) {
  this.userInput = data.userInput
  this.source = data.source
  this.result = props.result || null
  this.error = props.error || null

  this.hasFeature = function () {
    return (this.result && this.result.feature) ? true : false
  }

  this.queryFeatures = function (url) {
    return loadModules([
      'esri/layers/FeatureLayer',
      'esri/tasks/support/Query'
    ]).then(([FeatureLayer, Query]) => {
      let fl = new FeatureLayer({ url })

      let query = new Query({
        returnGeometry: false,
        outFields: ['*'],
        geometry: this.result.feature.geometry
      })

      return fl.queryFeatures(query).then(result => {
        return (result.features.length) ? result.features[0] : null
      })
    }).catch(err => false)
  }
}

export default SearchResult
