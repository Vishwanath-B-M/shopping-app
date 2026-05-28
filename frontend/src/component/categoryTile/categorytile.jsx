import { useNavigate } from "react-router-dom"
export default function CategoryTile({Category}){
    const navigate=useNavigate()
     return(<><div>
        <button onClick={()=>navigate(`/singlecategory/${Category.slug}`)}>
        {console.log("Sending:", Category)}
            <p className="textxl lg:text-4xl gap-3 p-3  hover:text-5xl hover:underline">
            *{Category.name}
        </p>
        </button>
        </div>
      
        </>)
}