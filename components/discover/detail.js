import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col, Card, List, Icon, Tabs } from "antd"
import { twoColumn } from "./../constants/flex"

@connect(store => store)
class DiscoveryDetail extends Component {
    componentDidMount () {
        let tvID = this.props.match.params.id
        const { dispatch } = this.props
        dispatch({
            type: "activeDiscover/setTvShow",
            payload: {
                tvID: tvID,
                seasonID: 0
            }
        })
    }
    
    render() {
        let { activeDiscover, dispatch } = this.props
        let { summary, season } = activeDiscover

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
                            loading={summary.loading}
                            bordered={false}
                            style={{borderRadius: 8}}
                            cover={<img alt="cover" src={("https://image.tmdb.org/t/p/w500/"+summary.poster_path)} style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}} />}
                            actions={action}
                        >
                            <Card.Meta
                                title={summary.name}
                                description={<Desc {...summary} />}
                            />
                        </Card>
                    </Col>
                    <Col {...twoColumn}>
                        <Detail summary={summary} episode={season.episode} dispatch={dispatch} />
                    </Col>
                </Row>
            </div>
        )
    }
}

const Desc = (summary) => {
    let dt = new Date(summary.first_air_date)
    return (
        <div>
            <span>Year: {dt.getFullYear()}</span>
            <br />
            <span>Seasson: {summary.number_of_seasons}</span>
            <br />
            <span>Episode: {summary.number_of_episodes}</span>
            <br />
            <span>Vote: {summary.vote_average}</span>
        </div>
    )
}

const Detail = ({ summary, episode, dispatch }) => {
    let tvID = summary.id
    const onSeasonChange = seasonID => {
        dispatch({
            type: "activeDiscover/loadTvDiscoverEpisode",
            payload: {
                tvID: tvID,
                seasonID: seasonID
            }
        })
    }
    return (
        <div>
            {summary && summary.seasons && (
                <Tabs
                    defaultActiveKey="0"
                    onChange={onSeasonChange}
                >
                    {Array.from(summary.seasons).map(sea => (
                        <Tabs.TabPane
                            tab={sea.name}
                            key={sea.season_number}
                        >
                            <Episodes {...episode} />
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            )}
        </div>
    )
}

const Episodes = ({ episodes, loading }) => {
    return (
        <div>
            {episodes && (
                <List
                    loading={loading}
                    size="small"
                    bordered
                >
                    {Array.from(episodes).map((epi, i) => (
                        <List.Item key={epi.id}>
                            <span style={{minWidth: "90%"}}>{i+1}. {epi.name}</span>
                            <span style={{minWidth: "10%", textAlign: "right"}}><Icon type="play-circle" theme="twoTone" style={{fontSize: 24}} /></span>
                        </List.Item>
                    ))}
                </List>
            )}
        </div>
    )
}

export {
    DiscoveryDetail
}
