import React from 'react';
import classes from './Modal.css';
import Aux from '../../../HOC/Aux';
import Backdrop from '../Backdrop';

class Modal extends React.Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Modal] : inside shouldComponentUpdate");
  //   return nextProps.show !== this.props.show;
  // }
  //
  // componentWillUpdate() {
  //   console.log("[Modal] : inside componentWillUpdate");
  // }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed} />
        <div
          className={classes.modal}
          style={{
            transform: this.props.show ? 'scaleY(1)' : 'scaleY(0)',
            background: 'transparent'
          }}>

          { this.props.details ?
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
            : null
          }

          <div>
            <button
              className={classes.removeBtn}
              data-index={this.props.seqNo}
              onClick={this.props.removeCar}>
              Remove Car </button>
          </div>
        </div>
      </Aux>
    );
  }
};

export default Modal;
