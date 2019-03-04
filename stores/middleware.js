import { all, put, takeEvery } from "redux-saga/effects"
import { searchTvDiscover, loadTvDiscover } from "./api" 

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

function * tvDiscover () {
    yield takeEvery("tvDiscover/search", search)
    yield takeEvery("tvDiscover/load", fetchTvDiscover)
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