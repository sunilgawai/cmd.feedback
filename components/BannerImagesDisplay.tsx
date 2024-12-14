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
import { getBannerImages } from "@/app/actions";
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
import { deleteAllBanners } from "@/app/actions";
import { toast } from "sonner";

const images = [
  "/slider/1.png",
  "/slider/2.png",
  "/slider/3.png",
  "/slider/4.png",
  "/slider/5.png",
  "/slider/6.png",
  "/slider/7.png",
  "/slider/8.png",
  "/slider/9.png",
  "/slider/10.png",
  "/slider/1.png",
  "/slider/11.png",
  "/slider/12.png",
];

export default function BannerImagesDisplay() {
  const [loading, setLoading] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const handleFlushing = async () => {
    try {
      console.log("deleting banners");
      await deleteAllBanners();
    } catch (error) {
      toast("Failed to delete images");
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
        const bannerImages = await getBannerImages();
        if (bannerImages && bannerImages.images) {
          const urls = bannerImages.images.map(
            (img) => `data:image/png;base64,${img.image}`
          );
          setImageUrls(urls);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching banner images:", error);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="text-center">Banner Images Loading...</div>;
  }

  if (imageUrls.length === 0) {
    return <div className="text-center">No banner images found.</div>;
  }

  return (
    <Fragment>
      <h2 className="text-5xl text-center md:text-6xl font-serif mb-12">
        WHY THE CHANGE
      </h2>
      <p className="text-lg text-center mb-12">
        Change drives growth, creativity, and new opportunities. Our rebranding
        reflects our dedication to meeting evolving tastes and expectations.
        With a refined logo, thoughtfully curated interiors, and an updated
        menu, we're excited to elevate your experience with us
      </p>
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
              <CarouselItem key={index}>
                <div className="flex justify-center items-center">
                  <Image
                    src={url}
                    alt={`Banner ${index + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-h-[70vh] object-contain"
                    priority={index === 0}
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
        <h1 className="text-3xl font-bold">All Uploaded Banners</h1>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Flush All Banners</Button>
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
