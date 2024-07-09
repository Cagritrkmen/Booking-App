import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

const AccountPage = () => {
  const { user, ready , setUser} = useContext(UserContext)
  const [redirectToHome, setRedirectToHome] = useState(false);

  let { subpage } = useParams();
  if (subpage == undefined) {
    subpage = "profile"
  }
  async function logout() {
    await axios.post("/logout")
    setRedirectToHome(true);
    setUser(null)
  
  }
  if (redirectToHome) {
    return <Navigate to="/" />;
  }
  if (!ready) {
    return "Loading..."
  }

  if (ready && !user) {
    return <Navigate to={"/login"}></Navigate>
  }
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type == subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes
  }
  return (
    <div>
      <nav className='w-full flex  justify-center mt-8 gap-4 mb-10'>
        <Link className={linkClasses("profile")} to={"/account"}>My Profile</Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>My Bookings</Link>
        <Link className={linkClasses("places")} to={"/account/places"}>My Accommodations</Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br></br>
          <button onClick={logout} className='primary max-w-xs mt-2'>Logout</button>
        </div>
      )}
    </div>
  )
}

export default AccountPage