import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col, Card, List, Icon, Tabs } from "antd"
import { twoColumn } from "./../constants/flex"

const favKey = "local-favorites"

@connect(store => store)
class DiscoveryDetail extends Component {
    state = {
        isFavorited: false
    }

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
        this.checkFavorite(tvID)
    }

    checkFavorite(tvID) {
        let favVal = localStorage.getItem(favKey)
        if (favVal === null) {
            return
        } else {
            let indexOfFav = favVal.indexOf(tvID)
            if (indexOfFav < 0) {
                return
            }
            this.setState({
                isFavorited: true
            })
        }
    }

    onFavorite(tvID) {
        let favVal = localStorage.getItem(favKey)
        if (favVal !== null) {
            let currentFavs = JSON.parse(favVal)
            let existingFavs = Array.from(currentFavs)
            let indexOfNewFav = existingFavs.indexOf(tvID)
            if (indexOfNewFav < 0) {
                let newFavs = [tvID, ...currentFavs]
                this.storeFavorite(favKey, newFavs)
                this.setState({
                    isFavorited: true
                })
            } else {
                existingFavs.splice(indexOfNewFav, 1)
                this.storeFavorite(favKey, existingFavs)
                this.setState({
                    isFavorited: false
                })
            }
        } else {
            this.storeFavorite(favKey, [tvID])
        }
    }

    storeFavorite(key, val) {
        let stringifiedFavs = JSON.stringify(val)
        localStorage.setItem(key, stringifiedFavs)
    }
    
    render() {
        let { activeDiscover, dispatch } = this.props
        let { summary, season } = activeDiscover
        let theme = this.state.isFavorited ? "twoTone" : "outlined"

        const action = [
            <Icon type="share-alt" key={summary.id} />,
            <Icon type="eye" key={summary.id} />,
            <span onClick={()=> this.onFavorite(summary.id)}><Icon type="star" key={summary.id} theme={theme} /></span>
        ]

        return (
            <div>
                <Row type="flex" justify="center" gutter={24}>
                    <Col {...twoColumn}>
                        <Card
                            loading={summary.loading}
                            cover={<img alt="cover" src={("https://image.tmdb.org/t/p/w500/"+summary.poster_path)} />}
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
