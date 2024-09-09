/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div 
      className="text-center d-flex flex-column justify-content-center align-items-center page" 
    >
      <div className="p-4">
        <h1 className="display-4 fw-bold">Night Mess</h1>
        <p className="lead">Dive into your indulgences</p>
        <img 
          src="https://res.cloudinary.com/dxk32tyjt/image/upload/v1725900981/snack-images/jzubprhyaz2hx9lw3xpv.png" 
          alt="Snack Image" 
          className="img-fluid my-4"
          style={{ maxWidth: "25vw" }}
        />
        <div>
        <a href="/snacks" className="btn btn-dark btn-lg rounded-pill">
          Explore Snacks
        </a>
        </div>
      </div>
    </div>
  );
}
