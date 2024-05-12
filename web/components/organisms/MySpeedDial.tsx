'use client';

import React from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { BsPlusCircleFill } from 'react-icons/bs';

import MyModal from '@/components/atoms/MyModal';
import ExpenseForm from '@/components/organisms/ExpenseForm';
import { useCheckMobileScreen } from '@/lib/hooks';

const AddExpenseButton = ({ setModalOpen }: { setModalOpen: any }) => {
  return (
    <div className='fixed bottom-4 right-4'>
      <Button className='h-12 w-12' onClick={() => setModalOpen(true)}>
        <Tooltip content='Add Expense' placement='left'>
          <BsPlusCircleFill className='h-6 w-6' />
        </Tooltip>
      </Button>
    </div>
  );
};

export default function MySpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const isMobile = useCheckMobileScreen();

  return (
    <>
      {/* Speed dial */}
      <AddExpenseButton setModalOpen={setModalOpen} />

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
