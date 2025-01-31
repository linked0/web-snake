import { useState } from 'react'
import './App.css'
import CourseGoalList from './components/CourseGoalList'
import Header from './components/Header'
import goalsImg from './assets/goals.jpg'
import NewGoal from './components/NewGoal'
import ContractConnect from './components/ContractConnect'
import { AllBasic } from 'rabbit-contract-js'
import { JsonRpcProvider } from "ethers/providers";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
const { ethereum } = window;

export const ALL_BASIC_CONTRACT = import.meta.env.VITE_ALL_BASIC_CONTRACT

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

function App() {
  const [goals, setGoals] = useState<Array<CourseGoal>>([]);
  const [allBasicValue, setAllBasicValue] = useState<number>(0);

  if (!ethereum) {
    console.log("Make sure you have Metamask installed!");
    return;
  } else {
    console.log("Wallet exists! We're ready to go!")
  }
  // const provider = new ethers.BrowserProvider(ethereum);
  // console.log('Provider: ', provider)

  const localnet = "http://localhost:8545"; 

  // This is for offchain call
  const jsonRpcProvider = new ethers.JsonRpcProvider(localnet);

  // This is for onchain call
  // let privateKey = '0x58984b2bf6f0f3de4f38290ed3c541ac27bac384b378073ab133af8b314a1887' 
  // let wallet = new ethers.Wallet(privateKey, jsonRpcProvider)

  const allBasic = new AllBasic(jsonRpcProvider, ALL_BASIC_CONTRACT)
  console.log('AllBasic Contract: ', allBasic)
  let curAllBasicValue: number = 0;
  allBasic.getValue().then((value) => {
    curAllBasicValue = Number(value)
    console.log('allBasicValue:', curAllBasicValue);
  });

  function handleAddGoal(goal: string, summary: string) {
    setGoals((prevGoals) => {
      const newGoal: CourseGoal = {
        id: Math.random(),
        title: goal,
        description: summary,
      };
      return [...prevGoals, newGoal];
    });
  }

  function handleDeleteGoal(id: number) {
    console.log('Deleting Goal with ID: ', id);
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }

  function handleAllBasic() {
    allBasic.getValue().then((value) => {
      curAllBasicValue = Number(value)
      console.log('allBasicValue in handleAllBasic:', allBasicValue);
      setAllBasicValue(curAllBasicValue);
    });
  }

  return (
    <main>
    <Header image={{ src: goalsImg, alt: 'A list of goals' }}>
      <h1>Your Course Goals</h1>
    </Header>
    <NewGoal onAddGoal={handleAddGoal} />
    <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    <ContractConnect value={allBasicValue} onGetValue={handleAllBasic}/>
  </main>
  )
}

export default App
