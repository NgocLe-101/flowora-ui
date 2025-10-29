import { signUpSchema, type TSignUpSchema } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from 'react-hook-form'
import { toast } from "sonner";
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export default function SignUp() {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TSignUpSchema) => {
      const response = await fetch(
        `${BASE_URL}/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Account created successfully! Please sign in.');
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error)
    }
  });

  function onSubmit(data: TSignUpSchema) {
    mutate(data);
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create a Flowora account</CardTitle>
          <CardDescription>Enter your email and password to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form id="form-sign-up" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-email">Email</FieldLabel>
                  <Input {...field} id="input-email" aria-invalid={fieldState.invalid} placeholder="name@example.com" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-password">Password</FieldLabel>
                  <Input {...field} id="input-password" type="password" aria-invalid={fieldState.invalid} placeholder="********" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" form="form-sign-up" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Continue'}
          </Button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium hover:underline">Sign in</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
} 
