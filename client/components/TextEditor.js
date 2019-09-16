import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import {connect} from 'react-redux'
import { updateSingleTextThunk, getEditorText, createSingleTextThunk, deleteSingleTextThunk, increaseFontSizeThunk, decreaseFontSizeThunk } from '../store/content'
import Plain from 'slate-plain-serializer'

const initialValue = Plain.deserialize(

  ''
)

class TextEditor extends Component {
    state={
        value: initialValue
    }

    onChange = (value) => {
      this.setState(value)
    }

    handleOnClickCreate = () => {
        const content = Plain.serialize(this.state.value)
        this.props.createText(this.props.currentPage, content)
        this.setState({value: initialValue})
    }

    handleOnClickDelete = () => {
        this.props.deleteText(this.props.selectedText)
  }

  handleOnClickIncrease = () => {
    this.props.increaseFontSize(this.props.selectedText)
  }

  handleOnClickDecrease = () => {
    this.props.decreaseFontSize(this.props.selectedText)
  }

    render() {
        return (
            <Fragment>
                <Editor style={{textAlign: 'center', width: '250px'}} placeholder='Text' className='box' value={this.state.value} onChange={this.onChange} />
                <button className='button is-primary space space-button' type="submit" onClick={this.handleOnClickCreate}>Create</button>
                {this.props.selectedText ?
                  <button className='button is-primary space space-button' type="submit" onClick={this.handleOnClickDelete}>Delete</button>
                : null}
            </Fragment>
        )
    }
}

const mapState = state => {
  return {
    selectedText: state.content.selectedText,
    currentPage: state.scrapbooks.currentPage
  }
}

const mapDispatch = dispatch => {
  return {
    updateText: (id, updatedProp) => dispatch(updateSingleTextThunk(id, updatedProp)),
    getEditorText: (content) => dispatch(getEditorText(content)),
    createText: (pageId, content) => dispatch(createSingleTextThunk(pageId, content)),
    deleteText: (textId) => dispatch(deleteSingleTextThunk(textId)),
    increaseFontSize: (id) => dispatch(increaseFontSizeThunk(id)),
    decreaseFontSize: (id) => dispatch(decreaseFontSizeThunk(id)),
  }
}

export default connect(mapState, mapDispatch)(TextEditor)
