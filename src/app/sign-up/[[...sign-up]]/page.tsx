import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <SignUp />
        </div>
    )
}