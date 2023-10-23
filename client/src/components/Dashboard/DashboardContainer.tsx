import { useGlobalContext } from "../../context"
import PostForm from "./PostForm"
import Posts from "./Posts"

const DashboardContainer = () => {
  const { loggedIn } = useGlobalContext()

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
      <div> {loggedIn && <PostForm />}</div>

      <div>
        <Posts />
      </div>
    </div>
  )
}
export default DashboardContainer
