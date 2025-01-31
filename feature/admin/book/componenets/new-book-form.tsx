"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookSchema, BookSchemaDefaultValues, TBookSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/image-kit/image-uploader";
import VideoUploader from "@/image-kit/video-uploader";
import ColorPicker from "@/feature/admin/book/componenets/color-picker";

const NewBookForm = () => {
    const form = useForm<TBookSchema>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            ...BookSchemaDefaultValues,
        },
    });

    const onSubmit: SubmitHandler<TBookSchema> = async (values) => {
        console.log(values);
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
                                    Total numbers of books
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type={"number"}
                                        min={1}
                                        max={1000}
                                        className={"book-form_input"}
                                        placeholder={"Eg: Total numbers of books"}
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
                                    Rating
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type={"number"}
                                        min={0}
                                        max={5}
                                        className={"book-form_input"}
                                        placeholder={"Eg: Total numbers of books"}
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
                                    Book Cover
                                </FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        onFileChange={field.onChange}
                                        value={field.value}
                                        folder={"books/covers"}
                                        accept={"image/*"}
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
                                    Primary Color
                                </FormLabel>
                                <FormControl>
                                    <ColorPicker value={field.value} onChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"description"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={"text-base font-normal text-dark-500"}>
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
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
                                <FormLabel className={"text-base font-normal text-dark-500"}>
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
                    <Button className={"py-6 bg-primary-admin text-white"} type={"submit"}>
                        Add Book
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default NewBookForm;
