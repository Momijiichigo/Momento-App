import { Accessor, Component, For, createEffect, createSignal } from "solid-js";
import { BiRegularCross, BiRegularLocationPlus, BiSolidNavigation } from 'solid-icons/bi'
import { FaSolidMapLocationDot, FaSolidBookOpen } from 'solid-icons/fa'
import { AiOutlineSetting } from 'solid-icons/ai'
import { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { Portal } from "solid-js/web";


type NavButtonInfo = {
  icon: JSX.Element,
  link: string,
}
export const Menu: Component = () => {

  const navButtons: NavButtonInfo[] = [
    {
      icon: <BiRegularLocationPlus class="w-6 h-6" />,
      link: "/new-momento"
    },
    {
      icon: <FaSolidMapLocationDot class="w-6 h-6" />,
      link: "/discovered"
    },
    {
      icon: <FaSolidBookOpen class="w-6 h-6" />,
      link: "/your-momento"
    },
    {
      icon: <AiOutlineSetting class="w-6 h-6" />,
      link: "/account"
    }
  ]
  const [activeButton, setActiveButton] = createSignal(1);
  const [link, setLink] = createSignal(navButtons[1].link);


  const onClick = (index: number) => {
    setActiveButton(index);
    setLink(navButtons[index].link);
    /* @ts-ignore */
    anchor.click()
  };

  const anchor = <A href={link()} />
  // const onClick = (index: () => number) => {
  //   setActiveButton(index())
  //   setLink(navButtons[activeButton()].link)

  // }
  return <nav class="fixed z-50 bottom-0 left-0 right-0 bg-white border-t border-gray-200">
    <ul class="flex justify-around items-center h-16">
      <For each={navButtons}>{(button, index) => {
        return (<button 
          onClick={() => onClick(index())}
          class={`flex flex-col items-center hover:text-blue-500 ${
            activeButton() === index() ? 'text-blue-500' : 'text-gray-600'
          }`}>
          {button.icon}
        </button>)

      }}</For>
      <Portal>
        {anchor}
      </Portal>

    </ul>
  </nav>

}
