import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, MapControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

// Import CSS
import './App.css';

// Import Components
import Navbar from './components/Navbar';
import Plane from './components/Plane';
import Plot from './components/Plot';
import Building from './components/Building'

// Import ABI
import Land from './abis/Land.json';
import AddBuilding from './components/AddBuilding';

function App() {
	const [web3, setWeb3] = useState(null)
	const [account, setAccount] = useState(null)
	const [forSale, setForSale] = useState(true)
	const [AddFlag, setAddFlag] = useState(false)
	
	// Contract & Contract States
	const [landContract, setLandContract] = useState(null)

	const [cost, setCost] = useState(0)
	const [buildings, setBuildings] = useState(null)
	const [landId, setLandId] = useState(null)
	const [landName, setLandName] = useState(null)
	const [landOwner, setLandOwner] = useState(null)
	const [hasOwner, setHasOwner] = useState(false)

	const loadBlockchainData = async () => {
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()
			console.log()
			if (accounts.length > 0) {
				setAccount(accounts[0])
			}

			const networkId = await web3.eth.net.getId()

			const land = new web3.eth.Contract(Land.abi, Land.networks[networkId].address)
			setLandContract(land)

			const cost = await land.methods.cost().call()
			setCost(web3.utils.fromWei(cost.toString(), 'ether'))

			
			const buildings = await land.methods.getBuildings().call()
			console.log("buildings00",buildings)
			setBuildings(buildings)

			// Event listeners...
			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
			})

			window.ethereum.on('chainChanged', (chainId) => {
				window.location.reload();
			})
		}
	}

	// MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}
	const addBuilding = async() => {
		//alert("yes")
			setAddFlag(!AddFlag);
				
	}

	const fetchBuilding = async() => {
		//setAddFlag(!AddFlag);
		const buildings = await landContract.methods.getBuildings().call()
		console.log("buildings001",buildings)
		//const building=await landContract.methods.addBuilding("Mall",account).call()
		// //await landContract.methods.mint(id).send({ from: account, value: '1000000000000000000' })
		//console.log(building)
		// //await buyHandler(tokenId)
		 setBuildings(buildings)
		
			
}

	const setSaleFlag = async(flag) =>{
		//const building1=await landContract.methods.setForSale(landId).call()
		// let b1 = [...buildings]
		// b1[landId-1]= [...b1[landId-1]]
		// b1[landId-1][8] =flag;
		// console.log("b1",b1)
		//setBuildings(b1)
		setForSale(flag)
		

		
	}
	const addUser = async() => {
		if (web3) {
			const resp=await landContract.methods.addUsers('0xD4408619E5b3a7832A66BBe88D1a548A6a8F4671',"Kuldip",123).call()
			//setBuildings(resp)
			console.log(resp)
			

		}
	}

	useEffect(() => {
		loadBlockchainData()
	}, [account])

	const buyHandler = async (_id) => {
		//e.preventDefault();
		try {
			await landContract.methods.mint(_id).send({ from: account, value: '1000000000000000000' })
			const buildings = await landContract.methods.getBuilding(_id).call()
			
			//setBuildings(buildings)

			setLandName(buildings.name)
			setLandOwner(buildings.owner)
			setSaleFlag(buildings.isForSale)
			setHasOwner(true)
			fetchBuilding();
		} catch (error) {
			console.log(error)
			window.alert('Error occurred when buying')
		}
	}

	const transferToken = async (tokenId,to) => {
		try {
			await landContract.methods.transferFrom(account,to,tokenId).send({ from: account, to:to,tokenId:tokenId })
			const buildings = await landContract.methods.getBuildings().call()
			setBuildings(buildings)

			setLandName(buildings[tokenId - 1].name)
			setLandOwner(buildings[tokenId - 1].owner)
			setHasOwner(true)
		} catch (error) {
			console.log(error)
			window.alert('Error occurred when buying')
		}
	}

	const onFormSubmit=async(e)=>{	
		setAddFlag(false)
		e.preventDefault();
		console.log("event ",e.target.elements.BuildingName.value)
		let x = parseInt(e.target.elements.BuildingPosition.value)
		//alert(account)
		const building=await landContract.methods.addBuilding(e.target.elements.BuildingName.value,account,x).call()
			// //await landContract.methods.mint(id).send({ from: account, value: '1000000000000000000' })
			console.log(building)
			// //await buyHandler(tokenId)
			 setBuildings(building)
			 //fetchBuilding();
	}

	return (
		<div className='App'>


			
			<Navbar web3Handler={web3Handler} addBuilding={addBuilding} addUser={addUser} account={account} />
			
			{AddFlag&&<AddBuilding addBuilding={addBuilding} onFormSubmit={onFormSubmit}/>}
			{/* {AddFlag && <div style={{display:'flex',width:'20px', marginTop:'50px',marginLeft:'30px'}}>
				<form onSubmit={onFormSubmit}>
				<label>
					Name:
					<input type="text" name="name" />
				</label>
				<label>
					height:
					<input type="text" name="height" />
				</label>
				<label>
					width:
					<input type="text" name="width" />
				</label>
				<label>
					position X:
					<input type="text" name="x" />
				</label>
				<label>
					position Y:
					<input type="text" name="y" />
				</label>
				<label>
					cost in ether:
					<input type="text" name="cost" />
				</label>
				<input type="submit" value="Submit" />
				</form>
				</div>
			} */}
			<Canvas camera={{ position: [10, 15, 20], up: [0, 0, 1], far: 100 }}>
			
				<Suspense fallback={null}>
					<Sky distance={450000} sunPosition={[1, 20, 0]} inclination={0} azimuth={0.25} />

					<ambientLight intensity={0.5} />

					{/* Load in each cell */}
					
					<Physics>
						{buildings && buildings.map((building, index) => {
							
							
							if (building.owner === '0x0000000000000000000000000000000000000000') {
								return (
									<Plot
										key={index}
										position={[building.posX, building.posY, 0.1]}
										size={[building.sizeX, building.sizeY]}
										landId={index + 1}
										landInfo={building}
										setLandName={setLandName}
										setLandOwner={setLandOwner}
										setHasOwner={setHasOwner}
										setLandId={setLandId}
									/>
								)
							} else {
								return (
									<Building
										key={index}
										position={[building.posX, building.posY, 0.1]}
										size={[building.sizeX, building.sizeY, building.sizeZ]}
										landId={index + 1}
										landInfo={building}
										setLandName={setLandName}
										setLandOwner={setLandOwner}
										setHasOwner={setHasOwner}
										setLandId={setLandId}
										account = {account}
										setForSale = {setForSale}
									/>
								)
							}
						})}
					</Physics>

					<Plane />
				</Suspense>
				<MapControls />
			</Canvas>
						
			{landId && (
				<div className="info">
					{(buildings[landId-1][1] == '0x855C73ECb57DA875490EEbF482a169779b871422') && (!buildings[landId-1][8] ? <label>Marked for sale</label> :<button onClick={() => setSaleFlag(true)} className='button info--buy'>Make available for sale</button>)}

					<h1 className="flex">{landName}</h1>

					<div className='flex-left'>
						<div className='info--id'>
							<h2>ID</h2>
							<p>{landId}</p>
						</div>

						<div className='info--owner'>
							<h2>Owner</h2>
							<p>{landOwner}</p>
						</div>
						
						{!hasOwner && (
							<div className='info--owner'>
								<h2>Cost</h2>
								<p>{`${cost} ETH`}</p>
							</div>
						)}

					</div>
					{!(buildings[landId-1][1] == '0x855C73ECb57DA875490EEbF482a169779b871422') && buildings[landId-1][8] && (
						<button onClick={() =>buildings[landId-1][1] =='0x0000000000000000000000000000000000000000'?buyHandler(landId):transferToken(landId,'0x855C73ECb57DA875490EEbF482a169779b871422')} className='button info--buy'>Buy Property</button>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
