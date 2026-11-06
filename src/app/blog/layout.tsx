import Link from "next/link";
import { Footer } from "@/components/footer";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <>
      <header className="flex items-baseline gap-6 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
        <Link href="/" className="-my-3 inline-block py-3 text-lg font-semibold tracking-tight">
          Unwritten
        </Link>
        <Link href="/blog" className="-my-3 inline-block py-3 text-sm sm:text-base">
          Blog
        </Link>
      </header>
      <main id="content" className="px-4 pt-10 pb-20 sm:px-8 sm:pt-16 sm:pb-28 lg:px-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
