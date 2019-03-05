import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from "redux-saga"
import middlewares from "./middleware"

const initialTvDiscover = {
    loading: false,
    hasMore: true,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}
  
export const tvDiscover = (state = initialTvDiscover, { type, payload }) => {
    switch (type) {
        case "tvDiscover/search":
            return {
                ...state,
                loading: true
            }

        case "tvDiscover/searched":
            return {
                ...state,
                loading: false,
                page: payload.page,
                total_pages: payload.total_pages,
                results: payload.results,
                total_results: payload.total_results
            }

        case "tvDiscover/load":
            return {
                ...state,
                loading: true
            }

        case "tvDiscover/loaded":
            let newResults = state.results.concat(payload.results)
            return {
                ...state,
                loading: false,
                results: newResults,
                page: payload.page,
                total_pages: payload.total_pages,
                total_results: payload.total_results
            }
        
        case "tvDiscover/completed":
            return {
                ...state,
                hasMore: false
            }
        default:
            return state
    }
}

const initialActiveDiscover = {
    summaryLoading: false,
    tvID: 0,
    seasonID: 0,
    isFavorited: false,
}

export const activeDiscover = (state = initialActiveDiscover, { type, payload }) => {
    switch (type) {
        case "activeDiscover/setTvShow":
            return {
                ...state,
                tvID: payload.tvID,
                seasonID: payload.seasonID
            }

        case "activeDiscover/setSession":
            console.log("current state: ", state)
            console.log("tvID: ", payload.sessionID)
            return {
                ...state,
                seasonID: payload.sessionID
            }

        case "activeDiscover/unset":
            console.log("current state: ", state)
            return {
                state
            }

        case "activeDiscover/loadTvDiscoverSummary":
            console.log("load summary")
            return {
                ...state,
                summaryLoading: true
            }

        case "activeDiscover/tvDiscoverSummaryLoaded":
            console.log("summary loaded")
            return {
                ...state,
                summaryLoading: false,
                ...payload
            }

        case "activeDiscover/loadEpisode":
            console.log("load episode")
            return {
                state
            }

        case "activeDiscover/episodeLoaded":
            console.log("episode loaded")
            return {
                state
            }

        default:
            return state
    }
}

const reducers = combineReducers({
    tvDiscover,
    activeDiscover
})

const middleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(middleware))
middleware.run(middlewares)

export default store