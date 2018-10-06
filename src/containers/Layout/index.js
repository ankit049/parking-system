import React from 'react';
import classes from './Layout.css';
import Aux from '../../HOC/Aux';
import MainSection from '../../components/MainSection';
import ParkingSlot from '../../components/ParkingSlot';

class Layout extends React.Component {

  render() {
    return (
      <Aux>
        <MainSection />
        <ParkingSlot />
      </Aux>
    );
  }
}

export default Layout;
