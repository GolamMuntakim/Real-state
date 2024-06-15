// const { useContext } = require("react")
// const { AuthContext } = require("../../Providers/AuthProviders")

import { useContext } from "react"
import { AuthContext } from "../../Providers/AuthProviders"



const useAuth =() =>{
    const auth = useContext(AuthContext)
    return auth
}
export default useAuth