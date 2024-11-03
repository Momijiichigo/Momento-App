import {Component} from "solid-js";
import { createSignal, For } from 'solid-js'

interface PhotoPost {
  id: number
  title: string
  date: string
  comment: string
  photoUrl: string
}

  

  

export const MomentoPage: Component = () => {
    const [posts, setPosts] = createSignal<PhotoPost[]>([
        {
          id: 1,
          title: "Title",
          date: "11/03/2024",
          comment: "short comment",
          photoUrl: "/placeholder.svg?height=240&width=400"
        },
        {
          id: 2,
          title: "Title",
          date: "11/03/2024",
          comment: "short comment",
          photoUrl: "/placeholder.svg?height=240&width=400"
        }
      ])
        
    return (
        <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div class="space-y-8">
            <For each={posts()}>
              {(post) => (
                <div class="space-y-2">
                  <div class="border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={post.photoUrl}
                      alt={`Photo ${post.id}`}
                      class="w-full h-60 object-cover"
                    />
                  </div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center">
                      <h2 class="text-xl font-mono">{post.title}</h2>
                      <span class="font-mono text-gray-600">{post.date}</span>
                    </div>
                    <p class="font-mono text-gray-700">{post.comment}</p>
                  </div>
                </div>
              )}
            </For>
          </div>
          {/* you have to change this to direct to "add yours" page }
          { <button
            onClick={addPost}
            class="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full border-2 border-gray-300 font-mono transition-colors duration-200 ease-in-out"
          >
            add yours
          </button> */}
        </div>
      )
}