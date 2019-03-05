import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col, Card, List, Icon } from "antd"
import { twoColumn } from "./../constants/flex"

const APIKEY = "73be4d439ae0fc2041dab7522c37c14f"
const BASE_URL = "http://35.185.191.136:8080"

@connect(store => store)
class DiscoveryDetail extends Component {
    state = {
        loading: false,
        item: {

        },
        detail: {
            episodes: [],
        },
    }
    componentDidMount () {
        let tvID = this.props.match.params.id
        console.log("tvID", tvID)
        this.setState({
            loading: true,
        })
        fetch(`${BASE_URL}/tv/${tvID}?api_key=${APIKEY}`)
        .then(response => (
            response.json()
            .then(data => {
                this.setState({
                    loading: false,
                    item: data,
                })
            })
            .catch(e => {
                console.log("failed to parse the response, got: ", e)
            })
        ))
        .catch(e => {
            console.log("failed on API request, got: ", e)
        })
        
        fetch(`${BASE_URL}/tv/${tvID}/season/1?api_key=${APIKEY}`)
        .then(response => (
            response.json()
            .then(data => {
                this.setState({
                    loading: false,
                    detail: data,
                })
            })
            .catch(e => {
                console.log("failed to parse the response, got: ", e)
            })
        ))
        .catch(e => {
            console.log("failed on API request, got: ", e)
        })
    }
    
    render() {
        let { activeDiscover } = this.props
        console.log("active", activeDiscover)
        let summary = {...this.state.item, ...this.state.detail}
        const action = [
            <Icon type="share-alt" key={summary.id} />,
            <Icon type="eye" key={summary.id} />,
            <Icon type="star" key={summary.id} />
        ]

        return (
            <div>
                <Row type="flex" justify="center" gutter={24}>
                    <Col {...twoColumn}>
                        <Card
                            loading={this.state.loading}
                            bordered={false}
                            style={{borderRadius: 8}}
                            cover={<img alt="cover" src={("https://image.tmdb.org/t/p/w500/"+this.state.item.poster_path)} style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}} />}
                            actions={action}
                        >
                            <Card.Meta
                                title={this.state.item.name}
                                description={<Desc {...this.state.item} />}
                            />
                        </Card>
                    </Col>
                    <Col {...twoColumn}>
                        <Episodes {...summary} />
                    </Col>
                </Row>
            </div>
        )
    }
}

const Desc = (data) => {
    let dt = new Date(data.first_air_date)
    return (
        <div>
            <span>Year: {dt.getFullYear()}</span>
            <br />
            <span>Seasson: {data.number_of_seasons}</span>
            <br />
            <span>Episode: {data.number_of_episodes}</span>
        </div>
    )
}

class Episodes extends Component {
    render() {
        let data = this.props
        return (
            <List
                loading={data.loading}
                itemLayout="vertical"
                size="small"
                bordered
                dataSource={data.episodes}
                renderItem={itemData => <EpisodeItem {...itemData} />}
                header={<EpisodeHeader {...data} />}
            >
            </List>
        )
    }
}

const EpisodeHeader = (data) => (
    <div>
        <span style={{fontWeight: "bold", fontSize: 20}}>Episodes</span>
        <br />
        <span>Seasson: {<SeasonLink {...data} />}</span>
    </div>
)

const EpisodeItem = (data) => {
    return (
        <List.Item
            extra={<Icon style={{fontSize: 24}} type="play-circle" onClick={(data) => console.log("let's watch...")}/>}
            >
            {data.episode_number}. {data.name}
        </List.Item>
    )
}

export {
    DiscoveryDetail
}

const SeasonLink = seasons => {
    let seasonLink = []
    for(let i=1, l=seasons.number_of_seasons; i <= l; i++){
        seasonLink.push(i);
    }
    return (
        <span>{seasonLink.map(link => <span key={link} style={{fontWeight: "bold"}}>{link} </span>)}</span>
    )
}