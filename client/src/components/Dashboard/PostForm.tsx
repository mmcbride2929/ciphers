import axios, { AxiosError } from "axios"
import PostInput from "./PostInput"
import { useState } from "react"
import { useGlobalContext } from "../../context"
import { useMutation, useQueryClient } from "react-query"

const PostForm = () => {
  const queryClient = useQueryClient()

  const [inputValue, setInputValue] = useState<string>("")

  const { currentUser } = useGlobalContext()

  const createPostMutation = useMutation<
    void,
    AxiosError,
    { content: string; author: string }
  >((newPost) => axios.post("http://localhost:5000/ciphers", newPost), {
    onSettled: () => {
      // Invalidate the 'posts' query to trigger a refetch
      queryClient.invalidateQueries("posts")
    },
  })

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    try {
      await createPostMutation.mutateAsync({
        content: inputValue,
        author: currentUser.id,
      })
      setInputValue("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="m-4 border rounded-lg p-4 max-w-sm">
      <form onSubmit={handleSubmit} className="flex items-end">
        <div className="flex flex-grow">
          <PostInput inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        <button className="ml-2  px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  )
}
export default PostForm
