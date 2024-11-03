import H from '@here/maps-api-for-javascript'
import {createSignal, onMount, onCleanup, Component, Accessor, JSX, Setter, Show} from 'solid-js'
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
import {currentLocation} from '../dummyData'
import {A} from '@solidjs/router'
// You would typically store this in an environment variable
const API_KEY = import.meta.env.VITE_HERE_API_KEY
// Sample data for markers
export type Marker = {
  lat: number
  lng: number
  onclick?: () => void
}
export type Location = {
  lat: number
  lng: number
}

// Function to initialize clustering
export const startClustering = (map: H.Map, markerData: Marker[]) => {
  // Convert marker data into DataPoints for clustering
  const dataPoints = markerData.map(({lat, lng, onclick}) => new H.clustering.DataPoint(lat, lng, undefined, {onclick: onclick}))

  // Create a clustering provider with options
  const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
    clusteringOptions: {
      eps: 32, // Maximum radius of the neighbourhood
      minWeight: 2, // Minimum weight of points to form a cluster
    }
  })

  // Create a layer to consume objects from the clustering provider
  const clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider)

  // when a cluster is clicked and the number is not 1, zoom in
  clusteredDataProvider.addEventListener('tap', (e: any) => {
    if (e.target instanceof H.map.Marker) {
      // const {data} = e.target
      if (e.target.data.getData) {
        // get the marker's onclick function and call it
        e.target.getData().getData().onclick?.()
      } else {
        map.setCenter(e.target.data.getPosition(), true)
        setTimeout(() => map.setZoom(map.getZoom() + 1, true), 300)
      }
    }
  })

  // Add the clustering layer to the map
  map.addLayer(clusteringLayer)
}

/**
 * Moves the map and zoom to the specified location
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
export const focusLocation = (map: H.Map, location: Location, zoom = 14) => {
  console.log(location);
  if (map) {
    // Set the zoom level
    map.setZoom(zoom)
    // Center the map on the given location
    map.setCenter(location, true)


    // Remove any existing objects (like markers) from the map
    map.removeObjects(map.getObjects())

    // Add a new marker at the specified location
    const marker = new H.map.Marker(location)
    map.addObject(marker)
  }
}

/**
 * Adds a circle to the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
export const addCircleToMap = (map: H.Map, color: string = 'rgba(0, 0, 255, 0.2)') => {
  map.addObject(new H.map.Circle(
    // The central point of the circle
    currentLocation(),
    // The radius of the circle in meters
    1000,
    {
      data: null,
      style: new H.map.SpatialStyle({
        strokeColor: 'rgba(0, 0, 0, 0)', // Color of the perimeter
        lineWidth: 2,
        fillColor: color
      })
    }

  ));
}

export type MapProps = {
  currentLocation: Accessor<Location>,
  setMap?: Setter<H.Map>,
  clusterMarkerInfo?: Marker[],
  screenCenterMarker?: JSX.Element
  focusLocationButton?: boolean
  ready?: Accessor<boolean>


}

export const Map: Component<MapProps> = (props) => {
  let mapRef: HTMLDivElement;
  let map: H.Map;

  onMount(() => {
    // Check if the map has already been initialized
    if (!map) {
      if (props.ready && !props.ready()) {
        return
      }
      // Initialize the Platform object
      const platform = new H.service.Platform({
        apikey: API_KEY
      })

      // Get the default map types from the platform object
      const defaultLayers = platform.createDefaultLayers()

      // Instantiate the map
      map = new H.Map(
        mapRef,
        /**@ts-ignore */
        defaultLayers.vector!.normal.map,
        {
          center: props.currentLocation(),
          zoom: 12,
          pixelRatio: window.devicePixelRatio || 1
        }
      )
      props.setMap?.(map)

      // add a marker of my current location
      const marker = new H.map.Marker(props.currentLocation())
      map.addObject(marker)

      // Add a resize listener to make sure the map occupies the whole container
      window.addEventListener('resize', () => map.getViewPort().resize())

      // Make the map interactive
      const _behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

      // Create the default UI components
      // const ui = H.ui.UI.createDefault(map, defaultLayers)

      // Initialize clustering with the marker data
      if ("clusterMarkerInfo" in props) {
        startClustering(map, props.clusterMarkerInfo!)
      }
    }
  })

  return (
    <Show when={!(props.ready && !props.ready())} fallback={<div />}>
      <div class="h-screen w-full flex flex-col">
        {props.focusLocationButton && <button class="fixed bottom-20 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg z-50"
          onClick={() => focusLocation(map, props.currentLocation())}>
          <BiSolidNavigation class="w-6 h-6" />
        </button>
        }
        <main class="flex-grow">
          <div ref={mapRef!} class="w-full h-full" />
        </main>
        {props.screenCenterMarker}
      </div>

    </Show>
  )

}
