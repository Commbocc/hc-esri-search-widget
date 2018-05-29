import { loadModules } from 'esri-loader'

export default class SearchResult {
  constructor (data, props) {
    this.userInput = data.userInput
    this.source = data.source
    this.result = props.result || null
    this.error = props.error || null
  }

  hasFeature () {
    return (this.result && this.result.feature) ? true : false
  }

  queryFeatures (url, queryParams) {
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
