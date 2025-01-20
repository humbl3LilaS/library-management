"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInSchema, TSignInSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInForm = () => {
    const form = useForm<TSignInSchema>({
        resolver: zodResolver(SignInSchema),
    });

    const onSubmit: SubmitHandler<TSignInSchema> = (values) => {
        console.log(values);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-y-4"}>
                    <h1 className={"text-2xl font-semibold font-white"}>
                        Welcome back to BookWise
                    </h1>
                    <p>Access the vast collection of resource, and stay updated</p>
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"form-input"}
                                        placeholder={"Eg: Superman"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"form-input"}
                                        placeholder={"Eg: Superman2234"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className={"form-btn"} type={"submit"}>
                        Sign In
                    </Button>
                </div>
            </form>
            <p className={"mt-3 text-center font-medium"}>
                New to BookWise?&nbsp;
                <Link href={"/sign-in"} className={"font-bold text-primary"}>
                    Create new account
                </Link>
            </p>
        </Form>
    );
};

export default SignInForm;
