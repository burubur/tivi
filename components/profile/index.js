import React from "react"
import { Row, Col, Card, List, Divider, Tabs } from "antd"
import { multiple } from "./../constants"
const Profile = () => (
    <Row type="flex" justify="center">
        <Col {...multiple}>
            <Card
                cover={<img alt="example" src="https://storage.googleapis.com/stat-images/blank-user.png" style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}} />}
                style={{borderRadius: 8}}
                bordered={false}
            >
                <Card.Meta
                    title={<span>Username</span>}
                    description={<Desc />}
                />
            </Card>
        </Col>
    </Row>
)

const Desc = () => {
    let watchlist = localStorage.getItem("local-watchlist")
    let favs = localStorage.getItem("local-favorite")
    return (
        <div>
            <Divider />
            <Tabs
                type="card"
            >
                <Tabs.TabPane tab="Watch List" key="watchlist">
                    <List
                        size="small"
                        dataSource={[]}
                    >
                    </List>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Favorites" key="fav">
                    <List
                        size="small"
                        dataSource={[]}
                    >
                    </List>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Profile