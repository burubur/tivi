import "@babel/polyfill"
import React from "react";
import { render } from "react-dom";
import { RootComponent } from "./components"
import { Provider } from "react-redux"
import store from "./stores/store"

const rootElement = document.querySelector("#root")

const RootApp = () => (
    <Provider store={store}>
        <RootComponent />
    </Provider>
)

render(<RootApp />, rootElement)