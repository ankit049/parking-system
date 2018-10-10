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
            onClick={this.props.generateSlotHandler}>Generate Slots</button>
        </div>
        {this.props.generateSlot ?
          <div className={classes.slotContainer}>
            <Slots
              slotClicked={this.props.slotClicked}
              slotsInfo={this.props.slotsInfo}
              generateSlot={this.props.generateSlot}
              slots={this.props.slots}/>
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
