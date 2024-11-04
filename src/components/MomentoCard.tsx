import {Component} from "solid-js"
import {MomentoInfo} from "../pages/Momento"

export const MomentoCard: Component<{momentoInfo: MomentoInfo}> = (props) => {
  const {momentoInfo} = props

  return <div class="space-y-2 z-0">
    <div class="border-2 border-gray-300 rounded-lg overflow-hidden"
        style={{"view-transition-name": `momento-img-${momentoInfo.id}`}}>
      <img
        src={momentoInfo.photoUrl}
        alt={`Photo ${momentoInfo.id}`}
        class="w-full h-60 object-cover"
      />
    </div>
    <div class="space-y-1">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-mono" style={{
          "view-transition-name": `momento-title-${momentoInfo.id}`
        }}>{
          momentoInfo.title
        }</h2>
        <span class="font-mono text-gray-600" style={{
          "view-transition-name": `momento-created-date-${momentoInfo.id}`
        }}>{
          momentoInfo.date
        }</span>
      </div>
      <p class="font-mono text-gray-700" style={{
        "view-transition-name": `momento-comment-${momentoInfo.id}`
      }}>{
        momentoInfo.comment
      }</p>
    </div>
  </div>

}
