import { all, put, takeEvery } from "redux-saga/effects"
import {
    searchTvDiscover,
    loadTvDiscover,
    loadTvDiscoverSummary,
    loadTvDiscoverEpisode,
} from "./api" 

function * search ({payload}) {
    try {
        const response = yield searchTvDiscover(payload)
        yield put({
            type: "tvDiscover/searched",
            payload: response
        })
    } catch (e) {
        console.log("error on searching service, got:", e)
    }
}

function * activateTvDiscover ({payload}) {
    try {
        const response = yield loadTvDiscover(payload)
        yield put({
            type: "tvDiscover/loaded",
            payload: response
        })
    } catch (e) {
        console.log("error on searching service, got:", e);
    }
}

function * activateTvShow ({payload}) {
    try {
        const response = yield loadTvDiscoverSummary(payload)
        yield put({
            type: "activeDiscover/tvDiscoverSummaryLoaded",
            payload: response
        })
        yield put({
            type: "activeDiscover/loadTvDiscoverEpisode",
            payload: payload
        })
    } catch (e) {
        console.log("error on searching service, got:", e);
    }
}

function * fetchTvDiscoverEpisose ({payload}) {
    try {
        const response = yield loadTvDiscoverEpisode(payload)
        yield put({
            type: "activeDiscover/tvDiscoverEpisodeLoaded",
            payload: response
        })
    } catch (e) {
        console.log("error on episode api, got:", e);
    }
}

function * tvDiscover () {
    yield takeEvery("tvDiscover/search", search)
    yield takeEvery("tvDiscover/load", activateTvDiscover)
    yield takeEvery("activeDiscover/setTvShow", activateTvShow)
    yield takeEvery("activeDiscover/loadTvDiscoverEpisode", fetchTvDiscoverEpisose)
}


function * wellcome () {
    yield console.log("Hey!")
}

const middleware = function * sagas () {
    yield all([
        wellcome(),
        tvDiscover(),
    ])
}

export default middleware