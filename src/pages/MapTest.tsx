import H from '@here/maps-api-for-javascript'
import {createSignal, onMount, onCleanup, Component, Accessor, Setter} from 'solid-js'
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
// You would typically store this in an environment variable
import {Marker, Location, Map} from '../components/Map'

const markers: Marker[] = [
  {lat: 52.5200, lng: 13.4050, label: '1'},
  {lat: 52.5300, lng: 13.4150, label: '2'},
  {lat: 52.5100, lng: 13.3950, label: '3'},
]



export const MapTest: Component<{currentLocation: Accessor<Location>}> = (props) => {
  const [map, setMap] = createSignal<H.Map>() as [Accessor<H.Map>, Setter<H.Map>]


  return (
    <>
    <Map
    currentLocation={props.currentLocation} 
    clusterMarkerInfo={markers}
    setMap={setMap}
    screenCenterMarker={
      <BiRegularCross class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    }
    focusLocationButton
    />
    </>
  )

}
