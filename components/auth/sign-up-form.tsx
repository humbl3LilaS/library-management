"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema, SignUpSchemaDefaultValues, TSignUpSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageUploader from "@/components/image-kit/image-uploader";
import { sleep } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
    const form = useForm<TSignUpSchema>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: { ...SignUpSchemaDefaultValues },
    });
    const onSubmit: SubmitHandler<TSignUpSchema> = async (values) => {
        await sleep(3000);
        console.log(values);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-y-4"}>
                    <h1 className={"text-2xl font-semibold font-white"}>
                        Welcome back to BookWise
                    </h1>
                    <p>
                        Please complete all fields and upload a valid id to gain access to the
                        library
                    </p>
                    <FormField
                        control={form.control}
                        name={"fullName"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
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
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gmail</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"form-input"}
                                        placeholder={"Eg: super@gmail.com"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"id"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"form-input"}
                                        placeholder={"12345689"}
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"form-input"}
                                        placeholder={"Super2222"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"idCard"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ID card</FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        onFileChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        className={"form-btn"}
                        type={"submit"}
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className={"animate-spin inline-block mr-2"} />
                                <span>Signing Up..</span>
                            </>
                        ) : (
                            <span>Sign Up</span>
                        )}
                    </Button>
                </div>
            </form>
            <p className={"mt-3 text-center font-medium"}>
                Already have an account?{" "}
                <Link href={"/sign-in"} className={"font-bold text-primary"}>
                    Sign In
                </Link>
            </p>
        </Form>
    );
};

export default SignUpForm;
