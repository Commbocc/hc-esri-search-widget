<template lang="html">
  <form @submit.prevent="search" action="#" id="searchWidgetForm">

    <!-- source selector -->
    <div v-if="searchSources.length > 1" class="form-group mb-1">
      <div class="font-weight-bold">Search by:</div>
      <div v-for="(source, sourceIndex) in searchSources" class="form-check form-check-inline">
        <input v-model="selectedSourceIndex" class="form-check-input" type="radio" name="searchSources" :id="`radio${sourceIndex}`" :value="sourceIndex">
        <label class="form-check-label" :for="`radio${sourceIndex}`">{{ source.name }}</label>
      </div>
    </div>

    <div class="form-group mb-2">
      <div class="input-group input-group-lg">
        <!-- user input -->
        <input v-model="userInput" @keyup="makeSuggestions" :placeholder="placeholder" id="searchWidget" list="suggestions" class="form-control data-hj-whitelist" autocomplete="off" required></input>

        <!-- suggestions -->
        <datalist id="suggestions">
          <option v-for="(s, index) in suggestions" :value="s.text" :key="index" />
        </datalist>

        <!-- submit button -->
        <span class="input-group-append input-group-btn">
          <button class="btn text-white" :class="btnClass" type="submit">
            <i :class="btnIcon"></i>
            <span class="d-none d-sm-inline-block">
              {{ btnText }}
            </span>
          </button>
        </span>
      </div>

      <!-- status -->
      <div id="status" class="small form-text text-muted">
        {{ status }}
        &nbsp;
      </div>
    </div>

    <!-- map -->
    <div v-if="loadMap" ref="map" is="EsriPortalMap" :class="mapClass"></div>

  </form>
</template>

<script>
import { loadModules } from 'esri-loader'
import EsriPortalMap from 'esri-portal-map'
import Geocoder from '../models/Geocoder'
import debounce from 'lodash.debounce'

export default {
  components: { EsriPortalMap },
  props: {
    loadMap: {
      type: Boolean,
      default: false
    },
    showMap: {
      type: Boolean,
      default: false
    },
    searchSources: {
      type: Array,
      default: () => [Geocoder.esriSearchSource]
    }
  },
  data () {
    return {
      userInput: '',
      status: null,
      searchResult: {},
      searchWidget: null,
      isSearching: false,
      selectedSourceIndex: 0,
      allSuggestions: []
    }
  },
  mounted () {
    this.initSearchWidget().then(widget => {
      this.searchWidget = widget
      this.searchWidget.sources = this.searchSources

      if (this.loadMap) {
        this.$refs.map.mapview.when(mapview => {
          this.searchWidget.view = mapview
        })
      }

      // // TODO: when suggestion selected datalist should trigger the widget's select event
      // this.searchWidget.on('select-result', event => {
      //   console.log('Results of select-result: ', event)
      //   try {
      //     this.setSearchResult({ result: event.result })
      //   } catch (error) {
      //     this.setSearchResult({ error })
      //   }
      // })
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    search (e) {
      this.$emit('submit', e)
      this.isSearching = true
      this.status = 'Searching...'

      this.searchWidget.search(this.userInput).then(event => {
        if (!event || !event.results || !event.results[this.selectedSourceIndex] || !event.results[this.selectedSourceIndex].results) {
          throw new Error('An error has occured with the geolocation service. Please try again at a later time.')
        } else if (event.results[this.selectedSourceIndex].results.length) {
          this.setSearchResult({
            result: event.results[this.selectedSourceIndex].results[0]
          })
        } else {
          throw new Error('No search results were found. Is your search term formatted correctly?')
        }
      }).catch(error => {
        this.setSearchResult({ error })
      }).then(() => {
        this.isSearching = false
        this.status = null
        this.$emit('result', this.searchResult)
      })
    },
    setSearchResult (props = {}) {
      this.searchResult = Object.assign({
        userInput: this.userInput,
        source: this.searchSources[this.selectedSourceIndex],
        hasFeature: function () {
          return (this.result && this.result.feature) ? true : false
        }
      }, props)
    },
    makeSuggestions: debounce(function(e) {
      if (this.userInput.length) {
        this.searchWidget.suggest(this.userInput).then(event => {
          this.allSuggestions = this.searchWidget.suggestions || []
        })
      }
    }, 300),
    initSearchWidget () {
      return loadModules([
        'esri/widgets/Search'
      ]).then(([Search]) => {
        return new Search({
          container: 'searchWidget'
        })
      })
    }
  },
  computed: {
    btnText () {
      // return (this.isSearching) ? 'Loading' : 'Find'
      return 'Find'
    },
    btnClass () {
      return (this.isSearching) ? 'btn-warning' : 'btn-secondary'
    },
    btnIcon () {
      return (this.isSearching) ? 'fa fa-fw fa-spinner fa-spin' : 'fa fa-fw fa-search'
    },
    placeholder () {
      return this.searchSources[this.selectedSourceIndex].placeholder
    },
    suggestions () {
      if (this.allSuggestions.length) {
        return this.allSuggestions[this.selectedSourceIndex].results
      } else {
        return []
      }
    },
    mapClass () {
      return (this.loadMap && this.showMap) ? null : 'hide-map'
    }
  }
}
</script>

<style>
.hide-map {
  height: 1px;
  margin-top: -15px;
  margin-bottom: 0 !important;
}
</style>
