import { useState,useEffect,useContext} from "react";
import { GlobalState } from "./GlobalState";

function Profile(){
    const state = useContext(GlobalState)
    const [loading,setLoading] = useState(false)
    const [user] = state.userAPI.user


    return (
        <div className="container">
            <h2>Username: {user.username}</h2>
            <h2>Name: {user.first_name} {user.last_name}</h2>
            <h2>Role: {user.role === 1 ? 'Customer': 'Admin'}</h2>
        </div>
    )
}

export default Profile;