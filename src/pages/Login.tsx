import { loginSchema, type TLoginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      "email": '', password: ''
    },
  });

  function onSubmit(data: TLoginSchema) {
    setIsPending(true);
    console.log('Login data:', data);

    setTimeout(() => {
      setIsPending(false);
      toast.success('Mock login successful! Redirecting...');
      // Simulate redirection
    }, 1500);
  }

  return (
    <div></div>
  )
}
