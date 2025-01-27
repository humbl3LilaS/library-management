"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema, SignUpSchemaDefaultValues, TSignUpSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageUploader from "@/components/image-kit/image-uploader";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUp } from "@/feature/client/sign-up/actions/sign-up-action";
import PasswordField from "@/components/share/password-field";

const SignUpForm = () => {
    const form = useForm<TSignUpSchema>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: { ...SignUpSchemaDefaultValues },
    });

    const router = useRouter();

    const { toast } = useToast();
    const onSubmit: SubmitHandler<TSignUpSchema> = async (values) => {
        const result = await signUp(values);
        if (!result.success && result.cause.redirect) {
            toast({
                title: result.cause.reason,
                variant: "destructive",
                duration: 2000,
            });
            return router.push("/too-fast");
        }

        if (!result.success) {
            return toast({
                title: result.cause.reason,
                variant: "destructive",
                duration: 2000,
            });
        }

        toast({
            title: "Signed up successfully",
            duration: 2000,
        });
        return router.replace("/");
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
                        name={"universityId"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>University ID</FormLabel>
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
                                    <PasswordField onChange={field.onChange} value={field.value} />
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
                        className={"form-btn mt-4"}
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
