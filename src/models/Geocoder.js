function Geocoder () {}

Geocoder.esriSearchSource = {
  locator: {
    // url: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
    // url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/Geocoding/DBO_composite_address_locator/GeocodeServer'
    // url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/Geocoding/Composite_Address_Locator_WebApps/GeocodeServer'
    url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/Geocoding/Composite_Address_Locator_Overall/GeocodeServer'
  },
  singleLineFieldName: 'SingleLine',
  name: 'Address',
  placeholder: 'Street Address...',
  minSuggestCharacters: 2
}

export default Geocoder
