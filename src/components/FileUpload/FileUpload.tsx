'use client'

import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'

import './custom.css'

registerPlugin(FilePondPluginImagePreview)

const FileUpload = FilePond

export default FileUpload
