import React, {Component} from 'react'
import {connect} from 'react-redux'
import { createSingleMediaThunk } from '../store/content';

 class MediaPoolItem extends Component {

  handleMountClick = () => {
        this.props.mountToCanvas({path: this.props.path,
            scrapbookId: this.props.scrapbookId,
            pageId: this.props.pageId
        })
      }

  render() {
      return (
              <div>
                <br />
                <img onClick={this.handleMountClick} width='120px' height="120px" src={this.props.path}></img>
              </div>
            )
  }
}

const mapDispatch = (dispatch) => ({
    mountToCanvas: (path) => dispatch(createSingleMediaThunk(path)),
})

export default connect(null, mapDispatch)(MediaPoolItem)
