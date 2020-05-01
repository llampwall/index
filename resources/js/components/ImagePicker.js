
// DOES NOT WORK AT ALL


import React, { Component } from 'react'
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



// Handles updating the postarea when its sibling compose adds a post to the database


export default class ImagePicker extends Component {
  constructor () {
    super(props)
    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: "index.html",
          options: {
            type: "input"
          }
        }
      ]
    };
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  componentWillMount() {
    this.setState({
      initialData: this.props.initialData
    }, () => {
      // console.log(this.state)
    })
  }

  // const getUser = async function() {
  //   const 
  // }

  render() {
    return (
        <div className="App">
        
            {/* Pass FilePond properties as attributes */}
            <FilePond ref={ref => this.pond = ref}
                      files={this.state.files}
                      allowMultiple={true}
                      maxFiles={3}
                      server="/api"
                      oninit={() => this.handleInit() }
                      onupdatefiles={(fileItems) => {
                          // Set current file objects to this.state
                          this.setState({
                              files: fileItems.map(fileItem => fileItem.file)
                          });
                      }}>
            </FilePond>

        </div>
    );
}
}