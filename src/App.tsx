import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Main } from './pages/Main/index'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
