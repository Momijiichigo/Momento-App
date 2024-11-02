
import { A } from "@solidjs/router";
import {Component} from "solid-js";

export const DiscoveredPage: Component = () => {
  return (
    <div>
      <h1>Your discovered momentos</h1>
      <A href="/maptest">map test</A>
      <br />
      <A href="/list">ChronoList</A>
      <br />
      <A href="/camera">Camera</A>
    </div>
  );
}
