import { CreateDialog } from "@/components/create-dialog";
import DisplayAppLogo from "../banners/site-logo-display";
import SiteLogoForm from "@/components/forms/site-logo-form";
import HeroImageDisplay from "../banners/hero-image-display";
import HeroImageForm from "@/components/forms/hero-image-form";

export default function LogosPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-16 my-4">
        <h1 className="text-3xl font-bold">Your Site Logo</h1>
        <DisplayAppLogo />
        <CreateDialog
          buttonText="Upload New"
          title="Upload New"
          description="Upload your new Logo here"
          form={SiteLogoForm}
        />
      </div>
      <div className="grid grid-cols-1 gap-16 my-4">
        <h1 className="text-3xl font-bold">Your Hero Image</h1>
        <HeroImageDisplay />
        <CreateDialog
          buttonText="Upload New"
          title="Upload New"
          description="Upload your new hero image here"
          form={HeroImageForm}
        />
      </div>
    </div>
  );
}
