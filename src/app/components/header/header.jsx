import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import "./styles.css";

export default function Header() {
    return (
        <header className="header bg-dark text-white p-3">
            <div className="container d-flex flex-wrap justify-content-between align-items-center">
                {/* Logo and Home Link */}
                <div className="d-flex align-items-center mb-2 mb-md-0">
                    <Link href="/" className="nav-link text-white fs-4">NightMess</Link>
                </div>

                {/* Navigation Links */}
                <nav className="d-none d-md-flex align-items-center mb-2 mb-md-0">
                    <Link href="/snacks" className="nav-link mx-4">Snacks</Link>
                    <Link href="/addSnacks" className="nav-link mx-4">Add Snacks</Link>
                    <Link href="/profile" className="nav-link mx-4">Profile</Link>
                </nav>

                {/* Sign In / User Button */}
                <div className="d-flex align-items-center">
                    <SignedOut>
                        <SignInButton>
                            <button className="btn btn-light">Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>

                {/* Mobile Navigation Menu */}
                <nav className="d-md-none mt-2">
                    <Link href="/snacks" className="nav-link d-block">Snacks</Link>
                    <Link href="/addSnacks" className="nav-link d-block">Add Snacks</Link>
                    <Link href="/profile" className="nav-link d-block">Profile</Link>
                </nav>
            </div>
        </header>
    );
}
    