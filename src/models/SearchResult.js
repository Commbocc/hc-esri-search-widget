import { loadModules } from 'esri-loader'

function SearchResult (data, props) {
  this.userInput = data.userInput
  this.source = data.source
  this.result = props.result || null
  this.error = props.error || null

  this.hasFeature = function () {
    return (this.result && this.result.feature) ? true : false
  }

  this.queryFeatures = function (url, queryParams) {
    return loadModules([
      'esri/layers/FeatureLayer'
    ]).then(([FeatureLayer]) => {
      let fl = new FeatureLayer({ url })

      let params = Object.assign({
        returnGeometry: false,
        outFields: ['*'],
        geometry: this.result.feature.geometry
      }, queryParams)

      return fl.queryFeatures(params).then(result => {
        return (result.features.length) ? result.features[0] : null
      })
    }).catch(err => false)
  }
}

export default SearchResult
