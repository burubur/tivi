import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
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
    tvID: 0,
    isFavorited: false,
    summary: {
        loading: false
    },
    season: {
        loading: false,
        selectedSession: 1,
        episode: {
            loading: false,
            episodes: []
        }
    }
}

export const activeDiscover = (state = {...initialActiveDiscover}, { type, payload }) => {
    switch (type) {
        case "activeDiscover/setTvShow":
            return {
                ...state,
                tvID: payload.tvID,
                seasonID: payload.seasonID
            }

        case "activeDiscover/setSession":
            return {
                ...state,
                season: {
                    ...state.season,
                    selectedSession: payload.sessionID
                }
            }

        case "activeDiscover/unset":
            return {
                initialActiveDiscover
            }

        case "activeDiscover/loadTvDiscoverSummary":
            return {
                ...state,
                summary: {
                    loading: true
                }
            }

        case "activeDiscover/tvDiscoverSummaryLoaded":
            return {
                ...state,
                summary:{
                    loading: false,
                    ...payload
                }
            }

        case "activeDiscover/loadTvDiscoverEpisode":
            return {
                ...state,
                season: {
                    ...state.season,
                    episode: {
                        ...state.season.episode,
                        loading: true
                    }
                }
            }

        case "activeDiscover/tvDiscoverEpisodeLoaded":
            return {
                ...state,
                season: {
                    ...state.season,
                    episode: {
                        loading: false,
                        ...payload
                    }
                }
            }

        default:
            return {
                ...state
            }
    }
}

const reducers = combineReducers({
    tvDiscover,
    activeDiscover
})

const middleware = createSagaMiddleware()

const store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware)))
middleware.run(middlewares)

export default store