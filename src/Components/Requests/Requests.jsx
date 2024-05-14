import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Requests extends Component {
  render() {
    return (
      <div>Requests</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Requests)