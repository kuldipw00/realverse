import React from 'react'
import './AddBuilding.css'
function AddBuilding({addBuilding,onFormSubmit}) {
  return (
    <div className="login-wrapper">
    <form onSubmit={onFormSubmit} className="form">
      {/* <img src="img/avatar.png" alt=""/> */}
      <h2>Enter Building Details</h2>
      <div className="input-group">
        <input type="text" name="BuildingName" id="BuildingName" required/>
        <label for="BuildingName">Name</label>
      </div>
      <div className="input-group">
        <input type="Number" name="BuildingCost" id="BuildingCost" required/>
        <label for="BuildingCost">Cost (in ethers)</label>
      </div>
      <div className="input-group">
        <input type="Number" name="BuildingPosition" id="BuildingPosition" required/>
        <label for="BuildingPosition">Building's Position (X, Y coordinates)</label>
      </div>
      <div className="input-group">
        <input type="text" name="BuildingArea" id="BuildingArea" required/>
        <label for="BuildingArea">Area ( W X H)</label>
      </div>
      <input type="submit" value="Add Building" className="submit-btn"/>
      {/* <a href="#forgot-pw" className="forgot-pw">Forgot Password?</a> */}
    </form>

    <div id="forgot-pw">
      <form action="" className="form">
        <a href="#" className="close">&times;</a>
        <h2>Reset Password</h2>
        <div className="input-group">
          <input type="email" name="email" id="email" required/>
          <label for="email">Email</label>
        </div>
        <input type="submit" value="Submit" className="submit-btn"/>
      </form>
    </div>
  </div>
  )
}

export default AddBuilding