import { createContext, useState, useContext } from "react"

export interface User {
  name: string
  email: string
  id: string
  photo_url: string
  solvedCiphers: number
}

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const AppContext: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    email: "",
    id: "",
    photo_url: "",
    solvedCiphers: 0,
  })

  const [loggedIn, setLoggedIn] = useState(false)

  const clientId: string = import.meta.env.VITE_GOOGLE_ID

  return (
    <GlobalContext.Provider
      value={{ currentUser, setCurrentUser, clientId, loggedIn, setLoggedIn }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default AppContext
