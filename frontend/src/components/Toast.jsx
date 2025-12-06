import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ id, message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const configs = {
    success: {
      bg: '#3BF4C5',
      text: '#0D1117',
      icon: <CheckCircle className="w-5 h-5 shrink-0" />,
    },
    error: {
      bg: '#FF4D8D',
      text: '#ffffff',
      icon: <AlertCircle className="w-5 h-5 shrink-0" />,
    },
    info: {
      bg: '#A46BFF',
      text: '#ffffff',
      icon: <Info className="w-5 h-5 shrink-0" />,
    },
    warning: {
      bg: '#FF914D',
      text: '#0D1117',
      icon: <AlertTriangle className="w-5 h-5 shrink-0" />,
    },
  };

  const config = configs[type] || configs.info;

  return (
    <div
      className="flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl animate-toast-slide backdrop-blur-sm"
      style={{
        background: config.bg,
        color: config.text,
        minWidth: '280px',
        maxWidth: 'calc(100vw - 2rem)',
        animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: `0 12px 40px rgba(58, 244, 197, 0.2)`,
        border: `1px solid ${config.bg}`,
      }}
      role="status"
      aria-live="polite"
    >
      <div className="shrink-0">{config.icon}</div>
      <span className="flex-1 text-sm font-medium leading-relaxed">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:opacity-60 transition-opacity shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
      <style>{`
        @keyframes slideInUp {
          from { transform: translateY(100px) translateX(0); opacity: 0; }
          to { transform: translateY(0) translateX(0); opacity: 1; }
        }
        @keyframes slideOutDown {
          from { transform: translateY(0) translateX(0); opacity: 1; }
          to { transform: translateY(100px) translateX(0); opacity: 0; }
        }
        @media (max-width: 640px) {
          .animate-toast-slide { padding-left: 1rem; padding-right: 1rem; border-radius: 12px; }
        }
      `}</style>
    </div>
  );
};

export default React.memo(Toast);
