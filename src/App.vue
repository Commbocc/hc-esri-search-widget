<template>
  <div id="app">

    <form is="HcEsriSearchWidget" ref="search" @submit="reset" @result="handleResult" :search-sources="searchSources" :load-map="false" :show-map="false"></form>

    <details open class="my-3">
      <summary>Data</summary>
      <pre class="bg-dark text-light p-2">{{ $data }}</pre>
    </details>

  </div>
</template>

<script>
import HcEsriSearchWidget, { Geocoder, Parcel } from './main'

export default {
  name: 'app',
  components: { HcEsriSearchWidget },
  data () {
    return {
      searchResult: null,
      parcel: null,
      errors: []
    }
  },
  methods: {
    reset (e) {
      this.searchResult = null
      this.parcel = null
      this.errors = []
    },
    handleResult (result) {
      this.searchResult = result
      if (this.searchResult.error) {
        this.errors.push(this.searchResult.error)
      } else if (this.searchResult.hasFeature()) {
        this.$refs.search.isSearching = true
        this.findParcel().then(() => {
          this.$refs.search.status = null
          this.$refs.search.isSearching = false
        })
      }
    },
    findParcel () {
      this.$refs.search.status = 'Finding Parcel...'
      return Parcel.findByGeometry(this.searchResult.result.feature.geometry).then(parcel => {
        this.parcel = parcel
      }).catch(err => {
        console.error(err)
        this.errors.push('A parcel could not be determined.')
      })
    }
  },
  computed: {
    searchSources () {
      // return [Geocoder.esriSearchSource, Parcel.esriSearchSource]
      return [Geocoder.esriSearchSource]
    }
  }
}
</script>
