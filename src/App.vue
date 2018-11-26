<script>
import SearchWidget from './components/SearchWidget'
import Geocoder from './models/Geocoder'
import Parcel from './models/Parcel'
import VuexModule from './store/modules/search'

export default {
  extends: SearchWidget,
  Geocoder,
  Parcel,
  VuexModule
}
</script>

<!-- <style src="./assets/main.scss" lang="scss"> -->
