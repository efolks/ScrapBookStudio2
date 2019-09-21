import React, {Component} from 'react'
import {Text} from 'react-konva'
import {connect} from 'react-redux'
import {deleteSingleTextThunk, getSingleText, updateSingleTextThunk} from '../store/content'

class StaticCanvasText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDragging: false
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.selectText(this.props.id)
  }

  handleOnDragEnd = () => {
    this.props.updateText(this.props.id, {
      xCoord: this.state.x,
      yCoord: this.state.y,
      size: this.state.size
    })
  }

  render() {
    return (
      <Text
        text={this.props.content}
        x={this.props.xCoord}
        y={this.props.yCoord}
        fontSize={this.props.size}
        fill={this.state.isDragging || this.props.selected === this.props.id ? 'green' : 'black'}
        onDragStart={() => {
          this.setState({
            isDragging: true
          })
        }}
        onDragEnd={this.handleOnDragEnd}
        onClick={this.handleOnClick}
      />
    )
  }
}

const mapState = (state) => {
  return {
    selected: state.content.selectedText
  }
}

const mapDispatch = dispatch => {
  return {
    delete: id => dispatch(deleteSingleTextThunk(id)),
    selectText: id => dispatch(getSingleText(id)),
    updateText: (id, updatedProp) => dispatch(updateSingleTextThunk(id, updatedProp))
  }
}

export default connect(mapState, mapDispatch)(StaticCanvasText)
