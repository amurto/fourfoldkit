import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone'

const DropzoneAreaExample = props => {
  return ( 
    <DropzoneArea 
        onChange={files => {props.handleChange(files)}}
      />
  )
}

export default DropzoneAreaExample;