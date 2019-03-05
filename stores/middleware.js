import { all, put, takeEvery } from "redux-saga/effects"
import { searchTvDiscover, loadTvDiscover, loadTvDiscoverSummary } from "./api" 

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

function * fetchTvDiscover ({payload}) {
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

function * fetchTvDiscoverSummary ({payload}) {
    try {
        const response = yield loadTvDiscoverSummary(payload)
        yield put({
            type: "activeDiscover/tvDiscoverSummaryLoaded",
            payload: response
        })
    } catch (e) {
        console.log("error on searching service, got:", e);
    }
}

function * tvDiscover () {
    yield takeEvery("tvDiscover/search", search)
    yield takeEvery("tvDiscover/load", fetchTvDiscover)
    yield takeEvery("activeDiscover/setTvShow", fetchTvDiscoverSummary)
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