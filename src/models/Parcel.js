function Parcel (feature) {
  this.folio = feature.attributes.FOLIO
  this.address = feature.attributes.SITE_ADDR
  this.geometry = feature.geometry
}

Parcel.esriSearchSource = {
  name: 'Folio Number',
  featureLayer: {
    url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/InfoLayers/HC_Parcels/MapServer/0'
  },
  searchFields: ['FOLIO', 'FOLIO_NUMB'],
  displayField: 'FOLIO',
  placeholder: 'Folio Number...',
  outFields: ['FOLIO', 'SITE_ADDR']
}

export default Parcel
