
import {Component} from "solid-js"
import {cards, dummyMomento} from "../dummyData"
import {ChronoListPage} from "./ChronoList"

export const YourMomentoListPage: Component = () => {
  return <>
    <ChronoListPage momentoInfo={dummyMomento} />
  </>
}

