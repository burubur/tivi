import React, { Component } from "react"
import { connect } from "react-redux"
import InfiniteScroll from "react-infinite-scroller"
import { Col, Row, Card, Icon, Spin } from "antd"
import { multiple } from "./../constants"

@connect(store => store)
class Discover extends Component {
    componentDidMount() {
        if (this.props.tvDiscover.page === 0) {
            this.load(1)
        }
    }

    showDetail(id) {
        const { history } = this.props
        history.push("/discovery/"+id)
    }

    load(page) {
        this.props.dispatch({
            type: "tvDiscover/load",
            payload: {
                page: page || 1
            }
        })
    }

    search(query, page) {
        console.log("search")
        this.props.dispatch({
            type: "tvDiscover/search",
            payload: {
                query: query,
                page: page || 1
            }
        })
    }

    loadOrSearch(page, isSearch, query) {
        if (isSearch) {
            this.search(query, page)
        } else {
            this.load(page)
        }
    }

    render() {
        let { tvDiscover } = this.props
        let { isSearch, query } = tvDiscover
        return (
            <div>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={page => this.loadOrSearch(page, isSearch, query)}
                    hasMore={!tvDiscover.loading && tvDiscover.hasMore}
                    useWindow={true}
                >
                    <Row type="flex" justify="center" gutter={16}>
                        {Array.from(tvDiscover.results).map(item => (
                            <Col {...multiple} key={item.id} onClick={() => this.showDetail(item.id)}>
                                <TvDiscover {...item} />
                            </Col>
                        ))}
                    </Row>
                    <Spin spinning={tvDiscover.loading} style={{minWidth: "100%"}} />
                </InfiniteScroll>
                <div style={{textAlign: "center", minWidth: "100vw"}}>
                    {!tvDiscover.hasMore ? (<span>Wohoo... you completely loaded all TV Shows</span>) : null}
                </div>
            </div>
        )
    }
}

class TvDiscover extends Component {
    render() {
        let data = this.props
        return (
            <div style={{ marginBottom: "16px" }}>
                <Card
                    bordered={false}
                    cover={<Image path={data.backdrop_path} />}
                    key={data.id}
                    style={{borderRadius: 8}}
                    hoverable
                >
                    <Card.Meta
                        key={data.id}
                        title={data.name}
                        description={<span><Icon type="star" theme="twoTone" twoToneColor="#eb2f96"/> {data.vote_average}</span>}
                    />
                </Card>
            </div>
        )
    }
}


const Image = (prop) => {
    const path = `https://image.tmdb.org/t/p/w500${prop.path}`
    return (
        <img alt="cover" src={path} style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}} />
    )
}

export default Discover