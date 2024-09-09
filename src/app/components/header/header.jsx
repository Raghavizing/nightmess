import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import "./styles.css";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark text-white p-3">
            <div className="container-fluid">
                {/* Logo and Home Link */}
                <Link href="/" className="navbar-brand text-white fs-4">NightMess</Link>

                {/* Toggler Button for Mobile */}
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/snacks" className="nav-link text-white mx-lg-3">Snacks</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/addSnacks" className="nav-link text-white mx-lg-3">Add Snacks</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/profile" className="nav-link text-white mx-lg-3">Profile</Link>
                        </li>
                    </ul>

                    {/* Sign In / User Button */}
                    <div className="d-flex align-items-center mx-lg-3">
                        <SignedOut>
                            <SignInButton>
                                <button className="btn btn-light">Sign In</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}
