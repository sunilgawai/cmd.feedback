import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container my-12 mx-auto">
      <div className="mt-12 text-center text-sm text-gray-600">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Designed & Developed By{" "}
          <Link href="https://www.incincmedia.com/">Incinc Media</Link>
        </p>
      </div>
    </footer>
  );
}
