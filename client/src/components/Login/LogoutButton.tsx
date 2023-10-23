import { GoogleLogout } from "@leecheuk/react-google-login"
import { useGlobalContext } from "../../context"

const LogoutButton = () => {
  const { clientId, setLoggedIn } = useGlobalContext()

  const onSuccess = () => {
    console.log("logout success")
    setLoggedIn(false)
  }

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default LogoutButton
