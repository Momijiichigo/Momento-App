import {Component} from "solid-js";
import {ChronoListPage} from "./ChronoList";

import {dummyMomento} from "../dummyData";
import {Map, Marker} from "../components/Map";
import {momentoMapMarkers} from '../dummyData'
import {MomentoMapView} from "./MomentoMapView";
import {A} from "@solidjs/router";
import {AiOutlineUnorderedList} from "solid-icons/ai";
export const YourMomentoPage: Component = () => {
  return (<>
    <MomentoMapView momentoMapMarkers={momentoMapMarkers} />

      {/* floating button on the up right corner */}
      <A href="/your-momento-list" class="absolute z-40 top-4 right-4 bg-white p-2 rounded-full shadow-md">
        <AiOutlineUnorderedList class="w-8 h-8" />
      </A>

  </>);
}
