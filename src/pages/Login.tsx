import {Component, Show, createSignal} from "solid-js"
import { BiRegularLoaderCircle } from 'solid-icons/bi'
import {setUser, signIn, signUp, supabase} from "../supabaseClient"
export const Login: Component = () => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)
  const [errorMessage, setErrorMessage] = createSignal('')

  async function onSubmit(event: Event) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    // Simulate API call


    setIsLoading(false)
    // Handle the login logic here
    console.log('Login attempted with:', email, password)
    // Simulating an error for demonstration
    setErrorMessage('Invalid email or password. Please try again.')
  }
  

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Account Access</h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" onSubmit={onSubmit}>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email()}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password()}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <label>
                {errorMessage()}
              </label>
            )}

            <div class="flex flex-col space-y-4">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading()}
                onClick={async ()=>{
                  const {data, error} = await signIn(email(), password())
                  if (error) {
                    setErrorMessage(error.message)
                  } else {
                    console.log('User signed in:', data)
                    setUser(await supabase.auth.getUser())
                  }
                }}
              >
                <Show when={isLoading()} >

                  <BiRegularLoaderCircle  class="mr-2 h-4 w-4 animate-spin" />
                </Show> 
                Log in
              </button>
              <button
                onClick={async ()=>{
                  const {data, error} = await signUp(email(), password())
                  if (error) {
                    setErrorMessage(error.message)
                  } else {
                    console.log('User signed in:', data)
                    setUser(await supabase.auth.getUser())
                  }
                }}
                type="button"

                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}