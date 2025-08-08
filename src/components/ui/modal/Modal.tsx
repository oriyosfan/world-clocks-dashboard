'use client';

import { Modal as AppModal, type ModalProps as AppModalProps } from 'antd';
import React from 'react';

export type ModalProps = AppModalProps & {
  // Future props
};

export function Modal(props: ModalProps) {
  return <AppModal {...props} />;
}
