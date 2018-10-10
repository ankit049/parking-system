import React from 'react';
import Aux from '../../HOC/Aux';
import MainSection from '../../components/MainSection';
import ParkingSlot from '../../components/ParkingSlot';
import Modal from '../../components/UI/Modal';

// create slots of given no of slots
const createAvaiableSlots = (slots) => {
  const slotArray = [...Array(slots)].map( (key, i) => i+1);
  // console.log("availableSlots : "+ slotArray);
  return slotArray;
}

// Generate random Registration number
const generateRegNoHandler = () => {
  const alphabets = [...Array( 26 )].fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );

  const ranNo1 = Math.floor(Math.random()*100);
  const ranNo2 = Math.floor(Math.random()*10000);
  const ranAlpha1 = alphabets[Math.floor(Math.random()*26)];
  const ranAlpha2 = alphabets[Math.floor(Math.random()*26)];

  const regNo = `KA-${ranNo1}-${ranAlpha1}${ranAlpha2}-${ranNo2}`;

  return regNo;
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSlots: 50,
      slotsInfo: [],
      isAvalaible: [],
      availableSlots: [0],
      filledSlots: [],
      generateSlot: false,
      showDetail: false,
      modalShow: false,
      currentParkedDetail: '',
      currentParkedId:'',
      searchVal: ''
    }
  }

  // Generate Slot Handler
  generateSlotHandler = () => {
    const avaSlots = createAvaiableSlots(this.state.totalSlots);
    this.setState({
      availableSlots: avaSlots,
      generateSlot: true
    })
  }

  // generate Ticket handler
  generateTicketHandler = () => {
    if(this.state.generateSlot) {
      if(this.state.availableSlots.length > 0) {
        const colors = ['black', 'goldenrod', 'blue', 'red'];
        const regNo = generateRegNoHandler();
        const seqNo = this.state.availableSlots[0];
        console.log("Seq No at Generate Handler : "+ seqNo);

        const ranColor = colors[Math.floor(Math.random()*4)];
        const ticket = {
          seqNo: seqNo,
          regNo: regNo,
          color: ranColor
        }

        // console.log(`Seq No : ${seqNo}`);
        // console.log(`RegNo : ${regNo}`);
        // console.log(`Color : ${ranColor}`);
        // console.log('State in Layout Before : ' + JSON.stringify(this.state));

        let newSlot = {};
        newSlot[seqNo] = {
          slotNo: seqNo,
          parked: true,
          ticket: ticket
        }

        this.setState(prevState => {
          const alterSlotsInfo = [...prevState.slotsInfo];
          console.log("Slot at deleted position : "+ JSON.stringify(alterSlotsInfo[seqNo-1]));
          if(!alterSlotsInfo[seqNo-1]) {
            alterSlotsInfo[seqNo-1] = newSlot;
          } else {
            alterSlotsInfo.push(newSlot);
          }

          const addSlots = prevState.availableSlots[0];
          const alterFilledSlots = prevState.filledSlots;
          alterFilledSlots.push(addSlots);

          const oldAvailableSlots = prevState.availableSlots;
          const alterAvailableSlots = oldAvailableSlots;
          alterAvailableSlots.shift();

          const isAval = [...prevState.isAvalaible];
          isAval.push(1);

          return({
            slotsInfo: alterSlotsInfo,
            availableSlots: alterAvailableSlots,
            filledSlots: alterFilledSlots,
            showDetail: true,
            isAvalaible: isAval
          });
        })
      } else {
        alert("Opps.....No more avaiable slots !...");
      }
    } else {
      alert("Opps...First Generate the Parking Slots!...");
    }
  }

  // show individual parked car detail on clicked
  slotClickedHandler = (e) => {
    const seqNo = e.target.dataset.index;
    // console.log("Clicked Slot Id : "+ seqNo);
    let currentParkedDetails;
    currentParkedDetails = this.state.slotsInfo[seqNo-1];
    // console.log("currentElement obj: "+JSON.stringify(currentParkedDetails));

    if(currentParkedDetails) {
      currentParkedDetails = currentParkedDetails[seqNo];
      // console.log("currentElement obj: "+JSON.stringify(currentParkedDetails));
      this.setState({
        modalShow: true,
        currentParkedDetail: currentParkedDetails,
        currentParkedId: seqNo
      })
    }
  }

  //Modal closed handler
  modalClosedhandler = () => {
    this.setState({modalShow: false});
  }

  // Remove car from parking slot
  removeCarHandler = (e) => {
    const seqNo = e.target.dataset.index;
    // console.log("Clicked Slot Id : "+ seqNo);
    // console.log("availableSlots : " + this.state.availableSlots);
    // console.log("filledSlots : " + this.state.filledSlots);

    // const oldAvailableSlots = this.state.availableSlots;
    // const oldFilledSlots = this.state.filledSlots;

    this.setState(prevState => {
      const oldSlotsInfo = [...prevState.slotsInfo];
      console.log("oldSlotsInfo : "+ JSON.stringify(prevState));
      let newSlot = {};
      newSlot[seqNo] = {};
      oldSlotsInfo[seqNo-1] = false;
      console.log("oldSlotsInfo after alter : "+ JSON.stringify(oldSlotsInfo));

      //remove current clicked element from filledSlots
      const oldFilledSlots = [...prevState.filledSlots];
      oldFilledSlots.splice(seqNo-1, 1);
      console.log("New filledSlots : "+ oldFilledSlots);

      const isAval = [...prevState.isAvalaible];
      isAval.pop();

      // add current clicked element into the availableSlots
      const oldAvailableSlots = [...prevState.availableSlots];
      oldAvailableSlots.push(seqNo);

      const newAvailableSlots = oldAvailableSlots.sort((a, b) => {
        return a-b;
      });
      console.log("Sorted availableSlots : "+ newAvailableSlots);

      return({
        slotsInfo: oldSlotsInfo,
        availableSlots: newAvailableSlots,
        filledSlots: oldFilledSlots,
        modalShow: false,
        isAvalaible: isAval
      });
    })
  }

  // Search input Handler
  searchValUpdateHandler = (e) => {
    const searchValue = e.target.value;
    // console.log("Search Value : "+searchValue);

    this.setState({
      searchVal: searchValue
    })
  }

  // Search Handler
  searchBtnHandler = () => {
    this.setState(prevState => {
      if(prevState.generateSlot) {
        if(prevState.isAvalaible.length > 0) {
          // console.log("isAvalaible arr : "+prevState.isAvalaible);
          const searchVal = prevState.searchVal;
          const slotsInfo = prevState.slotsInfo;
          if(searchVal) {
            // console.log("Search: "+searchVal);
            let findVal = '';
            slotsInfo.map((key, i) => {
              // console.log("Current key & Index  : "+JSON.stringify(key)+" , "+i);
              if (key) {
                if(key[i+1] === key[searchVal]) {
                  findVal = key[searchVal];
                }

                if(key[i+1]["ticket"]["regNo"] === searchVal) {
                  findVal = key[i+1];
                }
                // console.log("Found Key: "+JSON.stringify(findVal));
              }
            });

            if(findVal) {
              this.setState({
                modalShow: true,
                currentParkedDetail: findVal,
                currentParkedId: searchVal,
                searchVal: ''
              })
            } else {
              alert("Opps.....Not Found !...");
            }

          } else {
            alert("Opps.....Please enter Search keyword !...");
          }

        } else {
          alert("Opps.....All Slots are empty to search !...");
        }
      } else {
        alert("Opps...Please first Generate the Parking Slots!...");
      }
    })
  }

  render() {
    // console.log("isAvalaible arr : "+this.state.isAvalaible.length);
    let currentParkedDetails = '';
    if(this.state.generateSlot) {
      const filledLength = this.state.filledSlots.length;
      const currentElement = this.state.filledSlots[filledLength-1];
      // console.log("currentElement : "+currentElement);
      currentParkedDetails = this.state.slotsInfo[currentElement-1];
      if(currentParkedDetails) {
        currentParkedDetails = currentParkedDetails[currentElement];
        // console.log("currentElement obj: "+JSON.stringify(currentParkedDetails[currentElement]));
      }
    }
    // console.log("State in Layout  After: " + JSON.stringify(this.state));

    return (
      <Aux >
        <Modal
          seqNo={this.state.currentParkedId}
          removeCar={this.removeCarHandler}
          show={this.state.modalShow}
          details={this.state.currentParkedDetail}
          modalClosed={this.modalClosedhandler}/>
        <MainSection
          searchBtnClicked={this.searchBtnHandler}
          searchValUpdate={this.searchValUpdateHandler}
          searchVal={this.state.searchVal}
          generateSlot={this.state.showDetail}
          currentParkedDetails={currentParkedDetails}
          generateTicket={this.generateTicketHandler}/>
        <ParkingSlot
          slotClicked={this.slotClickedHandler}
          slotsInfo={this.state.slotsInfo}
          generateSlot={this.state.generateSlot}
          generateSlotHandler={this.generateSlotHandler}
          slots={this.state.totalSlots}/>
      </Aux>
    );
  }
}

export default Layout;
