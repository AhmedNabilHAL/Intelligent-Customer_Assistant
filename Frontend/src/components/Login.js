import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            // toHome: this.props.authedUser !== null,
            toHome: false, // TODO: check if user is already logged in
            username: '',
            password: '',
            error:'',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async login(){
        try {
            const res = await axios.post('/api/token/', 
            {username:this.state.username,password:this.state.password},
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
    handleSubmit(e){
        e.preventDefault()
        // this.props.dispatch(setAuthedUser(this.state.userId))
        // TODO: Log user in

        this.login()
    }

    render(){

        if (this.state.toHome){
            return <Redirect to='/' />
        }
        
        return (
            <div className='box_list_container'>
                <form className='box_content' onSubmit={this.handleSubmit}>
                    <h3>
                        {this.state.error}
                    </h3>
                    <div className='box_content_item login'>
                        <input name = "username"
                            placeholder="Username"
                            onChange={this.handleChange}
                            value={this.state.username} required
                        />
                    </div>
                    <div className='box_content_item login'>
                        <input name = "password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            type='password' required
                        />
                    </div>
                    
                    <div className='box_content_item btn_container login'>
                        <button onClick={this.handleSubmit} className='btn'>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login