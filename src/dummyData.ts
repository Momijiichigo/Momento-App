import {createSignal} from "solid-js";

export const [currentLocation, setCurrentLocation] = createSignal<string>("");

type MarkerInfo = {
  location: {
    lat: number;
    lng: number;
  },
  url: string;
}


