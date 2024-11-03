import H from '@here/maps-api-for-javascript'
import {createSignal, onMount, onCleanup, Component, Accessor, Setter} from 'solid-js'
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
// You would typically store this in an environment variable
import {Marker, Location, Map, addCircleToMap} from '../components/Map'
import {A} from '@solidjs/router'
import { currentLocation } from '../dummyData'





export const SettingLocation: Component<{currentLocation: Accessor<Location>}> = (props) => {
  const [map, setMap] = createSignal<H.Map>() as [Accessor<H.Map>, Setter<H.Map>]

  const [selectedMomentoId, setSelectedMomentoId] = createSignal<number | null>(null)
  const [markersInfo, setMarkersInfo] = createSignal<Marker[] | undefined>(undefined)
  let invisibleLink: HTMLAnchorElement
  onMount(()=>{
    setTimeout(()=>
     addCircleToMap(map(), currentLocation(), 'rgba(0, 0, 255, 0.2)'),
     500)
  })




  return (
    <>
      <Map
        // ready={() => markersInfo() !== undefined}
        currentLocation={props.currentLocation}
        setMap={setMap}
        screenCenterMarker={
          <BiRegularCross class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        }
        focusLocationButton
      />

      <A ref={invisibleLink!} href={`/momento/${selectedMomentoId()}`} />
    </>
  )

}
