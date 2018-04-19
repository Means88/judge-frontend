import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css';
import Header from '../shared/components/Header';
import ProblemStore from '../store/ProblemStore';
import Editor from '../shared/components/Editor';
import './index.less';

function createMarkdown(problem) {
  if (!problem) {
    return '';
  }
  return `
# ${problem.title}

## 题目描述
${problem.description}

## 输入描述
${problem.input}

## 输出描述
${problem.output}

## 样例输入
\`\`\`
${problem.sampleInput}
\`\`\`

## 样例输出
\`\`\`
${problem.sampleOutput}
\`\`\`

## 数据范围及提示
${problem.hint}
`;
}

@withRouter
@observer
class ProblemPage extends Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    if (ProblemStore.problem && ProblemStore.problem.id === id) {
      return;
    }
    ProblemStore.retrieve(id);
  }

  renderContent() {
    const md = new MarkdownIt({
      breaks: true,
      html: true,
    });
    return md.render(createMarkdown(ProblemStore.problem));
  }

  render() {
    return (
      <div className="with-fixed-header">
        <Header />
        <div
          className="content container markdown-body problem-content"
          dangerouslySetInnerHTML={{ __html: this.renderContent() }}
        />
        <div className="container">
          <Editor />
          <div className="clearfix" style={{ margin: '15px 0' }}>
            <button className="btn btn-primary pull-right">
              提交
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemPage;
