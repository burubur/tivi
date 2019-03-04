import React, { Component } from "react"
import { Route } from "react-router-dom"
import Discover from "./discover"
import Profile from "./profile"
import { DiscoveryDetail } from "./discover/detail"

class Controller extends Component {
    render() {
        return (
            <span>
                <Route exact path="/" component={Discover} />
                <Route path="/home" component={Discover} />
                <Route path="/profile" component={Profile} />
                <Route path="/discovery/:id" component={DiscoveryDetail} />
            </span>
        )
    }
}

export default Controller