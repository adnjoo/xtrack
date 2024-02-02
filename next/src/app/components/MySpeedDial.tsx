'use client';

import React from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { BsPlusCircleFill } from 'react-icons/bs';
import Draggable from 'react-draggable';

import MyModal from '@/app/components/MyModal';
import ExpenseForm from '@/app/components/ExpenseForm';
import { useCheckMobileScreen } from '@/app/lib/hooks';

const AddExpenseButton = ({ setModalOpen }: { setModalOpen: any }) => {
  return (
    <Button onClick={() => setModalOpen(true)} className='rounded-t-none'>
      <Tooltip content='Add Expense' placement='left'>
        <BsPlusCircleFill className='h-6 w-6' />
      </Tooltip>
    </Button>
  );
};

export default function MySpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const isMobile = useCheckMobileScreen();

  return (
    <>
      {/* Speed dial */}
      {isMobile ? (
        <div className='fixed bottom-4 right-4'>
          <AddExpenseButton setModalOpen={setModalOpen} />
        </div>
      ) : (
        <Draggable>
          <div className='fixed bottom-4 right-4'>
            <div className='max-h-[10px] rounded-t-lg bg-gray-800'>&nbsp;</div>
            <AddExpenseButton setModalOpen={setModalOpen} />
          </div>
        </Draggable>
      )}

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
