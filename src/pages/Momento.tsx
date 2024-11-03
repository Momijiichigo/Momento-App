import {Component} from "solid-js";
import {createSignal, For} from 'solid-js'
import {getMomentoInfo} from "../dummyData";
import {MomentoCard} from "../components/MomentoCard";
import {A, useParams} from "@solidjs/router";
import { FiArrowLeft } from "solid-icons/fi";

export interface MomentoInfo {
  id: number
  title: string
  date: string
  comment: string
  photoUrl: string
  subPosts: MomentoInfo[]
  parent?: MomentoInfo
}

export const MomentoPage: Component = () => {
  const momentInfo = getMomentoInfo(parseInt(useParams().id))

  return (
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">

      <A href="/discovered" class="flex items-center justify-between mb-3">
        <button class="p-0 hover:bg-gray-100 rounded-full transition-colors">
          <FiArrowLeft class="w-6 h-6" />
        </button>
      </A>
      <div class="space-y-8">
        <MomentoCard momentoInfo={momentInfo} />
        <For each={momentInfo.subPosts}>
          {(momentoInfo) => (
            <MomentoCard momentoInfo={momentoInfo} />
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
