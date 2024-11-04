import H from '@here/maps-api-for-javascript'
import {createSignal, onMount, onCleanup, Component, Accessor, Setter, createMemo} from 'solid-js'
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
// You would typically store this in an environment variable
import {Marker, Location, Map} from '../components/Map'
import {A, useNavigate} from '@solidjs/router'
import {currentLocation} from "../dummyData";
import {AiOutlineUnorderedList} from 'solid-icons/ai'
import {startViewTransition} from '../components/VA'

export type MomentoMapMarker = {
  id: number
  lat: number
  lng: number
}
export const MomentoMapView: Component<{momentoMapMarkers: MomentoMapMarker[]}> = (props) => {

  const [markersInfo, setMarkersInfo] = createSignal<Marker[] | undefined>(undefined)
  const navigate = useNavigate()

  onMount(() => {
    setMarkersInfo(props.momentoMapMarkers.map((momento) => {
      return {
        lat: momento.lat,
        lng: momento.lng,
        onclick: () => startViewTransition(() => navigate(`/momento/${momento.id}`))
      }
    }))
  })

  const map = createMemo(() =>

    <Map
      // ready={() => markersInfo() !== undefined}
      currentLocation={currentLocation}
      clusterMarkerInfo={markersInfo()}
      focusLocationButton
    />
  )


  return (
    <>
      {map()}
    </>
  )

}
