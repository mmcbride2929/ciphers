import React from "react"
import LoginButton from "../Login/LoginButton"
import LogoutButton from "../Login/LogoutButton"
import { useGlobalContext } from "../../context"

const Nav = () => {
  const { loggedIn } = useGlobalContext()
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-black-600 font-semibold" href="/">
              <span className="sr-only">Home</span>
              CIPHERS
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {loggedIn ? <LogoutButton /> : <LoginButton />}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Nav
