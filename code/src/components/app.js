import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid } from "recharts"


class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Bitcoin Ticker</h1>
          <div className="container">
            <LineChart width={800} height={400} data={this.state.tickerMessages}>
              <CartesianGrid strokeDasharray="3 3" stroke="#515151"/>
              <YAxis dataKey="price"/>
              <XAxis dataKey="time"/>
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#37a8ee" />
            </LineChart>
          </div>
      </div>
    )
  }

}

export default App
