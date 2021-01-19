import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as apiCalls from '../api/apiCalls';

const configureStore = (addLogger = true) => {
    let localStorageData = localStorage.getItem("user-info");

    let persistedStage = {
        id: 0,
        username: '',
        email: '',
        password: '',
        isLoggedIn: false
    }

    if (localStorageData) {
        try {
            persistedStage = JSON.parse(localStorageData);
            apiCalls.setAuthorizationHeader(persistedStage);
        } catch (error) {

        }
    }

    const middleWare = addLogger ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);
    const store = createStore(authReducer, persistedStage, middleWare);

    store.subscribe(() => {
        localStorage.setItem("user-info", JSON.stringify(store.getState()));
        apiCalls.setAuthorizationHeader(store.getState());
    })

    return store;
}

export default configureStore;

