import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from '../logo.svg'

const Navbar = ({ web3Handler,addBuilding,addUser, account }) => {
    return (
        <nav className="flex-between">
            {/* <div style={{display:'flex',justifyContent:'flex-between'}}>
            <button style={{marginRight:'20px'}} onClick={addBuilding} className="button">Add Building</button>
            <button className="button">Register</button>
            </div> */}

            <label onClick={addBuilding} style={{fontSize:'20px',color:'red'}} >REALVERSE</label>
            <button onClick={addBuilding} className="button">Add Building</button>
           
            {account ? (
                <a
                    href={`${""}/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button">
                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </a>
            ) : (
                <button onClick={web3Handler} className="button">Connect Wallet</button>
            )}
        </nav>
    )
}

export default Navbar;