import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { MyModal } from "@/app/components/MyModal";
import ExpenseForm from "@/app/components/ExpenseForm";

export default function BasicSpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const style = {
    position: "fixed",
    bottom: 16,
    right: 16,
    background: "#1776d2 !important",
    fill: "#fff",
  };

  return (
    <>
      {/* Speed dial */}
      <Tooltip placement="left-start" title="Add expense">
        <IconButton onClick={() => setModalOpen(true)} sx={style}>
          <AddIcon sx={{ fill: "#fff", fontSize: 30 }} />
        </IconButton>
      </Tooltip>

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
