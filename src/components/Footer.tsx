import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Eezyjobs.sk</h3>
            <p className="text-sm text-muted-foreground">
              Stabilná práca v zahraničí
            </p>
          </div>
          <div className="col-sm-6 col-md-4 ">
            <h3 className="text-xl font-semibold ">Kontakt</h3>
            <p>Andrej Danko<br />+421 948 555 840<br /><a href="mailto:a.danaj@eezyjob.sk">a.danaj@eezyjob.sk</a></p>
          </div>
          <div className="col-sm-6 col-md-4">
            <h3 className="text-xl font-semibold">Sídlo</h3>
            <p>Eezyjob.sk s.r.o<br />Garbiarska 8<br />03101 Liptovský Mikuláš</p>
          </div>
          {/* <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div> */}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eezyjob, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
