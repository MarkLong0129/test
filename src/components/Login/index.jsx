import React, { Component } from 'react'
// import {withRouter} from 'react-router-dom'
// import Main from '../../main'
import './index.css'
import man from '../../pictures/man.png'
import lock from '../../pictures/lock.png'


export default class Login extends Component {
    // state = {
    //     username:'',
    //     password:''
    // }

    // saveUsername = (event)=>{
    //     this.setState({username:event.target.value})
    // }
    // savePassword = (event)=>{
    //     this.setState({password:event.target.value})
    // }
    
    login = ()=>{
        const{username , password} = this
        // console.log(username , password)
        if (username.value === "") {
 
            alert("请输入用户名");
     
        } else if (password.value  === "") {
     
            alert("请输入密码");
     
        } else if(username.value === "admin" && password.value === "123"){
     
            this.props.history.push('/main');
            sessionStorage.setItem("username",username.value);
     
        } else {
     
            alert("请输入正确的用户名和密码！")
        
        }
    }
    
    render() {
        return (
            <div className="design">
                <h1>登 录</h1>
                <div className="item">
                    
                    <img src={man} alt=""/>
                    <input ref={c => this.username = c} type="text" name="username"  placeholder="Username"/><br/>
                    {/* <input onChange={this.saveUsername} type="text" name="username"  placeholder="Username"/><br/> */}
                    <img src={lock} alt=""/>
                    <input ref={c => this.password = c} type="password" name="password"  placeholder="Password"/>
                    {/* <input onChange={this.savePassword} type="password" name="password"  placeholder="Password"/> */}
                </div>
                <button onClick ={this.login}>登 录</button>
                
            </div>
           
        )
    }
}
