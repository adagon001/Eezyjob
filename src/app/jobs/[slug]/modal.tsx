"use client"; // Client-side interactivity

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import LocationInput from "@/components/LocationInput";
import RichTextEditor from "@/components/RichTextEditor";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { CreateJobValues, CreateResponseValues, createJobSchema, createResponseSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";
import { createJobResponse } from "./actions";



export default function ApplicationModalClient({ jobId, title }: { jobId: number, title: string }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const form = useForm<CreateResponseValues>({
        resolver: zodResolver(createResponseSchema),
    });

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting },
    } = form;

    async function onSubmit(values: CreateResponseValues) {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        try {
            await createJobResponse(formData, jobId);
        } catch (error) {
            alert("Something went wrong, please try again.");
        }
    }

    return (
        <>
            <Button onClick={openModal} className="w-40 md:w-fit">
                Mám záujem
            </Button>

            {isModalOpen && (

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">

                        <div className="max-h-[85vh] overflow-y-auto">

                            <div className="space-y-5 text-center">
                                <H1>Záujem o pozíciu</H1>
                                <p className="text-muted-foreground">
                                    {title}
                                </p>
                            </div>


                            <Form {...form}>
                                <form
                                    className="space-y-4"
                                    noValidate
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <FormField
                                        control={control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meno</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Meno priezvisko" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="photosList"
                                        render={({ field: { value, ...fieldValues } }) => (
                                            <FormItem>
                                                <FormLabel>Fotky roboty</FormLabel>
                                                <FormControl>
                                                    <Input multiple
                                                        {...fieldValues}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            fieldValues.onChange(file);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label onClick={() => setFocus("description")}>
                                                    Description
                                                </Label>
                                                <FormControl>
                                                    <RichTextEditor
                                                        onChange={(draft) =>
                                                            field.onChange(draftToMarkdown(draft))
                                                        }
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Telefónne číslo</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <LoadingButton type="submit" loading={isSubmitting}>
                                        Odoslať
                                    </LoadingButton>
                                    <Button onClick={closeModal} className="ml-2">Zrušiť</Button>
                                </form>
                            </Form>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
