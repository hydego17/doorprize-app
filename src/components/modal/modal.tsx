import React from 'react';
import { cx } from '@/utils';
import s from './modal.module.css';

interface ModalProps {
  children?: React.ReactNode;
  opened: boolean;
  onClose?(): void;
  closeOnClickOutside?: boolean;
  size?: 'sm' | 'md' | 'lg';
  zIndex?: number;
}

/**
 * Generic modal component used in our application.
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ children, opened, onClose, closeOnClickOutside = true, size = 'sm', zIndex, ...props }, ref) => {
    /**
     * Handle close modal
     */
    const handleClose = () => {
      onClose && onClose();
    };

    /**
     * Handle when user click outside modal (mask click)
     */
    const handleMaskClick = () => {
      if (!closeOnClickOutside) return;
      handleClose();
    };

    return (
      <div ref={ref} role='dialog' data-opened={opened} style={{ zIndex }} className={cx(s.modal)} {...props}>
        {/* Modal Overlay */}
        <div key='modal-overlay' onClick={handleMaskClick} className={cx(s.overlay)} />

        {/* Modal Body */}
        <div key='modal-body' className={cx(s.modalBody, s[`modal-${size}`])}>
          <div className={cx(s.modalContent)}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
