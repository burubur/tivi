import React from "react"
import { Icon } from "antd"
import { Link } from "react-router-dom"

export const Brand = () => {
    return(
        <Link to="/">
            <img alt="brand" src="https://storage.googleapis.com/stat-images/tivi-brand.png" className="brand"/>
        </Link>
    )
}

export const User = () => {
    return(
        <Link to="/profile">
            <Icon type="user" style={{cursor: "pointer"}} />
        </Link>
    )
}
