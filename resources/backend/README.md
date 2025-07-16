# Transaction Delegator

## 개요

이 서비스는 사용자가 간단한 API 호출을 통해 EVM 네트워크에 ERC20 토큰을 발행(mint)할 수 있도록 지원합니다. 사용자는 자신의 토큰 잔액을 조회하고, 발행 요청 내역을 확인할 수 있습니다.

## 기술 스택

- **서버:** Express.js, TypeScript
- **데이터베이스:** Sqlite
- **블록체인 상호작용:** web3.js
- **환경 변수 관리:** dotenv

## 사전 준비

1. **Node.js 설치:** [Node.js 공식 사이트](https://nodejs.org/)에서 설치
2. **Holesky Testnet ETH 확보:**
   - [Holesky Faucet 1](https://holesky-faucet.pk910.de/)
   - [Holesky Faucet 2](https://stakely.io/en/faucet/ethereum-holesky-testnet-eth)
   - [Holesky Faucet 3](https://www.holeskyfaucet.io/)
3. **환경 변수 설정:**
   - `.env` 파일을 프로젝트 루트에 생성하고, 아래와 같이 작성

```env
PORT=3000
DATABASE_FILE=./database.sqlite
WEB3_PROVIDER_URL=https://holesky.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=YOUR_PRIVATE_KEY
CONTRACT_ADDRESS=0xd16d41635C7ECe3c13B2c7Eae094a92aDF41bB2a
```

## Setup and Start
### Install
```
yarn
```
### Compile
```
yarn dev
```
### Start
```
yarn start
```