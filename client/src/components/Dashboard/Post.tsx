import { useMutation, useQueryClient } from "react-query"
import { useGlobalContext } from "../../context"
import { PostData } from "./Posts"
import axios, { AxiosError } from "axios"
import GuessCipher from "./GuessCipher"
import { Link } from "react-router-dom"

interface SinglePost {
  singlePost: PostData
}

const Post = ({ singlePost }: SinglePost) => {
  const queryClient = useQueryClient()
  const { currentUser, loggedIn } = useGlobalContext()

  const deletePostMutation = useMutation<
    void,
    AxiosError,
    { contentId: string; author: string }
  >(
    () =>
      axios.delete("http://localhost:5000/ciphers", {
        data: {
          contentid: singlePost.contentid,
          author: currentUser.id,
        },
      }),
    {
      onSettled: () => {
        // Invalidate the 'posts' query to trigger a refetch
        queryClient.invalidateQueries("posts")
      },
    }
  )

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePostMutation.mutateAsync({
        contentId: singlePost.contentid,
        author: currentUser.id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  function processContent(content: string) {
    const vowelRegex = /[aeiouAEIOU]/g

    // Replace non-vowel characters (except for spaces) with asterisks
    const hiddenText = content.replace(/[^aeiouAEIOU ]/g, "*")

    // Replace spaces with actual spaces
    const contentWithSpaces = hiddenText.replace(/ /g, " ")

    return contentWithSpaces.replace(
      vowelRegex,
      (match) => `<span class="vowel">${match}</span>`
    )
  }

  return (
    <div className="max-w-sm m-4 border rounded-lg p-4 flex flex-col ">
      <div className="flex items-center mb-2 justify-center">
        <Link to={`/${singlePost.author}`}>
          <img
            src={singlePost.photo_url}
            referrerPolicy="no-referrer"
            alt="author-avatar"
            className="h-12 w-12 rounded-full mr-4"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={`/${singlePost.author}`}>
            <p className="font-bold text-lg">{singlePost.name}</p>
          </Link>
          <p className="text-gray-600 text-sm">
            Attempts: {singlePost.attempts}
          </p>
        </div>
      </div>
      {singlePost.solved_by === null ? (
        <div className="mt-4 text-lg text-center items-center">
          <span
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: processContent(singlePost.content),
            }}
          />
        </div>
      ) : (
        <div className="mt-2 text-lg text-center items-center font-semibold">
          {singlePost.content}
        </div>
      )}

      <div className="mt-2 text-md text-center items-center">
        {singlePost.author !== currentUser.id &&
        singlePost.solved_by === null ? (
          <GuessCipher
            name={currentUser.name}
            id={currentUser.id}
            contentid={singlePost.contentid}
            loggedIn={loggedIn}
          />
        ) : null}
        {singlePost.solved_by !== null ? (
          <div className="text-gray-600 text-sm">
            Solved By: {singlePost.solved_by}
          </div>
        ) : (
          <div className="text-gray-600">
            {singlePost.author === currentUser.id && (
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Post
