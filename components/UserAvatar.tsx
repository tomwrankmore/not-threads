import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function UserAvatar({image, name}:{image:string, name: string}) {
  let initial
  if(name != undefined) {
    initial = Array.from(name)[0]
  } 
  
  initial = '?'
  

  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>...</AvatarFallback>
    </Avatar>
  );
}
