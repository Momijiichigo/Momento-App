import {A} from "@solidjs/router";
import {Component} from "solid-js";

export const Home: Component = () => {
  return (
    <div>
      <h1>Your discovered momentos</h1>
      <A href="/discovered">Discovered</A>
      <br />
      <A href="/login">Login</A>
      <br />
      <A href="/maptest">map test</A>
      <br />
      <A href="/list">ChronoList</A>
      <br />
      <A href="/camera">Camera</A>
      <br />
      <A href="/momento/0">Momento</A>
      <br />
      <A href="/search">search</A>
      <br />
      <A href="/account">account</A>
      <br />
      <A href="/NewMomento">NewMomento</A>
      <br />
      <A href="/settinglocation">setting location</A>
      
    </div>
  );
}
