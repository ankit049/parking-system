import React from 'react';
import classes from './ParkedCarDetails.css';
import Aux from '../../HOC/Aux';

class ParkedCarDetails extends React.Component {

  render() {
    console.log("Details : "+ JSON.stringify(this.props.details));
    return (
      <Aux>
        <h3 className={classes.ParkedCarDetailsTitle}>Current Parked Car Details</h3>
        { this.props.details ?
          <Aux>
            <div className={classes.ticketWrapper}>
              <div className={classes.ticketSec}>
                <div className={classes.carIcon}>
                  <i className="far fa-circle"></i>

                  <i className="fas fa-car" style={{color:this.props.details['ticket']['color']}}></i>
                </div>
                <div className={classes.ticketDetails}>
                  <i className="far fa-circle"></i>
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
