import H from '@here/maps-api-for-javascript'
import {createSignal, onMount, onCleanup, Component, Accessor, Setter} from 'solid-js'
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
// You would typically store this in an environment variable
import {Marker, Location, Map, addCircleToMap} from '../components/Map'
import {A} from '@solidjs/router'





export const MapTest: Component<{currentLocation: Accessor<Location>}> = (props) => {
  const [map, setMap] = createSignal<H.Map>() as [Accessor<H.Map>, Setter<H.Map>]

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

    setMarkersInfo([
      {lat: 52.5200, lng: 13.4050, onclick: () => showMomentoPage(0)},
      {lat: 52.5300, lng: 13.4150, onclick: () => showMomentoPage(1)},
      {lat: 52.5100, lng: 13.3950, onclick: () => showMomentoPage(4)},
    ])
    console.log(map());
      
    //   addCircleToMap(map(), props.currentLocation())
    setTimeout(()=> map().addObject(new H.map.Circle(
        // The central point of the circle
        props.currentLocation(),
        // The radius of the circle in meters
        1000,
        {
          data: null,
          style: new H.map.SpatialStyle({
            strokeColor: 'rgba(0, 0, 0, 0)', // Color of the perimeter
            lineWidth: 2,
            fillColor: 'rgba(0, 0, 255, 0.2)'
          })
        }
    
      )),
      500)
    ;
  })


  return (
    <>
      <Map
        // ready={() => markersInfo() !== undefined}
        currentLocation={props.currentLocation}
        clusterMarkerInfo={markersInfo()}
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
