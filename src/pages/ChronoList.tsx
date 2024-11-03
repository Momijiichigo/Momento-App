import { A } from "@solidjs/router";
import { Component, on } from "solid-js";
import { createSignal, For, createMemo } from 'solid-js';

export const ChronoListPage: Component = () => {
  type Card = {
    id: number;
    createdDate: string;
    discoveredDate: string;
    photo: string;
    title: string;
    comment: string;
  };
  const cards: Card[] = [
    {
      id: 1,
      createdDate: '2023-05-15',
      discoveredDate: '2024-05-15',
      photo: 'https://picsum.photos/300/200',
      title: 'Beach Sunset',
      comment: 'Beautiful colors at the beach today!'
    },
    {
      id: 2,
      createdDate: '2023-06-20',
      discoveredDate: '2024-01-25',
      photo: 'https://picsum.photos/300/200',
      title: 'City Skyline',
      comment: 'Amazing view of the city from the rooftop.'
    },
    {
      id: 3,
      createdDate: '2024-05-03',
      discoveredDate: '2024-07-15',
      photo: 'https://picsum.photos/300/200',
      title: 'Mountain Hike',
      comment: 'Reached the summit after a challenging hike.'
    },
    {
      id: 4,
      createdDate: '2023-05-05',
      discoveredDate: '2023-05-15',
      photo: '/placeholder.svg?height=150&width=150',
      title: 'Mountain Hike',
      comment: 'Reached the summit after a challenging hike.'
    },
    {
      id: 5,
      createdDate: '2023-05-05',
      discoveredDate: '2023-05-15',
      photo: '/placeholder.svg?height=150&width=150',
      title: 'Mountain Hike',
      comment: 'Reached the summit after a challenging hike.'
    }
  ];

  enum SortCriteria {
    CreatedDate,
    DiscoveredDate
  }
  
  const [sortCriteria, setSortCriteria] = createSignal(SortCriteria.CreatedDate);
  const [timelineItems] = createSignal(cards);

  // const sortedItems = createMemo(() => {
  //   return [...timelineItems()].sort((a, b) => {
  //     const aValue = sortCriteria() === SortCriteria.CreatedDate ? a.createdDate : a.discoveredDate;
  //     const bValue = sortCriteria() === SortCriteria.CreatedDate ? b.createdDate : b.discoveredDate;
  //     return aValue > bValue ? 1 : -1;
  //   });
  // });
  const sortedItems = createMemo(() => {
    return [...timelineItems()].sort((a, b) => {
      const aDate = sortCriteria() === SortCriteria.CreatedDate ? a.createdDate : a.discoveredDate;
      const bDate = sortCriteria() === SortCriteria.CreatedDate ? b.createdDate : b.discoveredDate;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
  });


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }; 
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div class="font-sans max-w-md mx-auto bg-gray-100 min-h-screen">
      <header class="sticky top-0 z-50 bg-white shadow-md">
        <h1 class="text-2xl font-bold text-gray-800 p-4 text-center">Timeline</h1>
        {/* close button */}
        <A href="/" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          x 
        </A>
      </header>
      <div class="sticky top-14 z-40 bg-white shadow-md">
        <div class="flex justify-between items-center p-4">
          <button
            class={`text-sm font-medium ${sortCriteria() === SortCriteria.DiscoveredDate ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setSortCriteria(SortCriteria.DiscoveredDate)}
          >
            Discovered {sortCriteria() === SortCriteria.DiscoveredDate && '▼'}
          </button>
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
              <div class="sticky top-28 z-10 bg-gray-100 flex justify-between items-center mb-2 py-2">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span class="text-sm font-medium text-gray-700">{formatDate(sortCriteria() === SortCriteria.CreatedDate ? item.createdDate : item.discoveredDate)}</span>
                </div>
                <div class="text-sm text-gray-500">
                  Discovered: {formatDate(item.discoveredDate)}
                </div>
              </div>
              <div class="bg-white rounded-lg overflow-hidden shadow-md flex h-32">
                <div class="w-1/2 relative">
                  <img 
                    src={item.photo} 
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
    </div>
  );
}



