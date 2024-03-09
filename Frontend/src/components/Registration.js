import { useState, useEffect, useContext } from "react";
import { GlobalState } from "./GlobalState";
import axios from "axios";
function Registeration() {
    const [username,setUsername] = useState('')
    const [password,setPassword1] = useState('')
    const [password_confirm,setPassword2] = useState('')
    const [email,setEmail] = useState('')
    const [dateOfBirth,setDateOfBirth] = useState()
    const [firstName,setFirstName] = useState('')
    const [last_name,setLastName] = useState('')
    const [loading,setLoading] = useState(false)


    const [err,setErr] = useState({})
    const login = async() => {
        try {
            const res = await axios.post('/api/token/', 
            {username,password},
            {headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
         }
            )
            const token = res.data.refresh
            localStorage.setItem('refreshtoken', token)
            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.detail)
        }
    }
    const register = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/accounts/register/', 
            {username,
            email,
            first_name:firstName,
            last_name,
            password,
            password_confirm,
            dateOfBirth},
            {headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'}
            })
            login()
        } catch (err) {
            console.log(err.response.data)
            setErr(err.response.data)
        }
        setLoading(false)
    }
    return (
        <div className="container">
        <form >
            <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">Email address</label>
                <input required onChange={(e)=>setEmail(e.target.value) } type="email"
                 className={`form-control ${err['email']?'is-invalid':''}`} id="InputEmail" value={email}/>
                <div className="invalid-feedback">
                    {err['email']}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputUsername" className="form-label">Username</label>
                <input required onChange={(e)=>setUsername(e.target.value) } type="text"
                 className={`form-control ${err['username']?'is-invalid':''}`} id="InputUsername" value={username}/>
                <div className="invalid-feedback">
                    {err['username']}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputFirstName" className="form-label">First Name</label>
                <input required onChange={(e)=>setFirstName(e.target.value) } type="text"
                 className={`form-control ${err['first_name']?'is-invalid':''}`} id="InputFirstName" value={firstName}/>
                <div className="invalid-feedback">
                    {err['first_name']}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputLastName" className="form-label">Last Name</label>
                <input required onChange={(e)=>setLastName(e.target.value) } type="text"
                 className={`form-control ${err['last_name']?'is-invalid':''}`} id="InputLastName" value={last_name}/>
                <div className="invalid-feedback">
                    {err['last_name']}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputPass1" className="form-label">Password</label>
                <input required type="password"  onChange={(e)=>setPassword1(e.target.value) }
                 className={`form-control ${err['password']?'is-invalid':''}`} id="InputPass1" value={password}/>
                <div className="invalid-feedback">
                    {err['password']}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputPass2" className="form-label">Password Confirmation</label>
                <input required type="password"  onChange={(e)=>setPassword2(e.target.value) }
                 className={`form-control ${err['password_confirm']?'is-invalid':''}`} id="InputPass2" value={password_confirm}/>
                <div className="invalid-feedback">
                    {err['password_confirm']}
                </div>
            </div>

            <button type="submit" className="btn btn-primary"onClick={(e)=>{e.preventDefault();register()}} disabled={loading} >Submit</button>
        </form>
        </div>
    )
}

export default Registeration;