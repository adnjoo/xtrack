import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PaymentIcon from "@mui/icons-material/Payment";

import { MyModal } from "@/app/components/MyModal";
import ExpenseForm from "@/app/components/ExpenseForm";

export default function BasicSpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const actions = [
    { icon: <PaymentIcon />, name: "Expense", onClick: () => setModalOpen(true) },
  ];

  return (
    <>
      {/* Speed dial */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
