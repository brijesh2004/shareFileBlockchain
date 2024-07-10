import React , {useState} from 'react'

import './Display.css';
const Display = ({contract , account}) => {
    const [data, setData] = useState("");
  const getData = async()=>{
    let dataArray;
    const Otheraddress = document.querySelector('.address').value;
    try{
        if(Otheraddress){
            console.log("Other address:", Otheraddress); 
            dataArray = await contract.display(Otheraddress);

            console.log("Data array:", dataArray);
          }
          else{
            console.log(account);
            dataArray = await contract.display(account);
          }
    }
    catch(err){
        console.error("Error" , err);
        alert(err);
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
        // const str = dataArray.toString();
        // const str_array = str.split(",");
        // console.log(str);
        // console.log(str_array);
        const images = dataArray.map((item, i) => {
            console.log(item);
          return (
            <a href={`https://copper-elderly-prawn-597.mypinata.cloud/ipfs/${item.substring(34)}`} key={`a-${i}`} target="_blank" rel='noopener noreferrer'>
              <img
                key={`img-${i}`}
                // src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                src={`https://copper-elderly-prawn-597.mypinata.cloud/ipfs/${item.substring(34)}`}
                alt="new"
                className="image-list"
              ></img>
            </a>
          );
        });
        setData(images);
      } else {
        alert("No image to display");
      }
  }
  return (
    <div>
    <div className='image-list'>{data}</div>  
    <input type="text" placeholder='Enter Address' className='address'/>
    <button className='center button' onClick={getData}>Get Data</button>
 </div>
  )
}

export default Display
