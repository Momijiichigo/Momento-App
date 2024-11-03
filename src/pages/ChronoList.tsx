import {A} from "@solidjs/router";
import {Accessor, Component, Show, on} from "solid-js";
import {createSignal, For, createMemo} from 'solid-js';
import {MomentoInfo} from "./Momento";

type MomentoDiscoveryInfo = MomentoInfo & {
  discoveredDate?: string;
};

export const ChronoListPage: Component<{discoveredList: boolean, momentoInfo: MomentoDiscoveryInfo[]}> = (props) => {

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


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', year: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <header class="sticky top-0 z-50 bg-white">
        <h1 class="text-2xl font-bold text-gray-800 p-2 text-center">Your Timeline</h1>
        {/* close button */}
        <A href={props.discoveredList ? '/discovered' : '/'} class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          x
        </A>
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
            <div class="mb-8">
              <div class="sticky top-20 z-10 bg-gray-50 flex justify-between items-center mb-0 py-2">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span class="text-sm font-medium text-gray-700">{formatDate(sortCriteria() === SortCriteria.CreatedDate ? item.date : item.discoveredDate)}</span>
                </div>
                <div class="text-sm text-gray-500">
                  Discovered: {formatDate(item.discoveredDate)}
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-md flex h-32">
                <div class="w-1/2 relative">
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
                </div>
                <div class="w-1/2 p-4 flex flex-col justify-center">
                  <h2 class="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
                  <p class="text-sm text-gray-600">{item.comment}</p>
                </div>
              </div>
            </div>
          )}
        </For>
      </main>
    </>
  );
}



