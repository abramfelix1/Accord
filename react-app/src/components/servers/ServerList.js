import { updateServerThunk, deleterServerThunk } from "../../store/server"
import { useState } from "react"
import { useDispatch } from "react-redux"


function ServerForm() {
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const handleForm = async () => {
        await dispatch(updateServerThunk("19", name))
    }

    const handleFormDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleterServerThunk("19"))
    }

    return (
        // <form onSubmit={handleFormDelete}>
        //     <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        //     <button>submit</button>
        // </form>
            <button onClick={handleFormDelete}>submit</button>

    )
}


export default ServerForm