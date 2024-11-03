import {createSignal} from "solid-js";
export const [currentLocation, setCurrentLocation] = createSignal<{
  lat: number;
  lng: number;
}>({ lat: 52.51229, lng: 13.40048 });

