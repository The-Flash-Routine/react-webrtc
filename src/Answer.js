import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useEffect, useContext, useState } from 'react'


const Answer = () => {

  const {valueOne, valueTwo} = useContext(AppContext)
  const [peerConnection, setPeerConnection] = valueOne
  const [displayOffer, setDisplayOffer] = valueTwo

  const navigate = useNavigate();
  
  const navigateToConnectPage = () => {
    navigate("/connect")
  }

  const generateAnswer = async () => {
      let offer = document.getElementById("AnswerPageComponentOfferReceived").value
      offer = JSON.parse(offer)
      await peerConnection.setRemoteDescription(offer)
      let answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      document.getElementById("AnswerPageComponentAnswer").value = JSON.stringify(answer)
      console.log(offer)
  }

  return (
    <div className="Answer">
      <div className="AnswerContainer">
        <div id="AnswerPageComponentOfferMessage" className="message">
          Please add the received offer here
        </div>
        <textarea id="AnswerPageComponentOfferReceived">
          Hi
        </textarea>
        <div id="AnswerPageComponentAnswerMessage" className="message">
          Please share the generated answer
        </div>
        <button id="AnswerPageComponentButton" onClick={generateAnswer}>Generate Answer</button>
        <textarea id="AnswerPageComponentAnswer">
        </textarea>
        <button id="AnswerPageComponentConnectButton" onClick={navigateToConnectPage}>Connect</button>
      </div>
    </div>
  );
}

export default Answer;
