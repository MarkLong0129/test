import React, { Component } from 'react'
import './index.css'
import {Redirect} from 'react-router-dom'
import Three from './Model'

export default class Main extends Component {
    logout = ()=>{
        this.props.history.push('/');
        sessionStorage.clear();
    }
    render() {
        const isLogin = sessionStorage.getItem("username")
        // console.log(isLogin)
        if(isLogin)
        {
            // sessionStorage.clear()
            return (
                <div>
                    <div className="header">
                        <div className="title"><h4>title</h4></div>
                        {/* <div className="dengchu"><Link className="logout" to="/"><h4>登出</h4></Link></div> */}
                        <button className="dengchu" onClick={this.logout}>登出</button>
                    </div>
                    <div className="nav">
                        <ul>
                            <li><a href>text1</a></li>
                            <li><a href>text2</a></li>
                            <li><a href>text3</a></li>
                            <li><a href>text4</a></li>
                            
                        </ul>
                    </div>
                    <div className="big">
                        <div className="navLeft">
                            <ul>
                                <li className="searchLi"> <input type="text" name="search" className="search"  placeholder="Search"/></li>
                                <li><a href>text1</a></li>
                                <li><a href>text2</a></li>
                                <li><a href>text3</a></li>
                                <li><a href>text4</a></li>
                                
                            </ul>
                        </div>
                        <div className="box">
                            <Three/>
                        </div>
                        <div className="navRight">
                            <ul>
                                <div className="shuxin">属性</div>
                                <li className="searchLi2"> <input type="text" name="search" className="search"  placeholder="Search"/></li>
                            </ul>
                        </div>
                    </div>
                             
                </div>
                
            )
        }
        else{
            return <Redirect to="/"/>
        }
    }
}
