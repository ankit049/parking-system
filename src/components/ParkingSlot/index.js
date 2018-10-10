import React from 'react';
import classes from './ParkingSlot.css';
import Slots from '../Slots';

class ParkingSlot extends React.Component {
  render() {
    // console.log("Total Slots in ParkingSlot Component : " + this.props.slots);
    return (
      <div className={classes.parkingSection}>
        <div className={classes.inputSlotSection}>
          <button
            disabled={this.props.generateSlot}
            onClick={this.props.generateSlotHandler}>
            <i className="fas fa-car" style={{display:'inline-block',marginRight:'10px'}}></i>
            Generate Parking Slots</button>
        </div>
        {this.props.generateSlot ?
          <div className={classes.slotContainer}>
            <small>Start <i class="fas fa-angle-double-right"></i></small>

            <Slots
              slotClicked={this.props.slotClicked}
              slotsInfo={this.props.slotsInfo}
              generateSlot={this.props.generateSlot}
              slots={this.props.slots}/>

            <small><i class="fas fa-ban"></i> End !</small>
          </div>
          :
          <p className={classes.text}>
            Click on Generate Slots button to create empty slots<br/>
          </p>
        }
      </div>
    );
  }
}

export default ParkingSlot;
