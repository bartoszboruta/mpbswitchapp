import React from 'react'
import { store } from './src/utils'
import { Provider } from 'react-redux'
import { Main } from './Main'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
