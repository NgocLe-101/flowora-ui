import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type TLoginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
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
        <div className="flex items-center justify-center py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Sign in to Flowora</CardTitle>
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
