import React, { Component } from "react"
import Router from "./../router"

class Body extends Component {
    render(){
        return (
            <div className="body">
                <Router />
            </div>
        )
    }
}

export {
    Body
}