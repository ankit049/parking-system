import React from 'react';
import classes from './ParkedCarDetails.css';
import Aux from '../../HOC/Aux';
import Backdrop from '../UI/Backdrop';

class ParkedCarDetails extends React.Component {

  render() {
    console.log("Details : "+ JSON.stringify(this.props.details));
    return (
      <Aux>
        <h3 style={{textAlign:'center',margin:'0px 0px 15px 0px',paddingTop:'30px'}}>Current Parked Car Details</h3>
        { this.props.details ?
          <Aux>
            <div className={classes.ticketWrapper}>
              <div className={classes.ticketSec}>
                <div className={classes.carIcon}>
                  <i className="far fa-circle"></i>
                  <i className="fas fa-car" style={{color:this.props.details['ticket']['color']}}></i>
                </div>
                <div className={classes.ticketDetails}>
                  <p>
                    Slot No : <small><strong>{this.props.details['slotNo']}</strong></small>
                  </p>
                  <p>
                    Registration No : <small><strong>{this.props.details['ticket']['regNo']}</strong></small>
                  </p>
                  <p>
                    Color : <small><strong>{this.props.details['ticket']['color']}</strong></small>
                  </p>
                </div>
              </div>
            </div>

            <div className={classes.mainBottomText}>
              <p><small><strong>Note - </strong> Please click on individual slot for more details</small></p>
            </div>
          </Aux>
          : null
        }
      </Aux>
    );
  }
}

export default ParkedCarDetails;
