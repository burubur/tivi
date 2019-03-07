import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import { Layout, Row, Col, Input } from "antd"
import { Body } from "./body"
import { Brand, User } from "./header"
import Footer from "./footer"
import { single } from "./../constants"
import "./index.css"

@connect(store => store)
class Base extends Component {
    render() {
        const { dispatch } = this.props
        const onSearch = (query) => {
            if (query !== "") {
                dispatch({
                    type: "tvDiscover/search",
                    payload: query
                })
            } else {
                dispatch({
                    type: "tvDiscover/load",
                })
            }
        }

        return (
            <Router>
                <Layout>
                    <Layout.Header className="header">
                        <Row type="flex" justify="space-between">
                            <Col><Brand /></Col>
                            <Col {...single}>
                                <Input.Search onSearch={onSearch} placeholder="type title, or artist, or ..." style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}} />
                            </Col>
                            <Col><User /></Col>
                        </Row>
                    </Layout.Header>
                    <Layout.Content>
                        <Body />
                    </Layout.Content>
                    <Layout.Footer className="footer">
                        <Footer />
                    </Layout.Footer>
                </Layout>
            </Router>
        )
    }
}

export default Base