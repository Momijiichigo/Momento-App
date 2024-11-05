import { Component } from "solid-js";
import { createSignal } from 'solid-js'
import { AiTwotoneCamera } from 'solid-icons/ai'
import { BsImage } from 'solid-icons/bs'
import { FiSend } from 'solid-icons/fi'
import {useNavigate} from "@solidjs/router";

export const NewMomentoPage: Component = () => {
  const [photo, setPhoto] = createSignal<string>('')
  const [title, setTitle] = createSignal('')
  const [comment, setComment] = createSignal('')

  const handlePhotoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(input.files[0])
    }
  }
  const navigate = useNavigate()

  const handleRetake = () => {
    navigate('/camera')

    setPhoto('')
  }

  const handlePost = () => {
    // Here you would typically send the post data to your backend
    console.log('Posting:', { photo: photo(), title: title(), comment: comment() })
    // Reset form after posting
    setPhoto('')
    setTitle('')
    setComment('')
  }

  return (
    <div class="max-w-md mx-auto p-4 space-y-4">
      {/* Photo Section */}
      <div class="border-2 rounded-lg overflow-hidden">
        {photo() ? (
          <div class="relative">
            <img
              src={photo()}
              alt="Uploaded photo"
              class="w-full h-64 object-cover"
            />
            <button
              onClick={handleRetake}
              class="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white/90 hover:bg-white text-gray-800 rounded-full border-2 border-gray-300 font-mono flex items-center gap-2 transition-colors duration-200"
            >
              <AiTwotoneCamera class="w-4 h-4" />
              retake
            </button>
          </div>
        ) : (
          <label class="flex flex-col items-center justify-center h-64 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
            <BsImage class="w-8 h-8 text-gray-400 mb-2" />
            <span class="text-gray-500 font-mono">Click to add photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              class="hidden"
            />
          </label>
        )}
      </div>

      {/* Empty Section */}
      <div class="border-2 rounded-lg p-4">
        <p class="text-gray-400 font-mono text-center">Empty</p>
      </div>

      {/* Title Input */}
      <div class="space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          class="w-full p-3 border-2 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Comment Input */}
      <div class="space-y-2">
        <textarea
          placeholder="Comment"
          value={comment()}
          onInput={(e) => setComment(e.currentTarget.value)}
          rows={4}
          class="w-full p-3 border-2 rounded-lg font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Post Button */}
      <div class="pt-4">
        <button
          onClick={handlePost}
          class="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-mono flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <FiSend class="w-5 h-5" />
          Post
        </button>
      </div>
    </div>
  )
}
