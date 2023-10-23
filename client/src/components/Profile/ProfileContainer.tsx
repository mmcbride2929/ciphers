import { useGlobalContext } from "../../context"
import UserSummary from "./UserSummary"

const ProfileContainer = () => {
  const { loggedIn } = useGlobalContext()

  return (
    <>
      {loggedIn ? (
        <UserSummary />
      ) : (
        <div className="bg-gray-100 p-4 py-9 flex items-center justify-center">
          <h1>
            Please
            <span className="font-bold"> log in</span> to post or solve ciphers
          </h1>
        </div>
      )}
    </>
  )
}
export default ProfileContainer
