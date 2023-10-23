import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { PostData } from "../components/Dashboard/Posts"
import Post from "../components/Dashboard/Post"
import UserSummaryProfile from "../components/Profile/UserSummaryProfile"

const UserProfile = () => {
  const { id } = useParams()

  const fetchUser = async (): Promise<PostData[]> => {
    const response = await axios.get(`http://localhost:5000/ciphers`)

    const data = response.data.rows
    const userTweets = (data: PostData[]) => {
      const filterUsers = data?.filter((cipher) => cipher.author === id)
      return filterUsers
    }

    return userTweets(data)
  }
  const { isLoading, error, data } = useQuery("posts", fetchUser)

  return (
    <div>
      {isLoading && <h1>LOADING USER INFO</h1>}

      {data && (
        <>
          <UserSummaryProfile profileId={id} />
          <div className="flex flex-col items-center">
            {data?.map((cipher) => {
              return (
                <div key={cipher.contentid} className="w-full max-w-sm ">
                  <Post key={cipher.contentid} singlePost={cipher} />
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
export default UserProfile
