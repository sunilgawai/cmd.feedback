"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { deleteAllMenus, getBannerImages, getMenuImages } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateDialog } from "@/components/create-dialog";
import MenuImagesUploadForm from "@/components/forms/menuImagesUploadForm";

export default function MenusPage() {
  const [loading, setLoading] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const handleFlushing = async () => {
    try {
      console.log("deleting menus");
      await deleteAllMenus();
    } catch (error) {
      toast("Failed to delete menus");
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const menuImages = await getMenuImages();
        if (menuImages && menuImages.images) {
          const urls = menuImages.images.map(
            (img) => `data:image/png;base64,${img.image}`
          );
          setImageUrls(urls);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching menus:", error);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="text-center">Menus Loading...</div>;
  }

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Menus</h1>
        <CreateDialog
          title="Upload your Menus"
          description="Make sure images are compressed."
          form={MenuImagesUploadForm}
        />
      </div>
      <div className="w-full grid place-content-center gap-4 py-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
          setApi={setApi}
          className="w-full max-w-4xl"
        >
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div
                  key={index}
                  className="relative aspect-square rounded-full overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`Banner ${index + 1}`}
                    width={0}
                    height={0}
                    // sizes="100vw"
                    className="relative aspect-square rounded-full overflow-hidden"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Menus</h1>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={imageUrls.length === 0} variant="destructive">
              Flush All Menus
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                banners.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleFlushing()}
                className="bg-red-500"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="w-full p-4">
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          {imageUrls.map((image, index) => (
            <div key={index} className="border p-4">
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
