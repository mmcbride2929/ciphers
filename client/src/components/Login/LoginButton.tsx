import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "@leecheuk/react-google-login"
import axios from "axios"
import { useGlobalContext } from "../../context"
import { User } from "../../context"

const LoginButton = () => {
  const { setCurrentUser, clientId, setLoggedIn } = useGlobalContext() as {
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
    clientId: string
  }

  const onSuccess = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ("profileObj" in res) {
      setLoggedIn(true)
      const { name, email, googleId, imageUrl } = res.profileObj

      checkUserExists(name, email, googleId, imageUrl)
    }
  }

  const onFailure = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    console.log("failure", res)
  }

  const checkUserExists = async (
    name: string,
    email: string,
    googleId: String,
    imageUrl: string
  ): Promise<void> => {
    const response = await axios.post("http://localhost:5000/users", {
      name: name,
      email: email,
      id: googleId,
      photo_url: imageUrl,
    })
    setCurrentUser(response.data)
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  )
}

export default LoginButton
