import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Dashboard } from "./dashboard/page";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { PiggyBank } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <PiggyBank />
          <h1 className="text-xl font-bold">QuickBank</h1>
        </Link>
        <nav className="flex space-x-4 items-center">
          <Link href="/login" className={buttonVariants({ variant: "link" })}>
            Login
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/signup"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <p className="text-primary underline mx-auto italic font-bold pt-8 ">
        This is a demo website to demonstrate browser attacks made possible by
        insecure code.
      </p>
      <main className="p-4 flex flex-col items-center justify-center mx-auto max-w-[800px]">
        <section className="flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="italic text-4xl md:text-6xl font-bold mb-6">
              Banking Made Simple and Fast
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                className={buttonVariants({
                  variant: "outline",
                })}
                href="https://github.com/your-username/your-repo"
              >
                <Icons.gitHub className="size-6" />
                <span>Check GitHub</span>
              </Link>
            </div>
          </div>
        </section>
        <Card>
          <Dashboard />
        </Card>
      </main>
    </div>
  );
}
