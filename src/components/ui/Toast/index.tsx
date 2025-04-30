import { useEffect } from 'react';
import styled from 'styled-components';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
  duration?: number;
}

const ToastContainer = styled.div<{ type: 'error' | 'success' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 4px;
  background-color: ${props => props.type === 'error' ? '#ff4444' : '#00C851'};
  color: white;
  z-index: 1000;
  animation: slideIn 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer type={type}>
      {message}
    </ToastContainer>
  );
} 