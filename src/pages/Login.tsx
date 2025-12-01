import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginSchema, type TLoginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Form, Link } from "react-router";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://192.168.64.4:3000";

export default function Login() {
  const { mutate: login, isPending, isError, error } = useLogin();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  function onSubmit(data: TLoginSchema) {
    login(data, {
      onError: (err) => {
        // Extract error message
        const errorMessage =
          (err.response?.data as Error).message ||
          'Login failed. Please check your credentials.';
        toast.error(errorMessage);
      },
      onSuccess: () => {
        toast.success('Login successful! Redirecting...');
      },
    });
  }

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign in to Flowora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Form id="form-sign-in" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="input-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              {isError && (
                <div className="text-sm text-red-600 text-center">
                  {(error.response?.data as Error).message || 'An error occurred. Please try again.'}
                </div>
              )}
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" form="form-sign-in" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Continue'}
          </Button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
