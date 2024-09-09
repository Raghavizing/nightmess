# NightMess

**NightMess** is a platform designed for students at Vellore Institute of Technology (VIT) to buy and sell snacks within their hostel blocks. It allows students to post snack listings and contact sellers directly, creating a convenient snack marketplace within the VIT campus.

## Features

- **Snack Listings**: Students can add, view, and manage snack listings, including snack details like name, price, and quantity.
- **Block-Based Listings**: Buyers can search for snacks available in their hostel blocks for easy transactions.
- **Seller Contact Information**: Buyers receive the seller's contact details for direct communication and purchases.
- **VIT Email Authentication**: Only students with a valid `@vitstudent.ac.in` email address can register and log in.
- **Secure Authentication**: Powered by [Clerk](https://clerk.dev) for reliable and secure authentication.
- **Database**: Snack listings and user data are stored using [MongoDB](https://www.mongodb.com).
- **Frontend Framework**: Built with [Next.js](https://nextjs.org) for fast performance and server-side rendering.
- **Styling**: Utilizes [Bootstrap CSS](https://getbootstrap.com) for responsive design and easy customization.

## Tech Stack

- **Next.js**: Frontend framework for server-side rendering and routing.
- **MongoDB**: NoSQL database for storing user and snack listing data.
- **Clerk**: Authentication platform for managing VIT email-based logins.
- **Bootstrap CSS**: CSS framework for styling and responsive layout.

## Installation

1. Clone this repository:
   git clone https://github.com/raghavizing/nightmess.git
   
3. Navigate into the project directory:
  cd nightmess

4. Install the dependencies:
  npm install

5. Set up environment variables by creating a .env.local file in the root directory with the following values:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY=
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
- MONGODB_URL = 

6. Run the development server:
  npm run dev

Open http://localhost:3000 to view the project in the browser.

## How It Works
- **User Registration/Login:** Only students with a valid VIT email (@vitstudent.ac.in) can create an account and log in using Clerk's authentication service.
- **Add Listings:** Users can post new snack listings, including the snack name, price, quantity, and their hostel block.
- **View Listings:** Buyers can browse snacks by category and block.
- **Contact Seller:** Buyers can directly view the seller’s contact details to initiate communication and arrange purchases.

## Future Enhancements
- **Search and Filter:** Implement advanced search and filtering options for snack listings.
- **Notification System:** Notify sellers when a buyer views their listing or expresses interest.
- **Rating System:** Enable buyers to rate sellers to ensure trust and reliability.
