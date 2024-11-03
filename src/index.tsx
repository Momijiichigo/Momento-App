/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import {A, Route, Router} from "@solidjs/router";
import {Home} from "./pages/Home";
import {DiscoveredMapPage} from "./pages/DiscoveredMap";
import { MapTest } from "./pages/MapTest";
import {CameraPage} from "./pages/Camera";
// import { ChatList } from "./pages/ChatList";
// import { ChatScreen } from "./pages/ChatScreen";

import { currentLocation } from './dummyData'
import { ChronoListPage } from "./pages/ChronoList";
import { MomentoPage } from "./pages/Momento";
import { SearchPage } from "./pages/Search";
import { AccountPage } from "./pages/Account";
import { NewMomentoPage } from "./pages/NewMomento";

import {Menu} from "./components/Menu";
import {createSignal} from "solid-js";
import {DiscoveredListPage} from "./pages/DiscoveredList";
import {SettingLocation} from "./pages/SettingMap";
import {Login} from "./pages/Login";

// export const [jumpLink, setJumpLink] = createSignal("/");
// const jumpAnchor = <A href={jumpLink()} />
// export const jumpTo = (link: string) => {
//   setJumpLink(link)
//   /* @ts-ignore */
//   jumpAnchor?.click()
// }
//
// setTimeout(() => {



render(
  () => <Router root={(props)=> <>{props.children}<Menu /></>}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/discovered" component={DiscoveredMapPage} />
    <Route path="/discovered-list" component={DiscoveredListPage} />
    <Route path="/your-momento" component={DiscoveredMapPage} />
    <Route path="/your-momento-list" component={DiscoveredListPage} />
    <Route path="/maptest" component={()=><MapTest currentLocation={currentLocation} />} />
    <Route path="/camera" component={CameraPage} />
    <Route path="/momento/:id" component={MomentoPage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/account" component={AccountPage} />
    <Route path="/new-momento" component={NewMomentoPage}/>
    <Route path="/settinglocation" component={()=><SettingLocation currentLocation={currentLocation} />} />
  </Router>,
  document.getElementById("root") as HTMLElement
);
