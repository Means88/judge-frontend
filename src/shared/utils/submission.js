import React from 'react';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import Icon from '@fortawesome/react-fontawesome';
import { SUBMISSION_STATUS } from '../constants';

export function getStatusConfig(status) {
  return {
    [SUBMISSION_STATUS.PENDING]: { text: 'Pending', color: 'default', abbr: <Icon icon={faSpinner} spin />},
    [SUBMISSION_STATUS.AC]: { text: 'Accepted', color: 'success', abbr: 'AC' },
    [SUBMISSION_STATUS.WA]: { text: 'Wrong Answer', color: 'danger', abbr: 'WA' },
    [SUBMISSION_STATUS.CE]: { text: 'Compile Error', color: 'danger', abbr: 'CE' },
    [SUBMISSION_STATUS.TLE]: { text: 'Time Limit Exceeded', color: 'warning', abbr: 'TLE' },
    [SUBMISSION_STATUS.MLE]: { text: 'Memory Limit Exceeded', color: 'warning', abbr: 'MLE' },
    [SUBMISSION_STATUS.PE]: { text: 'Presentation Error', color: 'warning', abbr: 'PE' },
  }[status] || { text: '', color: 'default' };
}
