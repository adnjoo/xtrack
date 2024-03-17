'use client';

import React from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { BsPlusCircleFill } from 'react-icons/bs';
import Draggable from 'react-draggable';

import MyModal from '@/app/components/atoms/MyModal';
import ExpenseForm from '@/app/components/organisms/ExpenseForm';
import { useCheckMobileScreen } from '@/app/lib/hooks';

const AddExpenseButton = ({
  setModalOpen,
  isMobile = false,
}: {
  setModalOpen: any;
  isMobile?: boolean;
}) => {
  return (
    <Draggable disabled={isMobile}>
      <div className='fixed bottom-4 right-4'>
        {!isMobile && (
          <div className='max-h-[10px] rounded-t-lg bg-gray-800'>&nbsp;</div>
        )}
        <Button
          onClick={() => setModalOpen(true)}
          className={!isMobile ? 'rounded-t-none' : ''}
        >
          <Tooltip content='Add Expense' placement='left'>
            <BsPlusCircleFill className='h-6 w-6' />
          </Tooltip>
        </Button>
      </div>
    </Draggable>
  );
};

export default function MySpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const isMobile = useCheckMobileScreen();

  return (
    <>
      {/* Speed dial */}
      <AddExpenseButton setModalOpen={setModalOpen} isMobile={isMobile} />

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
