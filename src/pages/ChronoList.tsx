import {A} from "@solidjs/router";
import {Accessor, Component, Show, on} from "solid-js";
import {createSignal, For, createMemo} from 'solid-js';
import {MomentoInfo} from "./Momento";
import {ImCross} from 'solid-icons/im'
import {VA} from "../components/VA";
import {MomentoDiscoveryInfo, MomentoListItem} from "../components/MomentListItem";

export const ChronoListPage: Component<{discoveredList?: boolean, momentoInfo: MomentoDiscoveryInfo[]}> = (props) => {

  enum SortCriteria {
    CreatedDate,
    DiscoveredDate
  }

  const [sortCriteria, setSortCriteria] = createSignal(SortCriteria.CreatedDate);
  const [timelineItems] = createSignal(props.momentoInfo);

  // const sortedItems = createMemo(() => {
  //   return [...timelineItems()].sort((a, b) => {
  //     const aValue = sortCriteria() === SortCriteria.CreatedDate ? a.createdDate : a.discoveredDate;
  //     const bValue = sortCriteria() === SortCriteria.CreatedDate ? b.createdDate : b.discoveredDate;
  //     return aValue > bValue ? 1 : -1;
  //   });
  // });
  const sortedItems = createMemo(() => {
    return [...timelineItems()].sort((a, b) => {
      const aDate = sortCriteria() === SortCriteria.CreatedDate ? a.date : a.discoveredDate || a.date;
      const bDate = sortCriteria() === SortCriteria.CreatedDate ? b.date : b.discoveredDate || b.date;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
  });



  return (
    <>
      <header class="sticky top-0 z-50 bg-white">
        <h1 class="text-2xl font-bold text-gray-800 p-2 text-center">{props.discoveredList ? "Discovery" : "Timeline"}</h1>
        {/* close button */}
        <VA href={props.discoveredList ? '/discovered' : '/your-momento'} class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <ImCross />
        </VA>
      </header>
      <div class="sticky top-12 z-40 bg-white shadow-md">
        <div class="flex justify-between items-center p-2">
          <Show when={props.discoveredList}>
            <button
              class={`text-sm font-medium ${sortCriteria() === SortCriteria.DiscoveredDate ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setSortCriteria(SortCriteria.DiscoveredDate)}
            >
              Discovered {sortCriteria() === SortCriteria.DiscoveredDate && '▼'}
            </button>
          </Show>
          <button
            class={`text-sm font-medium ${sortCriteria() === SortCriteria.CreatedDate ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setSortCriteria(SortCriteria.CreatedDate)}
          >
            Created {sortCriteria() === SortCriteria.CreatedDate && '▼'}
          </button>
        </div>
      </div>
      <main class="p-4">
        <For each={sortedItems()}>
          {(item) => (
            <MomentoListItem discoveredList={props.discoveredList} item={item} />
          )}
        </For>
      </main>
    </>
  );
}



