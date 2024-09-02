import "./styles.css"
export default function footer(){
    return(
        <div className="footer w-100 bg-dark text-white py-2">
            <p className="text-center my-auto">Copyright @{new Date().getFullYear()}</p>
        </div>
    )
}