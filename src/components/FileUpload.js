import React , {useState}from 'react'
import './FileUpload.css'
import axios from 'axios';
const FileUpload = ({contract , account}) => {
    const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API}`,
            pinata_secret_api_key:`${process.env.REACT_APP_PINATA_SECREAT_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
         console.log(ImgHash);
        contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };




    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        console.log(e.target.files[0].name)
        setFileName(e.target.files[0].name);
        e.preventDefault();
      };
  return (
    <div className='top'>
    <form className='form' onSubmit={handleSubmit}>
      <label htmlFor='file-upload' className='choose'>
        Choose file
      </label>
      <input
        type='file'  
        id='file-upload'
        name='data'
        onChange={retrieveFile}
        disabled={!account}
      />
      <span className='textArea'>Image: {fileName}</span>
      <button type='submit' className='upload' disabled={!file}>
        Upload File
      </button>
    </form>
  </div>
  )
}

export default FileUpload
