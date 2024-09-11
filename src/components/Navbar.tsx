import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Eezyjob logo" />
          <span className="text-xl font-bold tracking-tight">Eezyjob.sk</span>
        </Link>
        <Button asChild variant='link' size="lg">
          <Link href="/">Kontakt</Link>
        </Button>
        <Button asChild variant='link'>
          <Link href="/">B2B</Link>
        </Button>
        <Button asChild>
          <Link href="/">Voľné pozície</Link>
        </Button>
      </nav>
    </header>
  );
}
