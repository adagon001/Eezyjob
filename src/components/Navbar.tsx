import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose
} from './ui/sheet';  // Importing from your component
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const ManuItems = () => (
  <>
    <Button asChild variant="link" size="lg">
      <Link href="/">Kontakt</Link>
    </Button>
    <Button asChild variant="link">
      <Link href="/">B2B</Link>
    </Button>
    <Button asChild>
      <Link href="/">Voľné pozície</Link>
    </Button>
  </>
);

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Eezyjob logo" />
          <span className="text-xl font-bold tracking-tight">Eezyjob.sk</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <ManuItems />
        </div>

        {/* Mobile Menu with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          {/* SheetContent with Logo and Close Button */}
          <SheetContent side="top" className="md:hidden">
            <div className="flex justify-between items-center p-3">
              {/* Logo inside the sheet */}
              <Link href="/" className="flex items-center gap-3">
                <Image src={logo} width={40} height={40} alt="Eezyjob logo" />
                <span className="text-xl font-bold tracking-tight">Eezyjob.sk</span>
              </Link>

              {/* SheetClose button next to the logo */}
              <SheetClose asChild>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Close Menu</span> ✕
                </Button>
              </SheetClose>
            </div>

            <div className="grid gap-3 p-2">
              <SheetClose asChild><Button asChild variant="link" size="lg">
                <Link href="/">Kontakt</Link>
              </Button></SheetClose>
              <SheetClose asChild><Button asChild variant="link">
                <Link href="/">B2B</Link>
              </Button></SheetClose>
              <SheetClose asChild><Button asChild>
                <Link href="/">Voľné pozície</Link>
              </Button></SheetClose>
            </div>

          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
