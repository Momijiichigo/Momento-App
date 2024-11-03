
import {Component} from "solid-js"
import {cards, dummyMomento} from "../dummyData"
import {ChronoListPage} from "./ChronoList"

export const DiscoveredListPage: Component = () => {
  return <>
    <ChronoListPage discoveredList={false} momentoInfo={dummyMomento} />
  </>
}

