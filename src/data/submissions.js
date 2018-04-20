import { SUBMISSION_STATUS } from '../shared/constants';
import problems from './problems';
import random from './random';

const status = Object.values(SUBMISSION_STATUS);

export function generateSubmissions(options = {}) {
  let { problemId, count } = options;
  let problem = null;
  if (problemId) {
    problem = problems.find(p => p.id === problemId);
  }
  count = count || random.randint(5, 15);
  const submissions = [];

  for (let i = 0; i < count; i++) {
    const p = problem || random.choice(problems);
    submissions.push({
      id: count - i,
      problem: p,
      user: {
        username: 'Means88',
      },
      status: random.choice(status),
      time_cost: random.randint(10, 1000),
      memory_cost: random.randint(20, 1000),
      code: 'a, b = map(int, raw_input().split())\nprint a + b\n'
    });
  }
  return submissions;
}

export default generateSubmissions();
