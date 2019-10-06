import React, { Component } from 'react';
import 'typeface-roboto';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CommentText = styled(Typography) ({
  fontSize: 42,
  margin: '0',
  padding: '0',
  lineHeight: '1.2em',
  textAlign: 'left'
});

const QuestionText = styled(Typography) ({
  fontSize: 64
});

const NumberButton = styled(Fab) ({
  background: 'linear-gradient(45deg, #66a6ff 0%, #89f7fe 100%);',
	fontSize: 24,
  border: 0,
  borderRadius: 15,
  boxShadow: '0 3px 5px 2px rgba(66, a6, 255, .3)',
  color: 'white',
  padding: '5px 5px'
});

const AnswerButton = styled(Button) ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  fontSize: 32,
  border: 0,
  borderRadius: 100,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '10px 30px'
});

const NextButton = styled(AnswerButton) ({
  background: 'linear-gradient(45deg, #8fd3f4 30%, #84fab0 90%)',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
});

const DeleteButton = styled(AnswerButton) ({
  fontSize: 22,
  background: 'linear-gradient(45deg, #8fd3f4 30%, #84fab0 90%)',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  marginTop: '10px',
  padding: '4px 30px'
});

const DeleteButtonDisabled = styled(DeleteButton) ({
  background: 'linear-gradient(45deg, #eee 50%, #eee 60%)',
  boxShadow: '0 3px 5px 2px rgba(128, 128, 128, .3)',
});

const L = {
  requestComment1: "こたえは？😄",
  correctComment1: "せいかい🎉",
  incorrectComment1: "ざんねん☔",
  checkAnswer: "こたえあわせ👀",
  nextQuestion: "つぎのもんだい",
  deleteInput: "やりなおし✂"
}

class PageSubEasy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no:0,
      questionText: "",
      challengeNumberText: "",
      correctNumber: 0,
      commentText1: "",
      moveNext: false
    }
  }

  componentDidMount() {
    this.renewQuestion ();
  }

  pushNumberButton = (numberObj) => {

    let challengeNumber = 0;
    if (! isNaN(this.state.challengeNumberText)) {
      challengeNumber = parseInt(this.state.challengeNumberText);
    }

    let number = parseInt(numberObj.value);

    // (2桁の場合)2桁目は削除し、1桁目x10 + 入力値、を設定する。
    number = challengeNumber * 10 + number;
    this.setState({challengeNumberText: String(number).substr(-2,2)});
  }

  renewQuestion = () => {
    let {questionText, answer} = this.makeQuestion();
    this.setState({questionText: questionText});
    this.setState({challengeNumberText: "?"});
    this.setState({commentText1: L.requestComment1});
    this.setState({correctNumber: answer});
    this.setState({moveNext: false});
  }

  resetInput = () => {
    this.setState({challengeNumberText: "?"});
  }

  /*
   * 設問を(自動)生成
   */
  makeQuestion = () => {

    // 同じ問題の連続を防ぐために、現在表示されている設問を取得
    let prevQuestionText = this.state.questionText;

    let n = [];
    let answer;
    let questionText = "";
    while(1) {

      // 設問を乱数で生成
      n[0] = Math.ceil( Math.random() * 9 ) ;
      n[1] = Math.ceil( Math.random() * 9 ) ;

      answer = n[0] * n[1];

      // 生成された設問の答えが81より大きい場合はやりなおし
      // (発生しないはずだけれど)
      if (answer > 81) {
        continue;
      }

      // 設問用文字列を生成
      questionText = "" + n[0] + " * " + n[1] + " = "

      // 設問用文字列が直前のものと同じ場合はやり直し
      if (questionText === prevQuestionText) {
        continue;
      }

      break;
    }

    return {questionText, answer}
  }

  /*
   * 入力値と正解を比較(答え合わせ)
   */
  checkAnswer = () => {
    if (isNaN(this.state.challengeNumberText)) {
      // 入力値が数値ではなかった場合は何もしない
      return;
    }

    let challengeNumber = parseInt(this.state.challengeNumberText);
    if (challengeNumber === this.state.correctNumber) {
      // 正解の場合
      this.setState({commentText1: L.correctComment1});
      this.setState({moveNext: true});
    } else {
      // 間違いの場合
      this.setState({commentText1: L.incorrectComment1});
      this.resetInput();
    }
  }

  render() {
    return (
      <div style={{
        background: 'linear-gradient(to right bottom, #ffefba, #ffffff)',
        height: '100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'
      }} >
        <CommentText>
          {this.state.commentText1}
        </CommentText>
        <QuestionText>
          {this.state.questionText}{this.state.challengeNumberText}
        </QuestionText>
        <Grid container>
          <Grid container spacing={1} justify="center" style={{marginBottom: 20}}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
              <Grid key={value} item>
                <NumberButton onClick={()=>this.pushNumberButton({value})}>{value}</NumberButton>
              </Grid>
            ))}
          </Grid>
          <Grid container justify="center">
            {!this.state.moveNext ?
              <AnswerButton onClick={this.checkAnswer}>{L.checkAnswer}</AnswerButton>
              :<NextButton onClick={this.renewQuestion}>{L.nextQuestion}</NextButton>
            }
          </Grid>
          <Grid container justify="center">
            {!this.state.moveNext ?
              <DeleteButton onClick={this.resetInput}>{L.deleteInput}</DeleteButton>
              :<DeleteButtonDisabled>{L.deleteInput}</DeleteButtonDisabled>
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PageSubEasy;
