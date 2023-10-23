import { useGlobalContext } from "../../context"
import { User } from "../../context"
import PostForm from "../Dashboard/PostForm"

const UserSummary = () => {
  const { currentUser, loggedIn } = useGlobalContext() as {
    currentUser: User
  }

  return (
    <>
      {loggedIn && (
        <div className="bg-gray-100 p-4 flex items-center justify-center flex-col">
          <div className="w-16 h-16 rounded-full overflow-hidden ">
            <img
              src={currentUser.photo_url}
              alt="user-avatar"
              className="w-full h-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{currentUser.name}</h1>
            <h2 className="text-sm text-gray-600">
              Ciphers Solved: {currentUser.solvedCiphers}
            </h2>
          </div>
        </div>
      )}
    </>
  )
}
export default UserSummary
