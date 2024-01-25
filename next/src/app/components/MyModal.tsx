'use client';

import { Modal } from 'flowbite-react';

export default function MyModal({ isOpen, setIsOpen, children }: any) {
  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
