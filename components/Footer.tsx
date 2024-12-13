import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container my-4 mx-auto">
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="mx-auto">
          <Link href="/" className="text-2xl font-serif mb-6 block">
            ifood
          </Link>
          <p className="text-sm text-gray-600">
            A restaurant is a business that prepares and serves
          </p>
        </div>
        {[
          {
            title: "About Us",
            links: ["Orders", "Contact"],
          },
          {
            title: "Company Plans",
            links: ["Business", "Health & Safety"],
          },
          {
            title: "Terms of Service",
            links: ["Privacy & Policy", "Request Item"],
          },
          {
            title: "Follow Us",
            links: ["Facebook", "Instagram"],
          },
        ].map((column, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-medium">{column.title}</h3>
            {column.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href="/"
                className="block text-sm text-gray-600"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Designed and developed by{" "}
          <Link href="https://www.incincmedia.com/">
            https://www.incincmedia.com
          </Link>
        </p>
      </div>
    </footer>
  );
}
