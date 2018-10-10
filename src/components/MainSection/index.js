import React from 'react';
import classes from './MainSection.css';
import Aux from '../../HOC/Aux';
import ParkedCarDetails from '../ParkedCarDetails';

class MainSection extends React.Component {

  render() {
    return (
      <Aux>
        <div className={classes.mainSection}>
          <div className={classes.actionSection}>
            <button onClick={this.props.generateTicket}>
              <i className="fas fa-sign-in-alt" style={{display:'inline-block',marginRight:'10px'}}></i>
              Park Car & Generate Ticket</button>
            <div className={classes.searchSec}>
              <input
                type="text"
                placeholder="Search by slot no or registration no .."
                onChange={this.props.searchValUpdate}
                value={this.props.searchVal}/>
              <button
                onClick={this.props.searchBtnClicked}
                ><i className="fas fa-search"></i></button>
            </div>
          </div>

          {this.props.generateSlot ?
            <div className={classes.detailSection}>
              <ParkedCarDetails
                generateSlot={this.props.generateSlot}
                details={this.props.currentParkedDetails}/>
            </div>
            :
            <p className={classes.text}>
              Click on Park car & Generate ticket button to park & generate ticket<br/><br/>
              <strong>Note : </strong><i>first generate the empty slots for parking & then
                  click park & generate ticket button
              </i>

            </p>
          }

        </div>

      </Aux>
    );
  }
}

export default MainSection;
