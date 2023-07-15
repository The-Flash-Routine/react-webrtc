import { useContext, useRef, useEffect } from 'react'
import { AppContext } from "./context/AppContext";

const Connect = () => {
  
  const {valueThree, valueFour} = useContext(AppContext)
  const [videoYou] = valueThree
  const [videoThem] = valueFour

  const videoRefYou = useRef(null);
  const videoRefThem = useRef(null);


  useEffect(() => {
    videoRefYou.current.srcObject = videoYou;
    videoRefThem.current.srcObject = videoThem;
  }, []);

  return (
    <div className="Connect">
      
        <div className="ConnectContainer">
          <video id="ConnectYou" className="ConnectComponent" autoPlay ref={videoRefYou}/>
          <video id="ConnectThem" className="ConnectComponent" autoPlay ref={videoRefThem}/>
        </div>

    </div>
  );
}

export default Connect;
