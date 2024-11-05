import {createSignal} from "solid-js";
export const [currentLocation, setCurrentLocation] = createSignal<{
  lat: number;
  lng: number;
}>({lat: 52.51229, lng: 13.40048});

import {MomentoInfo} from "./pages/Momento";
import {MomentoDiscoveryInfo} from "./components/MomentListItem";
// dummy Momento data
export const dummyMomento: MomentoDiscoveryInfo[] = [
  {
    id: 0,
    title: "Title",
    date: "11/01/2024",
    discoveredDate: "11/01/2025",
    comment: "short comment",
    photoUrl: "https://picsum.photos/300/200",
    subPosts: []
  },
  {
    id: 1,
    title: "Title",
    date: "11/03/2024",
    discoveredDate: "11/11/2025",
    comment: "short comment",
    photoUrl: "https://picsum.photos/301/201",
    subPosts: []
  },
  {
    id: 2,
    title: "Title",
    date: "11/12/2024",
    discoveredDate: "10/14/2025",
    comment: "short comment",
    photoUrl: "https://picsum.photos/301/200",
    subPosts: []
  },
  {
    id: 3,
    title: "Title",
    date: "10/03/2022",
    discoveredDate: "10/14/2024",
    comment: "short comment",
    photoUrl: "https://picsum.photos/300/201",
    subPosts: []
  }
]
type Card = {
  id: number;
  createdDate: string;
  discoveredDate?: string;
  photo: string;
  title: string;
  comment: string;
};
export const cards: Card[] = [
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
export const momentoMapMarkers = [
  {lat: 52.5300, lng: 13.4050, id: 0},
  {lat: 52.5300, lng: 13.4150, id: 1},
  {lat: 52.5100, lng: 13.3950, id: 4},
]
export function addSubMomento(parentId: number, subPost: MomentoInfo) {
  dummyMomento.find(({id}) => id === parentId)?.subPosts.push(subPost)
  subPost.parent = dummyMomento[parentId]
  dummyMomento.push(subPost)
}
addSubMomento(1, {
  id: 4,
  title: "Title",
  date: "11/03/2024",
  comment: "short comment",
  photoUrl: "https://picsum.photos/300/200",
  subPosts: []
})

export const getMomentoInfo = (momentoId: number) => {
  return dummyMomento[momentoId]
}
