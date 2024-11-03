import {Component, For, createEffect, createSignal} from "solid-js";
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
import {FaSolidMapLocationDot, FaSolidBookOpen} from 'solid-icons/fa'
import {AiOutlineSetting} from 'solid-icons/ai'
import {JSX} from "solid-js";
import {A} from "@solidjs/router";
import {Portal} from "solid-js/web";


type NavButtonInfo = {
  icon: JSX.Element,
  link: string,
}

export const [activeButton, setActiveButton] = createSignal(1)
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
      link: "/settings"
    }
  ]

  const [link, setLink] = createSignal(navButtons[1].link)

  createEffect(() => {
    setLink(navButtons[activeButton()].link)
  })

  const anchor = <A href={link()} />

  return <nav class="fixed z-50 bottom-0 left-0 right-0 bg-white border-t border-gray-200">
    <ul class="flex justify-around items-center h-16">
      <For each={navButtons}>{({icon, link}, index) => {
        const isActive = activeButton() === index()
        const textColor = isActive ? 'text-blue-500' : 'text-gray-600'
        return (<button onClick={() => {
          setActiveButton(index())
          /* @ts-ignore */
          anchor.click()

        }} class={`flex flex-col items-center ${textColor} hover:text-blue-500`}>
          {icon}
        </button>)

      }}</For>
      <Portal>
        {anchor}
      </Portal>

    </ul>
  </nav>

}
