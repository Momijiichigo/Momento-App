import {Component} from "solid-js"
import {MomentoInfo} from "../pages/Momento"

export const MomentoCard: Component<{momentoInfo: MomentoInfo}> = (props) => {
  const {momentoInfo} = props

  return <div class="space-y-2">
    <div class="border-2 border-gray-300 rounded-lg overflow-hidden">
      <img
        src={momentoInfo.photoUrl}
        alt={`Photo ${momentoInfo.id}`}
        class="w-full h-60 object-cover"
        style={{"view-transition-name": `momento-img-${momentoInfo.id}`}}
      />
    </div>
    <div class="space-y-1">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-mono">{momentoInfo.title}</h2>
        <span class="font-mono text-gray-600">{momentoInfo.date}</span>
      </div>
      <p class="font-mono text-gray-700">{momentoInfo.comment}</p>
    </div>
  </div>

}
