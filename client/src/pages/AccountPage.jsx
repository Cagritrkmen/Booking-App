import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate } from 'react-router-dom'

const AccountPage = () => {
  const {user,ready} = useContext(UserContext)

  if(!ready){
    return "Loading..."
  }

  if(ready&&!user){
    return <Navigate  to={"/login"}></Navigate>
  }
  return (
    <div>
      <nav className='w-full flex  justify-center mt-8 gap-4'>
        <Link className='py-2 px-6 bg-primary text-white rounded-full' to={"/account"}>My Profile</Link>
        <Link className='py-2 px-6' to={"/account/bookings"}>My Bookings</Link>
        <Link className='py-2 px-6' to={"/account/places"}>My Accommodations</Link>
      </nav>
    </div>
  )
}

export default AccountPage