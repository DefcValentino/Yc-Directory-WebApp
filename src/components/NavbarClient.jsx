"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";



const NavbarClient = ({ session }) => {
  return (
    <header className="px-5 py-3 bg-white fixed w-full top-0 shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={30} />
        </Link>


        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <button onClick={() => signOut({ callbackUrl: "/" })}>
                LogOut
              </button>

              <Link href={`/users/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button onClick={() => signIn("github")}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarClient;
