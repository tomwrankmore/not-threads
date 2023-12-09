import Image from 'next/image'
import React from 'react'
import { UserAvatar } from './UserAvatar'

type ProfileHeaderProps = {
  name: string,
  email: string,
  image: string,
}

const ProfileHeader = ({name, email, image}:ProfileHeaderProps) => {
  
  return (
    <div className="flex justify-between pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-xs">{email}</p>
        </div>

        <UserAvatar image={image} name={name}/>

        {/* <div className="rounded-full h-20 w-20 overflow-hidden relative">
          <Image
            className="object-cover"
            src={image || "https://www.gravatar.com/avatar/?d=mp"}
            alt={name || "user profile image"}
            quality={100}
            priority={true}
            fill={true}
          />
        </div> */}
      </div>
  )
}

export default ProfileHeader