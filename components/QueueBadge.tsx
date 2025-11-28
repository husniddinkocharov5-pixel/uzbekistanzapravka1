import React from 'react';
import { QueueStatus } from '../types';

interface QueueBadgeProps {
  status: QueueStatus;
}

const QueueBadge: React.FC<QueueBadgeProps> = ({ status }) => {
  let colorClass = '';

  switch (status) {
    case QueueStatus.Low:
      colorClass = 'bg-green-100 text-green-800 border-green-200';
      break;
    case QueueStatus.Medium:
      colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    case QueueStatus.High:
      colorClass = 'bg-orange-100 text-orange-800 border-orange-200';
      break;
    case QueueStatus.Critical:
      colorClass = 'bg-red-100 text-red-800 border-red-200';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} inline-flex items-center gap-1`}>
      <span className="relative flex h-2 w-2">
        {(status === QueueStatus.High || status === QueueStatus.Critical) && (
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
      </span>
      Navbat: {status}
    </span>
  );
};

export default QueueBadge;