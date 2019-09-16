import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getAllScrapbookMediaThunk } from '../store/scrapbooks'
import MediaPoolItem from './MediaPoolItem';

class MediaPool extends Component {

  componentDidMount() {
    this.props.fetchAllMedia(this.props.currentScrapbook)
  }

  render() {
    return (
      <div className="box"  >
        {
          this.props.allMedia.map(media => {
            return (
              <MediaPoolItem key={media.id} id={media.id} path={media.path} scrapbookId={this.props.currentScrapbook} pageId={this.props.currentPage} />
            )
          })
        }
      </div>
    )
  }
}

const mapState = state => {
    return {
        allMedia: state.scrapbooks.allScrapbookMedia,
        currentScrapbook: state.scrapbooks.currentScrapbook,
        currentPage: state.scrapbooks.currentPage
  }
}

const mapDispatch = dispatch => ({
    fetchAllMedia: (id) => dispatch(getAllScrapbookMediaThunk(id))
  })

export default connect(mapState, mapDispatch)(MediaPool)
