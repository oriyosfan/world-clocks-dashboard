'use client';

import { Modal as AppModal, type ModalProps as AppModalProps } from '@infra/bridge';

export type ModalProps = AppModalProps & {
  // Future props
};

export function Modal(props: ModalProps) {
  return <AppModal {...props} />;
}
