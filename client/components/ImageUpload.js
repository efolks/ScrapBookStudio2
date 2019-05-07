import React, {Component} from 'react'
import {cloud_name, api_key, upload_preset} from './config/cloudinary.js'


class ImageUpload extends Component {
    constructor() {
        super()
        this.uploadImage = this.uploadImage.bind(this)
    }

    uploadImage() {
        var myWidget = cloudinary.createUploadWidget({
            cloudName: cloud_name,
            api_key: api_key,
            uploadPreset: upload_preset}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info);
                console.log('CLICK HERE:', result.info.secure_url);
              }
            }
          )
          myWidget.open()
    }

    render() {
        return (
            <div>
                <button className='button is-warning space' type='submit' onClick={this.uploadImage}>Image</button>
            </div>
        )
    }
}

export default ImageUpload
