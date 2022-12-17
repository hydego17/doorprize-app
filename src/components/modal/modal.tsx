import React from 'react';
import { cx } from '@/utils';
import s from './modal.module.css';

interface ModalProps {
  children?: React.ReactNode;
  opened: boolean;
  onClose?(): void;
  withCloseButton?: boolean;
  withOverlay?: boolean;
  closeOnClickOutside?: boolean;
  overlayBlur?: boolean;
  zIndex?: number;
}

/**
 * Generic modal component used in our application.
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      opened,
      withOverlay = true,
      onClose = () => null,
      closeOnClickOutside = true,
      overlayBlur = true,
      zIndex,
      ...props
    },
    ref
  ) => {
    /**
     * Handle close modal
     */
    const handleClose = () => {
      onClose();
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
        {withOverlay && (
          <div
            key='modal-overlay'
            onClick={handleMaskClick}
            className={cx(s.overlay, overlayBlur && '[backdrop-filter:blur(1px)]')}
          />
        )}

        {/* Modal Body */}
        <div key='modal-body' className={cx(s.modalBody)}>
          <div className={cx(s.modalContent)}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
