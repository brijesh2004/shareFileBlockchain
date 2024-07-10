import {useState , useEffect} from 'react';
import { ethers } from 'ethers';
// Importing API
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [account , setAccount] = useState("");
  const [contract , setContract] = useState(null);
  const [provider , setProviders] = useState(null);
  const [modelOpen , setModelOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const wallet =async () =>{
      if(provider){
        
        window.ethereum.on('chainChanged' , ()=>{
          window.location.reload();
        })

        window.ethereum.on("accountsChanged" , ()=>{
          window.location.reload();
        })


        await provider.send('eth_requestAccounts' , []);
        const signer = provider.getSigner();
        const address =await signer.getAddress();
        console.log(address);
        setAccount(address);
        let contractAddress = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;

        const contract = new ethers.Contract(
          contractAddress , Upload.abi , signer
        )
        console.log(contract)
        setContract(contract);
        setProviders(provider);
      }
      else {
        alert("Metamask is not installed");
      }
    }
    provider && wallet();
  } , []);

  return (
    <>
    {
      !modelOpen &&(
        <button className='share' onClick={()=>setModelOpen(true)}>Share</button>
      )
    }

    {
      modelOpen &&(
        <Modal setModelOpen={setModelOpen} contract={contract}/>
      )
    }
    <div className="App">
      <h1 style={{color:'white'}}>Gdrive 3.0</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <p style={{color:'white'}}>Account : {account ? account:'Not Connected'}</p>
      <FileUpload account={account} contract={contract}/>
      <Display account={account} contract={contract}/>
    </div>
    </>
  );
}

export default App;
