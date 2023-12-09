// import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const DeletePostButton = ({handleSubmit}:{handleSubmit: React.Dispatch<React.SetStateAction<boolean>>}) => {
  // const { pending } = useFormStatus();

  return <Button onClick={()=>handleSubmit(false)}>Delete</Button>;
};

export default DeletePostButton;
