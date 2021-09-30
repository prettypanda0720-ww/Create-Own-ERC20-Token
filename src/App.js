import './App.css';
import { useState } from 'react';
import { Button, InputGroup,FormControl} from 'react-bootstrap';
import { ethers } from 'ethers'
import Token from './artifacts/contracts/Token.sol/Token.json'
import PPToken from './artifacts/contracts/PPToken.sol/PPToken.json'


const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function App() {
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('window.ethereum', window.ethereum)
      console.log('provider', provider)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function mintToken() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
    }
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <InputGroup className="mb-3 initial-width">
            <FormControl
              placeholder="Current Balance"
              aria-label="Current Balance"
              aria-describedby="basic-addon1"
              disabled
            />
            <InputGroup.Text id="basic-addon1">PPT</InputGroup.Text>
          </InputGroup>
          <hr className="divider"/>
          <InputGroup className="mb-3 initial-width">
            <FormControl
              placeholder="Ether Amount"
              aria-label="Ether Amount"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">ETH</InputGroup.Text>
          </InputGroup>
          <Button variant="secondary" size="md" onClick={mintToken}>
            Mint
          </Button>
          <hr className="divider"/>
          <FormControl
            className="initial-width"
            placeholder="Target Address"
            aria-label="Target Address"
            onChange={e => setUserAccount(e.target.value)}
          />
          <InputGroup className="mb-3 initial-width">
            <FormControl
              className="mt-20"
              placeholder="Amount"
              aria-label="Amount"
              onChange={e => setAmount(e.target.value)}
            />
            <InputGroup.Text className="mt-20" id="basic-addon1">PPT</InputGroup.Text>
          </InputGroup>
          <Button variant="secondary" size="md" onClick={sendCoins}>
            Send
          </Button>
          {/* <button onClick={fetchGreeting}>Fetch Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
          <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />

          <br />
          <button onClick={getBalance}>Get Balance</button>
          <button onClick={sendCoins}>Send Coins</button>
          <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
          <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /> */}
        </header>
      </div>
    </div>
  );
}

export default App;
