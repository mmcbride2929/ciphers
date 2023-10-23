import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"

import { useState } from "react"

interface GuessInterface {
  name: string
  id: string
  contentid: string
  loggedIn: boolean
}

const GuessCipher = ({ name, id, contentid, loggedIn }: GuessInterface) => {
  const queryClient = useQueryClient()

  const [userGuess, setUserGuess] = useState<string>("")

  const guessCipherMutation = useMutation<
    { data: boolean },
    AxiosError,
    { userGuess: string; name: string; id: string }
  >(
    () =>
      axios.post(`http://localhost:5000/ciphers/${contentid}`, {
        userGuess,
        name,
        id,
      }),
    {
      onSettled: () => {
        // Invalidate the 'posts' query to trigger a refetch
        queryClient.invalidateQueries("posts")
      },
    }
  )

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    const filteredValue = inputValue.replace(/[^a-zA-Z ]/g, "") // Remove non-letter and non-space characters
    const lowercaseValue = filteredValue.toLowerCase()
    setUserGuess(lowercaseValue)
  }

  const handleGuess = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<boolean> => {
    e.preventDefault()

    try {
      const response = await guessCipherMutation.mutateAsync({
        userGuess,
        name,
        id,
      })

      setUserGuess("")
      if (response.data === true) {
        toast.success("Your guess is correct!")
        return response.data
      } else {
        toast.error("Your guess is incorrect. Try again.")
        return response.data
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <form onSubmit={handleGuess}>
      {/* <label htmlFor="cipher-input">Solution:</label> */}
      <input
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-black-400 mt-2"
        type="text"
        id="cipher-input"
        name="cipher-input"
        onChange={handleInput}
        value={userGuess}
        minLength="1"
        maxLength="25"
        required
      />
      <button
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        disabled={!loggedIn ? true : false}
      >
        Solve
      </button>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </form>
  )
}
export default GuessCipher
