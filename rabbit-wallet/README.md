# Simple Ethereum Wallet

This is a simple implementation of a web based Ethereum wallet built with React, Typescript & Web3.js
<br/>
<img src="./public/screenshotdemo.png" />
<br/>

<a  href="https://oh-ethereum-wallet.herokuapp.com"  target="_blank">Demo</a>

## Setup
### How to add extension to Chrome
#### Build
`yarn build
`
#### manifest.json
It's located in `public/manifest.json`.

#### Install extension for testing
1. Go to Extensions page typing `chrome://extensions/` in URL input window.
2. Enable `Developer mode` in the right top corner.
3. Click on the “LOAD UNPACKED”(압축해제된 확장 프로그램을 로드합니다.) button
4. Select `build` folder.

## Run
```
yarn start
```
---
# Old version
## moralis-wallet
This is the wallet forked form Moralis wallet created at 12th Nov. 2024.
![Alt text](docs/Moralis-Crypto-Wallet.png)

# Features

- Import Wallets via Private Key
- Add any ECR20 Token
- Switch between networks. Supported Networks:
  - Ethereum
  - Polygon
  - Optimism
  - Palm
  - Avalanche C-Chain
  - Near Protocol
  - Starknet
  - Aurora
- Transfer Ecr20 tokens
- View Wallet & Tokens Balance

## ECR20 TOKEN - PlayoCoin (PLAYCN)

The PLAYCN was created using Solidity ... openzeppelin... It's deployed to the Testnet on the Polygon network with 1000 total supply for demo sakes.

<pre>
`
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.2; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
contract PolyCoin is ERC20 { 
    constructor() ERC20("PlayoCoin", "PLAYCN") { 
        _mint(msg.sender, 1000 * 10 ** decimals()); 
    }
}
`
</pre>
<br/>
Token Contract Address: 0x9f20AE147f2ad0BF8CE950b13264ccACaA66108A
<br/>
<a href="https://mumbai.polygonscan.com/address/0x9f20AE147f2ad0BF8CE950b13264ccACaA66108A" target="_blank">View on PolygonScan</a>

## Add PLAYCN TOKEN

1. <img src="./public/screenshot-add-custom-playcn-token.png" />
   <br/>
2. <img src="./public/screenshot-playcn-added.png" />

## Configutations

You will need to get a project key from infuria.io (or preferred provider) and edit in your env file as:
`REACT_APP_INFURIA_ID=<YOUR INFURIA PROJECT ID>`

## Running the project

In the project directory:

### `yarn install`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

