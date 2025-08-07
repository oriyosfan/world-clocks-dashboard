'use client';

import { useState } from 'react';

import { Modal, Input } from '@/components/ui';

interface TagUserModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (user: string) => void;
  clockCountry: string;
  currentUser?: string | undefined;
}

export const TagUserModal: React.FC<TagUserModalProps> = ({ open, onCancel, onOk, clockCountry, currentUser }) => {
  const [userInput, setUserInput] = useState(currentUser ?? '');

  const trimmedUserInput = userInput.trim();

  const handleOk = () => {
    onOk(trimmedUserInput);
    setUserInput('');
  };

  const handleCancel = () => {
    setUserInput(currentUser ?? '');
    onCancel();
  };

  return (
    <Modal
      title={`Tag User to ${clockCountry}`}
      open={open}
      onOk={handleOk}
      cancelText="Cancel"
      onCancel={handleCancel}
      okText={currentUser ? (!trimmedUserInput ? 'Remove User' : 'Tag User') : 'Tag User'}
      okButtonProps={{ disabled: (!currentUser && !trimmedUserInput) || currentUser === trimmedUserInput }}
    >
      <div className="space-y-4">
        <p className="text-muted-foreground">Enter the name of the person you want to tag to this clock:</p>
        <Input
          placeholder="Enter user name..."
          value={userInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
          onPressEnter={handleOk}
          autoFocus
        />
      </div>
    </Modal>
  );
};
