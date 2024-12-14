import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container my-20 mx-auto">
      <div className="mt-12 text-center text-sm text-gray-600">
        <p className="py-8">
          Copyright &copy; {new Date().getFullYear()} | Designed & Developed By{" "}
          <Link href="https://www.incincmedia.com/">Incinc Media</Link>
        </p>
      </div>
    </footer>
  );
}
