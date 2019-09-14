import React, {Component} from 'react'
import TextEditor from './TextEditor'
import MediaUpload from './MediaUpload'
import MediaPool from './MediaPool'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMediaPoolDisplayed: false
    }
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {isMediaPoolDisplayed: !prevState.isMediaPoolDisplayed}
    })
  }

  render() {
    return (
      <div className="box toolbar">
        <h1 className="title">Toolbar</h1>
        <MediaUpload />
        <TextEditor />
        <button type='button' className='button is-primary space space-button' onClick={this.handleClick}>Media Pool</button>
        {this.state.isMediaPoolDisplayed ? <MediaPool scrapbookId={this.props.scrapbookId}/> : null}
      </div>
    )
  }
}

export default Toolbar
