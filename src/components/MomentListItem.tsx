import {Component, Show} from "solid-js";
import {MomentoInfo} from "../pages/Momento";
import {VA} from "./VA";

export type MomentoDiscoveryInfo = MomentoInfo & {
  discoveredDate?: string;
};
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
export const MomentoListItem: Component<{ discoveredList?: boolean,item: MomentoDiscoveryInfo}> = (props) => {

  return <VA href={`/momento/${props.item.id}`} class="mb-8">
    <div class="sticky top-20 z-10 bg-gray-50 flex justify-between items-center mb-0 py-2">
      <Show when={props.discoveredList}>

        <div class="flex items-center">
          <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span class="text-sm font-medium text-gray-700">{
            formatDate(props.item.discoveredDate!)
          }</span>
        </div>
      </Show>
      <div class="text-sm text-gray-500">
        Created: {formatDate(props.item.date)}
      </div>
    </div>
    <div class="bg-white rounded-lg overflow-hidden shadow-md flex h-32">
      <div class="w-1/2 relative">
        <img
          src={props.item.photoUrl}
          alt={props.item.title}
          class="absolute inset-0 w-full h-full object-cover"
          style={{"view-transition-name": `momento-img-${props.item.id}`}}
        />
        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
      </div>
      <div class="w-1/2 p-4 flex flex-col justify-center">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">{props.item.title}</h2>
        <p class="text-sm text-gray-600">{props.item.comment}</p>
      </div>
    </div>
  </VA>

}
