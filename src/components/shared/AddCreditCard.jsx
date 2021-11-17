import React, { PureComponent } from 'react'
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Cards from "react-credit-cards";

const AddCreditCard = (props) => {
  const {
    isOpen,
    handleOpen,
    handleAddCreditCard,
    handleOnChange,
    handleInputFocus,
    state,
    handleChangeCardType
  } = props

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpen}
    >
      <ModalHeader
        toggle={() => handleOpen()}
      >
        Add New Credit Card
      </ModalHeader>
      <ModalBody>
        <Cards
          // cvc={state.cvc}
          expiry={state.newexpiry}
          focused={state.focus}
          name={state.newname}
          number={state.newnumber}
          preview={true}
        />

        <FormControl component="fieldset" className='mt-3'>
          <RadioGroup
            row aria-label="cardtype"
            name="cardtype"
            value={state.cardtype}
            onChange={(e) => handleChangeCardType(e)}
          >
            <FormControlLabel
              value="MasterCard"
              control={<Radio />}
              label="Master Card"
            />
            <FormControlLabel
              value="VisaCard"
              control={<Radio />}
              label="Visa Card"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          variant="outlined"
          size="small"
          label="Card Number"
          type="tel"
          name="newnumber"
          className="form-control mt-3"
          placeholder="Card Number"
          pattern="[\d| ]{16,22}"
          maxLength="16"
          required
          onChange={(e) => handleOnChange(e)}
          onFocus={(e) => handleInputFocus(e)}
        />

        <TextField
          variant="outlined"
          size="small"
          label="Card Name"
          type="text"
          name="newname"
          className="form-control mt-3"
          placeholder="Name"
          required
          onChange={(e) => handleOnChange(e)}
          onFocus={(e) => handleInputFocus(e)}
        />

        <TextField
          variant="outlined"
          size="small"
          label="Valid Thru"
          type="tel"
          name="newexpiry"
          className="form-control mt-3"
          placeholder="Valid Thru"
          pattern="\d\d/\d\d"
          required
          onChange={(e) => handleOnChange(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
{/* 
        <TextField
          variant="outlined"
          type="tel"
          name="cvc"
          size="small"
          className="form-control mt-3"
          placeholder="CVC"
          value={state.cvc}
          pattern="\d{3,4}"
          required
          onChange={(e) => handleOnChange(e)}
          onFocus={(e) => handleInputFocus(e)}
        /> */}

        <button
          onClick={() => handleAddCreditCard()}
          className="btn btn-primary btn-block mt-3"
          type="button"
        >
          Add
        </button>
      </ModalBody>
    </Modal>
  )
}

export default AddCreditCard