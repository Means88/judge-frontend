import { SUBMISSION_STATUS } from '../constants';

export function getStatusConfig(status) {
  return {
    [SUBMISSION_STATUS.AC]: { text: 'Accepted', color: 'success' },
    [SUBMISSION_STATUS.WA]: { text: 'Wrong Answer', color: 'danger' },
    [SUBMISSION_STATUS.CE]: { text: 'Compile Error', color: 'danger' },
    [SUBMISSION_STATUS.TLE]: { text: 'Time Limit Exceeded', color: 'warning' },
    [SUBMISSION_STATUS.MLE]: { text: 'Memory Limit Exceeded', color: 'warning' },
    [SUBMISSION_STATUS.PE]: { text: 'Presentation Error', color: 'warning' },
  }[status] || { text: '', color: 'default' };
}
