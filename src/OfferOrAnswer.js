import { useNavigate } from "react-router-dom";
import { useContext } from 'react'
import { AppContext } from "./context/AppContext";



const OfferOrAnswer = () => {
  const {valueOne, valueTwo, valueThree, valueFour} = useContext(AppContext)
  const [peerConnection, setPeerConnection] = valueOne
  const [displayOffer, setDisplayOffer] = valueTwo
  const [videoYou, setVideoYou] = valueThree
  const [videoThem, setVideoThem] = valueFour
  
  const navigate = useNavigate();

  const setLocalStreamForConnection = async () => {
    let localStream = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream)
    })
  
    setVideoYou(localStream)
  }
  
  const setRemoteStreamForConnection = async () => {
    let remoteStream = new MediaStream()
  
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track)=> {
        remoteStream.addTrack(track)
      })
    }
  
    setVideoThem(remoteStream)
  }
  
  const navigateToOfferPage = async () => {
  
    await setLocalStreamForConnection()
    await setRemoteStreamForConnection()
    navigate("/offer")
  }

  const navigateToAnswerPage = async () => {
    await setLocalStreamForConnection()
    await setRemoteStreamForConnection()
    navigate("/answer")
  }

  peerConnection.onicecandidate = (event) => {
    console.log("Candidate generated")
    setDisplayOffer(peerConnection.localDescription)
  }

  return (
    <div className="OfferOrAnswer">
      
        <div className="OfferOrAnswerContainer">
          <button className="OfferOrAnswerContainerButtton" onClick={navigateToOfferPage}>Initiate Connect</button>
          <button className="OfferOrAnswerContainerButtton"onClick={navigateToAnswerPage}>Accept Connect</button>
        </div>

    </div>
  );
}

export default OfferOrAnswer;
