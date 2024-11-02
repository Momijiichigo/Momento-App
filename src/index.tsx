/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import {Route, Router} from "@solidjs/router";
import {Home} from "./pages/Home";
import {DiscoveredPage} from "./pages/Discovered";
import { MapTest } from "./pages/MapTest";
// import { ChatList } from "./pages/ChatList";
// import { ChatScreen } from "./pages/ChatScreen";

render(
  () => <Router>
    <Route path="/" component={DiscoveredPage}/>
    <Route path="/maptest" component={MapTest}/>
    

  </Router>,
  document.getElementById("root") as HTMLElement
);
