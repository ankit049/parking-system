import React from 'react';
import classes from './Slots.css';
import Aux from '../../HOC/Aux';

class Slots extends React.Component {
  render() {
    console.log("Total Slots in Slots Component : " + this.props.slots);
    // const totalSlots = this.props.slots;
    let renderSlots;

    if(this.props.generateSlot)
    {
      renderSlots = [...Array(this.props.slots)].map((key, i) => {
        let seqNo = i+1;
        if(this.props.slotsInfo[i]) {
          console.log("seqNo:"+JSON.stringify(this.props.slotsInfo[i][seqNo]));
          let color;
          if(this.props.slotsInfo[i][seqNo].hasOwnProperty('ticket')) {
            color = this.props.slotsInfo[i][seqNo]['ticket']['color'];
          }
          console.log("Color : "+color);
          let title = `Current Slot No : ${seqNo}`
          return (
            <a
              key={i}
              data-index={seqNo}
              title={title}
              onClick={this.props.slotClicked}
              style={{color:color, borderColor:color}}
              className={`${classes.slotBtn} ${classes.slotBtnActive}`}>
            </a>
          );
        } else {
          return (
            <a
              href="#"
              key={i}
              data-seq={seqNo}
              className={classes.slotBtn}>
            </a>
          );
        }
      });
    }

    console.log(renderSlots);
    return (
      <Aux>
        {this.props.generateSlot ? renderSlots : null }
      </Aux>
    );
  }
}

export default Slots;
