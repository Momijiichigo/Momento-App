/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import {Route, Router} from "@solidjs/router";
import {Home} from "./pages/Home";
import {DiscoveredPage} from "./pages/Discovered";
import { MapTest } from "./pages/MapTest";
import {CameraPage} from "./pages/Camera";
// import { ChatList } from "./pages/ChatList";
// import { ChatScreen } from "./pages/ChatScreen";

import { currentLocation } from './dummyData'
render(
  () => <Router>
    <Route path="/" component={DiscoveredPage} />
    <Route path="/maptest" component={()=><MapTest currentLocation={currentLocation} />} />
    <Route path="/camera" component={CameraPage} />
    

  </Router>,
  document.getElementById("root") as HTMLElement
);
