'use client';

import React from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { BsPlusCircleFill } from 'react-icons/bs';
import Draggable from 'react-draggable';

import MyModal from '@/app/components/MyModal';
import ExpenseForm from '@/app/components/ExpenseForm';

export default function MySpeedDial() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      {/* Speed dial */}
      <Draggable>
        <div className='fixed bottom-4 right-4'>
          <div className='max-h-[10px] rounded-t-lg bg-gray-800'>&nbsp;</div>
          <Button onClick={() => setModalOpen(true)} className='rounded-t-none'>
            <Tooltip content='Add Expense' placement='left'>
              <BsPlusCircleFill className='h-6 w-6' />
            </Tooltip>
          </Button>
        </div>
      </Draggable>

      {/* Modal */}
      <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ExpenseForm setIsOpen={setModalOpen} />
      </MyModal>
    </>
  );
}
