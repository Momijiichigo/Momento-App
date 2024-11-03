import H from '@here/maps-api-for-javascript'
import { createSignal, onMount, onCleanup, Component, Accessor } from 'solid-js'
import { Portal } from 'solid-js/web'
import { BiRegularCross, BiRegularLocationPlus, BiSolidNavigation } from 'solid-icons/bi'
import { FaSolidMapLocationDot, FaSolidBookOpen } from 'solid-icons/fa'
import { AiOutlineSetting } from 'solid-icons/ai'
import { currentLocation } from '../dummyData'
import {A} from '@solidjs/router'
// You would typically store this in an environment variable
const API_KEY = import.meta.env.VITE_HERE_API_KEY
// const API_KEY = ""
console.log(API_KEY)
// Sample data for markers
type Marker = {
    lat: number
    lng: number
    label: string
    url: string
}
type Location = {
    lat: number
    lng: number
}

const markers: Marker[] = [
    { lat: 52.5200, lng: 13.4050, label: '1', url: 'https://example.com/marker1' },
    { lat: 52.5300, lng: 13.4150, label: '2', url: 'https://example.com/marker2' },
    { lat: 52.5100, lng: 13.3950, label: '3', url: 'https://example.com/marker3' },
]

// Simple NavLink component to simulate routing
const NavLink: Component<{ href: string; children: any }> = (props) => {
    const [isActive, setIsActive] = createSignal(false)

    const handleClick = (e: Event) => {
        e.preventDefault()
        setIsActive(true)
        // In a real app, you'd use a router to navigate here
        console.log(`Navigating to ${props.href}`)
    }

    return (
        <A
            href={props.href}
            class={`flex flex-col items-center ${isActive() ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`}
            onClick={handleClick}
        >
            {props.children}
        </A>
    )
}

// Function to initialize clustering
const startClustering = (map: H.Map, markerData: Marker[]) => {
    // Convert marker data into DataPoints for clustering
    const dataPoints = markerData.map(({ lat, lng }) => new H.clustering.DataPoint(lat, lng))

    // Create a clustering provider with options
    const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
        clusteringOptions: {
            eps: 32, // Maximum radius of the neighbourhood
            minWeight: 2, // Minimum weight of points to form a cluster
        }
    })

    // Create a layer to consume objects from the clustering provider
    const clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider)

    // Add the clustering layer to the map
    map.addLayer(clusteringLayer)
}

/**
 * Moves the map to display over Berlin
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
export const showMyCurrentLocation = (map: H.Map, location: Location) => {
    console.log(location);
    if (map) {
        // Set the zoom level
        map.setZoom(14)
        // Center the map on the given location
        map.setCenter(location, true)


        // Remove any existing objects (like markers) from the map
        map.removeObjects(map.getObjects())

        // Add a new marker at the specified location
        const marker = new H.map.Marker(location)
        map.addObject(marker)
    }
}

export const getLocationOfPin = (map: H.Map) => {
    // The pin is always at the center of the screen
    const pinLocation = map.getCenter()
    console.log(pinLocation)
}

/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
export const addCircleToMap = (map: H.Map) => {
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
                fillColor: 'rgba(0, 0, 255, 0.2)'
            })
        }

    ));
}


export const MapTest: Component<{ currentLocation: Accessor<Location> }> = (props) => {
    let mapRef: HTMLDivElement;
    let map: H.Map;

    onMount(() => {
        // Check if the map has already been initialized
        if (!map) {
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
            // add a marker of my current location
            const marker = new H.map.Marker(props.currentLocation())
            map.addObject(marker)

            // Add a resize listener to make sure the map occupies the whole container
            window.addEventListener('resize', () => map.getViewPort().resize())

            // Make the map interactive
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

            // Create the default UI components
            const ui = H.ui.UI.createDefault(map, defaultLayers)

            // Initialize clustering with the marker data
            startClustering(map, markers)
            addCircleToMap(map)
        }
    })

    return (
        <div class="h-screen w-full flex flex-col">
            <button class="fixed bottom-20 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg z-50"
                onClick={() => showMyCurrentLocation(map, props.currentLocation())}>
                <BiSolidNavigation class="w-6 h-6" />
            </button>
            {/* <button
                class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => showMyCurrentLocation(map, props.currentLocation())}
            >
                Show My Location
            </button> */}
            <button
                class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => getLocationOfPin(map)}
            >
                pin location
            </button>
            <main class="flex-grow">
                <div ref={mapRef!} class="w-full h-full" />
            </main>
            <BiRegularCross class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
    )

}
