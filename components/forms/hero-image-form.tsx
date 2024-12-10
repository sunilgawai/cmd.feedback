"use client";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "../file-uploader";
import { saveImageToDB } from "@/app/actions";

const formSchema = z.object({
  image: z.any(),
});

export default function HeroImageForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      saveImageToDB(values.image[0]) // Pass the first image (as an example)
        .then(() => {
          toast.success("Image saved successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("Error saving image:", error);
          toast.error("Failed to save image. Please try again.");
        });
    });
    // try {
    //   setLoading(true);
    //   console.log(values);
    //   const { image } = values;
    //   console.log("image", image);
    //   await saveImage(image);
    //   toast.success("Operation Success");
    //   form.reset({
    //     image: "",
    //   });
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.error("Form submission error", error);
    //   toast.error("Failed to submit the form. Please try again.");
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                {/* <Input placeholder="enter title" type="text" {...field} /> */}
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFiles={1}
                  maxSize={4 * 1024 * 1024}
                  disabled={loading}
                  // progresses={progresses}
                  // pass the onUpload function here for direct upload
                  // onUpload={uploadFiles}
                  // disabled={isUploading}
                />
              </FormControl>
              <FormDescription>
                This is your hero in public display.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
