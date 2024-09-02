import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import "./styles.css"
export default function Header() {
    return (<div className="header w-100 bg-dark p-4 text-white d-flex justify-content-between">
        <div>
            <Link href="/" className="nav-link">NightMess</Link>
        </div>
        <div className="d-flex">
            <Link href="/snacks" className="nav-link mx-2">Snacks</Link>
            <Link href="/addSnacks" className="nav-link mx-2">Add Snacks</Link>
            <Link href="/profile" className="nav-link mx-2">Profile</Link>
            <div className="mx-4">
                <SignedOut>
                    <SignInButton>
                        <button className="btn btn-light">Sign in</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    </div>)
}