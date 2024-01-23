import React from "react";
import { Button, Tooltip } from "flowbite-react";
import { BsPlusCircleFill } from "react-icons/bs";

import MyModal from "@/app/components/MyModal";
import ExpenseForm from "@/app/components/ExpenseForm";

export default function MySpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      {/* Speed dial */}
      <Button className="fixed bottom-4 right-4" onClick={() => setModalOpen(true)}>
        <Tooltip content="Add Expense" placement="left">
          <BsPlusCircleFill className="h-6 w-6" />
        </Tooltip>
      </Button>

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
