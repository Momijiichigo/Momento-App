import {Component} from "solid-js";
import { createSignal, For, Show } from 'solid-js'
import { FiArrowLeft } from 'solid-icons/fi'
import { A } from "@solidjs/router";
import {VA} from "../components/VA";

interface Profile {
  acountId: string
  name: string
}



export const SearchPage: Component = () => {
    const [searchQuery, setSearchQuery] = createSignal('')
  const [profiles] = createSignal<Profile[]>([
    { acountId: "001", name: "John Smith" },
    { acountId: "002", name: "Jane Doe" },
    { acountId: "003", name: "Alex Johnson" },
    { acountId: "004", name: "Sarah Wilson" },
    { acountId: "005", name: "Mike Brown" },
  ])

  const filteredProfiles = () => {
    const query = searchQuery().toLowerCase()
    return query
      ? profiles().filter(profile => 
          profile.acountId.toLowerCase().includes(query) ||
          profile.name.toLowerCase().includes(query)
        )
      : []
  }

  return (
    <div class="max-w-2xl mx-auto p-4">
      <div class="flex items-center gap-4 mb-6">
        <VA href="/account" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiArrowLeft class="w-6 h-6" />
        </VA>
        <input
          type="search"
          placeholder="Search by ID or name..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class="w-full border-2 font-mono py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="space-y-4">
        <Show
          when={searchQuery().length > 0}
          fallback={null}
        >
          <Show
            when={filteredProfiles().length > 0}
            fallback={
              <div class="text-center py-8 text-gray-500 font-mono">
                No matches found
              </div>
            }
          >
            <For each={filteredProfiles()}>
              {(profile) => (
                <div
                  class="p-4 border-2 rounded-lg font-mono hover:bg-gray-50 transition-colors"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">ID: {profile.acountId}</span>
                    <span class="font-semibold">{profile.name}</span>
                  </div>
                </div>
              )}
            </For>
          </Show>
        </Show>
      </div>
    </div>
  )
  
}
