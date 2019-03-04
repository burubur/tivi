import React, { Component } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import { connect } from "react-redux"
import { Layout, Row, Col, Icon, Input } from "antd"
import { Body } from "./body"
import { Single } from "./../constants"
import "./index.css"

@connect(store => store)
class Base extends Component {
    render() {
        const { dispatch } = this.props
        const onSearch = (query) => {
            dispatch({
                type: "tvDiscover/search",
                value: query
            })
        }

        return (
            <Router>
                <Layout>
                    <Layout.Header className="header">
                        <Row type="flex" justify="space-between">
                            <Col><Brand /></Col>
                            <Col {...Single}>
                                <Input.Search onSearch={onSearch} placeholder="type title, or artist, or ..." style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}} />
                            </Col>
                            <Col><User /></Col>
                        </Row>
                    </Layout.Header>
                    <Layout.Content>
                        <Body />
                    </Layout.Content>
                    <Layout.Footer className="footer">
                        <CopyRight />
                    </Layout.Footer>
                </Layout>
            </Router>
        )
    }
}

const Brand = () => {
    return(
        <Link to="/">
            <img alt="brand" src="https://storage.googleapis.com/stat-images/tivi-brand.png" className="brand"/>
        </Link>
    )
}

const User = () => {
    return(
        <Link to="/profile">
            <Icon type="user" style={{cursor: "pointer"}} />
        </Link>
    )
}

const CopyRight = () => {
    const author = "@burhanmubarok"
    const year = new Date().getFullYear()
    return (
        <div className="footer">
            Copyright {author} {year}
        </div>
    )
}

export {
    Base
}
