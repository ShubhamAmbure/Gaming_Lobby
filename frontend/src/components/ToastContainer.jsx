import React from 'react';
import Toast from './Toast';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        pointerEvents: 'none',
        maxWidth: '100%',
        padding: '0 1rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
            duration={toast.duration || 3000}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(ToastContainer);
