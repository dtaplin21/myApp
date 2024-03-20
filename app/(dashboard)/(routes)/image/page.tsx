"use client"

import axios from "axios";
import * as z from "zod"
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Select, 
    SelectTrigger, 
    SelectValue,
     SelectContent,
     SelectItem
     } from "@/components/ui/select"


import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { formSchema, amountOptions, resolutionOptions } from "./constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";


const ImagePage = () => {
const router = useRouter();
const [images, setImages] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amoount: "1",
            resolution: "512x512",
        }
    });


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
        const response = await axios.post("/api/image", values);

        const urls = response.data.map((image: { url: string }) => image.url)

        setImages(urls);
         form.reset();

        } catch (error: any) {
            //TODO: open Pro Model
            console.log(error)
        } finally {
            router.refresh();
        }
    }

   return (
    <div>
       <Heading 
       title="Image Generation"
       description="Turn your prompt into image."
       icon={ImageIcon}
       iconColor="text-pink-700"
       bgColor="bg-pink-500/10"
       />
       <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                "
                >
                    
                <FormField 
                    name= "prompt"
                    render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-6">
                            <FormControl className="m-0 p-0">
                            <Input 
                                className="border-0 outline-none 
                                focus-visible:ring-0
                                focus-visible:ring-transparent w-full"
                                disabled={isLoading}
                                placeholder=" a picture of a moose in Montana"
                                {...field}
                            />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                control={form.control}
                name="amoount"
                render={({ field}) => (
                    <FormItem className="col-span-12 lg:col-span-2">
                        <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {amountOptions.map((option) => (
                                    <SelectItem 
                                    key={option.value}
                                    value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="resolution"
                render={({ field}) => (
                    <FormItem className="col-span-12 lg:col-span-2">
                        <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue defaultValue={field.value} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {resolutionOptions.map((option) => (
                                    <SelectItem 
                                    key={option.value}
                                    value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                    Generate
                </Button>
                </form>
            </Form>
        </div>
        <div className="space-y-4">
            {isLoading && (
                <div className="p-20">
                    <Loader />
                </div>
            )}
            {images.length === 0 && !isLoading && (
                <Empty label="No images generated yet." /> 
            )} 
            <div>
                Images will be rendered here
            </div>
        </div>
       </div>
    </div>
   )
}

export default ImagePage;