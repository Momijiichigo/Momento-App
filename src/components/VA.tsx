import {A} from "@solidjs/router";
import {JSX, splitProps} from "solid-js";
import {Component} from "solid-js";
import {Portal} from "solid-js/web";

export function startViewTransition(callback: () => void) {
  if ("startViewTransition" in document) {
    /* @ts-ignore */
    document.startViewTransition(callback)
  } else {
    callback()
  }
}

export const VA: Component<{href: string, children: JSX.Element} & { [key: string]: any }> = (props) => {

  const elem = <A href={props.href}></A>


  return <>
    <a {...props} href="javascript:void(0)" onClick={() => {
      /* @ts-ignore */
      startViewTransition(()=>elem.click())
    }}>{props.children}</a>
    <Portal>
      {elem}
    </Portal>
  </>

}
