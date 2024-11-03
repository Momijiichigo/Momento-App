import {Component, For, createSignal} from "solid-js";
import {BiRegularCross, BiRegularLocationPlus, BiSolidNavigation} from 'solid-icons/bi'
import {FaSolidMapLocationDot, FaSolidBookOpen} from 'solid-icons/fa'
import {AiOutlineSetting} from 'solid-icons/ai'
import {JSX} from "solid-js";
import {A} from "@solidjs/router";


type NavButtonInfo = {
  icon: JSX.Element,
  link: string,
}

export const [activeButton, setActiveButton] = createSignal(0)
export const Menu: Component = () => {

  const NavButtons: NavButtonInfo[] = [
    {
      icon: <BiRegularLocationPlus class="w-6 h-6" />,
        link: "/"
    },
    {
      icon: <FaSolidMapLocationDot class="w-6 h-6" />,
        link: "/discovered"
    },
    {
      icon: <FaSolidBookOpen class="w-6 h-6" />,
        link: "/notifications"
    },
    {
      icon: <AiOutlineSetting class="w-6 h-6" />,
        link: "/settings"
    }
  ]

  return <nav class="fixed z-50 bottom-0 left-0 right-0 bg-white border-t border-gray-200">
    <ul class="flex justify-around items-center h-16">
      <For each={NavButtons}>{({icon, link}, index) => {
        const isActive = activeButton() === index()
        const textColor = isActive ? 'text-blue-500' : 'text-gray-600'
        return (<div>
          <A href={link} class={`flex flex-col items-center ${textColor} hover:text-blue-500`}>
            {icon}
          </A>
        </div>)

      }}</For>
    </ul>
  </nav>

}
