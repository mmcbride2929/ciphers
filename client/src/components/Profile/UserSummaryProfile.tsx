import axios, { AxiosResponse } from "axios"
import { FaArrowLeft } from "react-icons/fa"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

interface ProfileId {
  profileId: string
}

interface User {
  id: string
  email: string
  name: string
  photo_url: string
  solvedCiphers: number
}

const UserSummaryProfile = ({ profileId }: ProfileId) => {
  const fetchUser = async (): Promise<User> => {
    const response: AxiosResponse<User> = await axios.get(
      `http://localhost:5000/users/${profileId}`
    )

    return response.data
  }

  const { isLoading, error, data } = useQuery("user", fetchUser)

  return (
    <>
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        {isLoading ? (
          <h1>LOADING DATA</h1>
        ) : (
          <>
            <Link to={`/`}>
              <div className="absolute top-16 left-2 mt-2 hover:bg-gray-300 p-2 rounded-md cursor-pointer">
                <FaArrowLeft className="text-lg color-blue-500" />
              </div>
            </Link>

            <div className="w-16 h-16 rounded-full overflow-hidden ">
              <img
                src={data?.photo_url}
                alt="user-avatar"
                className="w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold">{data?.name}</h1>
              <h2 className="text-sm text-gray-600">
                Ciphers Solved: {data?.solvedCiphers}
              </h2>
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default UserSummaryProfile
