<template>
  <div class="map-container">
    <div class="map" v-if="loaded" />
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { equals } from 'ramda'
import config from '@/config'
import { load, sleep } from '@/utils'

export default {
  name: 'google-map',
  props: {
    markers: {
      type: Array
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false,
      marker_instances: [],
      old_markers: null
    }
  },
  watch: {
    markers(new_markers) {
      if (this.loaded) {
        if (!equals(this.old_markers, new_markers)) {
          this.setMarkers()
        }
      }
    }
  },
  async mounted() {
    await load(`https://maps.googleapis.com/maps/api/js?key=${config.google_api_key}&libraries=places`, 'google')
    this.loaded = true
    await this.$nextTick()
    const element = this.$el.querySelector('.map')
    const options = {
      zoom: 1,
      mapTypeControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
      center: new window.google.maps.LatLng(51.501527, -0.1921837)
    }
    this.map = new window.google.maps.Map(element, options)
    this.service = new window.google.maps.places.PlacesService(this.map)
    this.setMarkers()
  },
  methods: {
    setMarkers() {
      this.clearMarkers()
      this.old_markers = this.markers
      this.bounds = new window.google.maps.LatLngBounds()
      this.markers.map(place => {
        if (place.place_id) {
          this.service && this.service.getDetails({
            placeId: place.place_id
          }, this.setMarkerByPlace.bind(this, place))
        } else if (place.geometry) {
          this.setMarkerByLatLng(place)
        }
      })
    },
    async setMarkerByLatLng(place) {
      const marker = new window.google.maps.Marker({
        map: this.map,
        position: new window.google.maps.LatLng(
          place.geometry.location.lat,
          place.geometry.location.lng
        )
      })
      this.marker_instances.push(marker)
      this.bounds.extend(place.geometry.location)
      this.map.fitBounds(this.bounds)
      await sleep(100)
      if (this.markers.length === 1) {
        this.map.setZoom(14)
      }
    },
    setMarkerByPlace(place, result, status) {
      if (!result) return
      const marker = new window.google.maps.Marker({
        map: this.map,
        place: {
          placeId: result.place_id,
          location: result.geometry.location
        }
      })
      if (this.clickable) {
        marker.addListener('click', () => {
          this.$router.push(`/${place.type}/${place.id}`)
        })
      }
      this.marker_instances.push(marker)
      this.bounds.extend(result.geometry.location)
      this.map.fitBounds(this.bounds)
      if (this.markers.length === 1) {
        this.map.setZoom(16)
      }
    },
    clearMarkers() {
      this.marker_instances.map(marker => {
        marker.setMap(null)
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.map-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin: 0 auto 20px;
  background: gray;

  .map {
    height: inherit;
    width: inherit;
  }
}
</style>
