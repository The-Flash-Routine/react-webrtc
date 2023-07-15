import { useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";

const createOffer = async (peerConnection) => {
  let offer = peerConnection.createOffer()
  peerConnection.setLocalDescription(offer)
}

const Offer = () => {
  const navigate = useNavigate();
  const {valueOne, valueTwo} = useContext(AppContext)
  const [peerConnection, setPeerConnection] = valueOne
  const [displayOffer, setDisplayOffer] = valueTwo
  
  const navigateToConnectPage = () => {

    let answer = document.getElementById("OfferPageComponentAnswerReceived").value
    answer = JSON.parse(answer)
    peerConnection.setRemoteDescription(answer)
    navigate("/connect")
  }
  
  
  useEffect(() => {
          createOffer(peerConnection)
          .then( () => {
              console.log("Trigger")
              setDisplayOffer(peerConnection.localDescription)
            }
          )
    }, 
    []
  )
  
  return (
    <div className="Offer">
      <div className="OfferContainer">
        <div id="OfferPageComponentMessage" className="message">
          Please share this offer with other person
        </div>
        <div id="OfferPageComponentOffer">
          {JSON.stringify(displayOffer)}
        </div>
        <div id="OfferPageComponentAnswerBackMessage" className="message">
          Please add the received answer here
        </div>
        <textarea id="OfferPageComponentAnswerReceived">
          Hi
        </textarea>
        <button id="OfferPageComponentButton"onClick={navigateToConnectPage}>Answer Back</button>
      </div>
    </div>
  );
}

export default Offer;
