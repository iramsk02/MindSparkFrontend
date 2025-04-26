import { useNavigate } from "react-router-dom"

export default function Button({content,navigateto}){
    const navigate_hook=useNavigate()
    const path=`/${navigateto}`
    console.log(path)
    const navigate=()=>{
        navigate_hook(path)

    }
    return(
        <div>
            <button className="  text-gray-400 p-1 text-sm  hover:text-gray-300 transition" onClick={navigate}>{content}</button>
        </div>
    )
}