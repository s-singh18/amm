import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ethers } from "ethers";

// Components
import Navigation from "./Navigation";
import Tabs from "./Tabs";
import Swap from "./Swap";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Charts from "./Charts";

import {
  loadAccount,
  loadProvider,
  loadNetwork,
  loadTokens,
  loadAMM,
  // loadBalances,
} from "../store/interactions";

// ABIs: Import your contract ABIs here
// import TOKEN_ABI from '../abis/Token.json'

// Config: Import your network config here
// import config from '../config.json';

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = loadProvider(dispatch);

    const chainId = await loadNetwork(provider, dispatch);

    window.ethereum.on("chainChanged", async () => {
      window.location.reload();
    });

    // Fetch accounts
    window.ethereum.on("accountsChanged", async () => {
      console.log("account changed");
      await loadAccount(dispatch);
    });
    // await loadAccount(dispatch);

    await loadTokens(provider, chainId, dispatch);
    await loadAMM(provider, chainId, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Container>
      <HashRouter>
        <Navigation />
        <hr />
        <Tabs />
        <Routes>
          <Route exact path="/" element={<Swap />} />
          <Route exact path="/deposit" element={<Deposit />} />
          <Route exact path="/withdraw" element={<Withdraw />} />
          <Route exact path="/charts" element={<Charts />} />
        </Routes>
      </HashRouter>
    </Container>
  );
}

export default App;
