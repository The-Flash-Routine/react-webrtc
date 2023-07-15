import './css/App.css';
import OfferOrAnswer from './OfferOrAnswer'
import Answer from './Answer'
import Offer from './Offer'
import Connect from './Connect';
import { useState } from 'react'
import {getICEServers} from './data'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { AppContext } from "./context/AppContext";

const routes = [
  {
    path: "/home",
    element: <OfferOrAnswer/>,
  },
  {
    path: "/",
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
]
// Adding basename as GitHub pages will put repository name as prefic to all paths
const router = createHashRouter(routes, { basename: "/" });

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
