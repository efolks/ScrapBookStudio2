import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cloudName, apiKey, uploadPreset} from './config/cloudinary'
import {createSingleCloudMediaThunk} from '../store/content'

class MediaUpload extends Component {

    uploadMedia = () => {
        const myWidget = cloudinary.createUploadWidget({
            cloudName: cloudName,
            apiKey: apiKey,
            uploadPreset: uploadPreset}, (error, result) => {
              if (!error && result && result.event === "success") {
                let path = result.info.secure_url
                this.props.postMedia({path: path, scrapbookId: this.props.currentScrapbook, pageId: this.props.currentPage })
              }
            }
          )
          myWidget.open()
    }

    render() {
        return (
            <div>
                <button className='button is-primary space' type='submit' onClick={this.uploadMedia}>Image</button>
            </div>
        )
    }
}

const mapState = state => {
    return {
        currentScrapbook: state.scrapbooks.currentScrapbook,
        currentPage: state.scrapbooks.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postMedia: (imageUrl) => dispatch(createSingleCloudMediaThunk(imageUrl))
    }
}

export default connect(mapState, mapDispatchToProps)(MediaUpload)
