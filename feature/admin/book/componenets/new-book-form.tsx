"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookSchemaDefaultValues } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/image-kit/image-uploader";
import VideoUploader from "@/image-kit/video-uploader";
import ColorPicker from "@/feature/admin/book/componenets/color-picker";
import { Loader2 } from "lucide-react";
import { bookInsertSchema, IBookInsert } from "@/database/schema";
import { addNewBook } from "@/feature/admin/book/actions/add-new-book";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const NewBookForm = () => {
    const form = useForm<IBookInsert>({
        resolver: zodResolver(bookInsertSchema),
        defaultValues: {
            ...BookSchemaDefaultValues,
        },
    });

    const router = useRouter();
    const { toast } = useToast();

    const onSubmit: SubmitHandler<IBookInsert> = async (values) => {
        const result = await addNewBook(values);
        if (!result.success) {
            return toast({
                title: "Failed to add new book",
                description: result.cause.reason,
                variant: "destructive",
            });
        }

        toast({
            title: "Added New Book",
            description: "Successfully added New Book",
        });
        return router.push("/admin/books");
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-y-8"}>
                    <FormField
                        control={form.control}
                        name={"title"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={"book-form_input"}
                                        placeholder={"Eg: Book Title"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"author"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Author
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={"book-form_input"}
                                        placeholder={"Eg: Book Author"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"genre"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Book genre
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={"book-form_input"}
                                        placeholder={"Eg: Book genre"}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"totalCopies"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Total numbers of books
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type={"number"}
                                        min={1}
                                        max={1000}
                                        className={"book-form_input"}
                                        placeholder={
                                            "Eg: Total numbers of books"
                                        }
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"rating"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Rating
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type={"number"}
                                        min={0}
                                        max={5}
                                        className={"book-form_input"}
                                        placeholder={
                                            "Eg: Total numbers of books"
                                        }
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"coverUrl"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Book Cover
                                </FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        onFileChange={field.onChange}
                                        value={field.value}
                                        folder={"books/covers"}
                                        accept={"image/*"}
                                        variant={"light"}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"coverColor"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Primary Color
                                </FormLabel>
                                <FormControl>
                                    <ColorPicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"description"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Book Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className={"book-form_input"}
                                        placeholder={"Book description"}
                                        {...field}
                                        rows={10}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"videoUrl"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Book trailer
                                </FormLabel>
                                <FormControl>
                                    <VideoUploader
                                        onFileChange={field.onChange}
                                        value={field.value}
                                        folder={"books/trailers"}
                                        accept={"video/*"}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"summary"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        "text-base font-normal text-dark-500"
                                    }
                                >
                                    Book Summary
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className={"book-form_input"}
                                        placeholder={"Book Summary"}
                                        {...field}
                                        rows={10}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        className={
                            "bg-primary-admin text-white mt-4 disabled:bg-primary-admin/50 disabled:text-white/50"
                        }
                        type={"submit"}
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2
                                    className={"animate-spin inline-block mr-2"}
                                />
                                <span>Adding New Book...</span>
                            </>
                        ) : (
                            <span>Add Book to Library</span>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default NewBookForm;
