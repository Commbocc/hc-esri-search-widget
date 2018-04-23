import { loadModules } from 'esri-loader'

export default class Parcel {
  constructor (feature) {
    this.folio = feature.attributes.FOLIO
    this.address = feature.attributes.SITE_ADDR
    this.geometry = feature.geometry
  }

  static get esriSearchSource () {
    return {
      name: 'Folio Number',
      featureLayer: {
        url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/InfoLayers/HC_Parcels/MapServer/0'
      },
      searchFields: ['FOLIO', 'FOLIO_NUMB'],
      displayField: 'FOLIO',
      placeholder: 'Folio Number...',
      outFields: ['FOLIO', 'SITE_ADDR']
    }
  }

  static findByGeometry (geometry, returnGeometry = false) {
    return loadModules([
      'esri/layers/FeatureLayer',
      'esri/tasks/support/Query'
    ]).then(([FeatureLayer, Query]) => {
      let layer = new FeatureLayer({
        url: this.esriSearchSource.featureLayer.url
      })

      let query = new Query()
      query.outFields = this.esriSearchSource.outFields
      query.geometry = geometry
      query.returnGeometry = returnGeometry

      return layer.queryFeatures(query).then(response => {
        if (response.features.length) {
          return new this(response.features[0])
        } else {
          throw 'A parcel could not be found.'
        }
      })
    })
  }
}
