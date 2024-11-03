import H from '@here/maps-api-for-javascript'
import {createSignal, onMount, onCleanup, Component, Accessor, Setter} from 'solid-js'
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
// You would typically store this in an environment variable
import {Marker, Location, Map} from '../components/Map'
import {A} from '@solidjs/router'
import {currentLocation} from "../dummyData";
import {AiOutlineUnorderedList} from 'solid-icons/ai'

export type MomentoMapMarker = {
  id: number
  lat: number
  lng: number
}
export const MomentoMapView: Component<{momentoMapMarkers: MomentoMapMarker[]}> = (props) => {

  const [selectedMomentoId, setSelectedMomentoId] = createSignal<number | null>(null)
  const [markersInfo, setMarkersInfo] = createSignal<Marker[] | undefined>(undefined)
  let invisibleLink: HTMLAnchorElement

  onMount(() => {
    const showMomentoPage = (id: number) => {
      console.log('showing momento page', id)
      setSelectedMomentoId(id)
      /** @ts-ignore */
      invisibleLink!.click()
    }

    setMarkersInfo(props.momentoMapMarkers.map((momento) => {
      return {
        lat: momento.lat,
        lng: momento.lng,
        onclick: () => showMomentoPage(momento.id)
      }
    }))
  })


  return (
    <>
      <Map
        // ready={() => markersInfo() !== undefined}
        currentLocation={currentLocation}
        clusterMarkerInfo={markersInfo()}
        focusLocationButton
      />

      <A ref={invisibleLink!} href={`/momento/${selectedMomentoId()}`} />
    </>
  )

}
