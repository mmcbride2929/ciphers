import axios from "axios"
import { useQuery } from "react-query"
import Post from "./Post"

export interface PostData {
  content: string
  author: string
  name: string
  attempts: number
  contentid: string
  photo_url: string
  solved_by: null | string
}

const Posts = () => {
  const fetchPosts = async (): Promise<PostData[]> => {
    const response = await axios.get("http://localhost:5000/ciphers")

    return response.data.rows
  }

  const { isLoading, error, data } = useQuery("posts", fetchPosts)

  return (
    <>
      {isLoading && <p>LOADING</p>}
      {data &&
        data.map((singlePost) => {
          return <Post key={singlePost.contentid} singlePost={singlePost} />
        })}
      {error && <p>There has been an error</p>}
    </>
  )
}
export default Posts
