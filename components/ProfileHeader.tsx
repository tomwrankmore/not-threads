import { UserAvatar } from "./UserAvatar";

type ProfileHeaderProps = {
  name: string;
  email: string;
  image: string;
};

const ProfileHeader = ({ name, email, image }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between pb-4 mb-4">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-xs">{email}</p>
      </div>

      <UserAvatar image={image} name={name} />
    </div>
  );
};

export default ProfileHeader;
