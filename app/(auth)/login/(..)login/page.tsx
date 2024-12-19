import LoginForm from "@/components/LoginForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function LoginModal() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
