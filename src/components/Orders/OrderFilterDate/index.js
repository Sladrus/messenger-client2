import * as React from "react";
import Box from "@mui/material/Box";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Add this line to import the required styles for DateRange
import "react-date-range/dist/theme/default.css"; // Add this line to import the default theme for DateRange
import { observer } from "mobx-react-lite";
import { Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

const OrderFilterDate = observer(({ show, handleClose, ordersStore }) => {
  const handleSelectRange = ({ range1 }) => {
    range1.endDate.setHours(23);
    range1.endDate.setMinutes(59);
    range1.endDate.setSeconds(59);

    range1.startDate.setHours(0);
    range1.startDate.setMinutes(0);
    range1.startDate.setSeconds(0);

    ordersStore.setFilterDateRange(range1);
  };

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DateRangePicker
            onChange={handleSelectRange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={[ordersStore.filter.dateRange]}
            direction="horizontal"
            calendarFocus="backwards"
          />
          {/* <DateRange
            ranges={[ordersStore.filter.dateRange]}
            moveRangeOnFirstSelection={false}
          /> */}
        </Box>
      </Modal>
    </>
  );
});
export default OrderFilterDate;
