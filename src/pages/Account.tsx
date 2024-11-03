import { Component } from "solid-js";
import { BsPersonAdd } from 'solid-icons/bs'
import { A } from "@solidjs/router";

interface ProfileData {
  name: string
  accountId: string
  discoveries: number
  momentos: number
  introduction: string
  profilePicture: string
}

export const AccountPage: Component = () => {
    const profile: ProfileData = {
    name: "Sarah Parker",
    accountId: "SP2024",
    discoveries: 24,
    momentos: 37,
    introduction: "Hello! I'm passionate about photography and love capturing special moments. I enjoy exploring new places and sharing my discoveries with others.",
    profilePicture: "https://picsum.photos/200/300"
  }

  return (
    <div class="max-w-2xl mx-auto p-6">
      <div class="space-y-6">
        {/* Profile Header */}
        <div class="flex items-start gap-6">
          {/* Profile Picture */}
          <div class="shrink-0">
            <img
              src={profile.profilePicture}
              alt="Profile picture"
              class="w-24 h-24 rounded-full border-2 border-gray-200"
            />
          </div>

          {/* Profile Info */}
          <div class="space-y-4">
            <div>
              <h1 class="text-2xl font-mono">{profile.name}</h1>
              <p class="text-gray-600 font-mono">{profile.accountId}</p>
            </div>

            {/* Statistics */}
            <div class="flex gap-8">
              <div class="text-center">
                <p class="text-sm text-gray-600 font-mono">discoveries</p>
                <p class="text-2xl font-bold font-mono">{profile.discoveries}</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-600 font-mono">momentos</p>
                <p class="text-2xl font-bold font-mono">{profile.momentos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div class="border-2 rounded-lg p-4">
          <p class="font-mono text-gray-800">{profile.introduction}</p>
        </div>

        {/* Search Button */}
        <div class="flex justify-end">
          <A href="/search"
            class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full border-2 border-gray-300 font-mono flex items-center gap-2 transition-colors duration-200"
          >
            <BsPersonAdd class="w-4 h-4" />
            Search
          </A>
        </div>
      </div>
    </div>
  )
}

