import { Uploader, Message, Loader, useToaster } from 'rsuite';
import ImageIcon from '@rsuite/icons/Image';
import { useState } from 'react';

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const MyIconSize = 150
const ImagePickerHook = () => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  return (
    <Uploader
        style={{ width: "100%", height: "100%", display: "block"}}
      fileListVisible={false}
      listType="pictur"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={file => {
        setUploading(true);
        previewFile(file.blobFile, value => {
          setFileInfo(value);
        });
      }}
      onSuccess={(response, file) => {
        setUploading(false);
        toaster.push(<Message type="success">Uploaded successfully</Message>);
        console.log(response);
      }}
      onError={() => {
        setFileInfo(null);
        setUploading(false);
        toaster.push(<Message type="error">Upload failed</Message>);
      }}
    >
      <button style={{ width: "100%", height: "100%" }}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <ImageIcon style={{ fontSize: MyIconSize }} />
        )}
      </button>
    </Uploader>
  );
};

export default ImagePickerHook;