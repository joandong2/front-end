import {
    ACTION_START,
    ACTION_ERROR,
    GET_ARTICLE,
    GET_ARTICLE_BY_ID,
    POST_ARTICLE,
    // EDIT_ARTICLE,
    DELETE_ARTICLE,
    GET_CATEGORIES,
} from "../actions/articles";

const initialState = {
    articles: [],
    categories: [],
    isLoading: false,
    isLoaded: false,
    message: null,
};

export function articles(state = initialState, action) {
    switch (action.type) {
        case ACTION_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            };
        case ACTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                message: action.payload,
            };
        case GET_ARTICLE:
        case GET_ARTICLE_BY_ID:
            return {
                ...state,
                articles: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        case POST_ARTICLE:
        case DELETE_ARTICLE:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                message: action.payload,
            };
        case GET_CATEGORIES:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                categories: action.payload,
                message: action.payload,
            };
        default:
            return state;
    }
}