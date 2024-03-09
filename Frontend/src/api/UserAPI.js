import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [user,setUser] = useState()
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/api/userInfo/', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        }
                    })
                    setUser(res.data)
                    setIsLogged(true)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    
    return {
        isLogged: [isLogged, setIsLogged],
        user : [user,setUser]
    }
}

export default UserAPI
