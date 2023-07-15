import './css/App.css';
import OfferOrAnswer from './OfferOrAnswer'
import Answer from './Answer'
import Offer from './Offer'
import Connect from './Connect';
import { useState } from 'react'
import {getICEServers} from './data'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AppContext } from "./context/AppContext";


const router = createBrowserRouter([
  {
    path: "/home",
    element: <OfferOrAnswer/>,
  },
  {
    path: "/offer",
    element: <Offer/>,
  },
  {
    path: "/answer",
    element: <Answer/>,
  },
  {
    path: "/connect",
    element: <Connect/>,
  }
]);

const App = () => {
  const [peerConnection, setPeerConnection] = useState(() => new RTCPeerConnection(getICEServers()));
  const [displayOffer, setDisplayOffer] = useState()
  const [videoYou, setVideoYou] = useState()
  const [videoThem, setVideoThem] = useState()

  return (
    <div className="App">
      <AppContext.Provider 
          value = {{ 
            valueOne: [peerConnection, setPeerConnection], 
            valueTwo:[displayOffer, setDisplayOffer],
            valueThree:[videoYou, setVideoYou],
            valueFour:[videoThem, setVideoThem]

      }} >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
