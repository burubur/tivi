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

const reducers = combineReducers({
    tvDiscover
})

const middleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(middleware))
middleware.run(middlewares)

export default store