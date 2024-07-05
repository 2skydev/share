export interface BlobWithFileMetadata {
  blob: Blob
  name: string
  type: string
  size: number
}

export interface TextSharePayload {
  type: 'text'
  value: string
}

export interface FileSharePayload {
  type: 'files'
  value: BlobWithFileMetadata[]
}

export interface ClipboardSharePayload {
  type: 'clipboard'
  value: string
}

export interface ShareAsset {
  type: 'asset'
  payload: TextSharePayload | FileSharePayload | ClipboardSharePayload
}

export interface ShareAssetPrepare {
  type: 'prepare-asset'
  payload: {
    type: 'text' | 'files' | 'clipboard'
  }
}

export type ShareData = ShareAsset | ShareAssetPrepare
