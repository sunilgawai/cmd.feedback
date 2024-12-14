import { CreateDialog } from "@/components/create-dialog";
import BannerImagesUploadForm from "@/components/BannerImagesUploadForm";
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

export default function MenusPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Menus</h1>
        <CreateDialog
          title="Create Menu"
          description="Create your your menus here..."
          form={BannerImagesUploadForm}
        />
      </div>
      <div className="w-full p-4">
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          {images.map((image, index) => (
            <div key={index} className="border p-4">
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
      {/* <BannersForm /> */}
    </div>
  );
}
