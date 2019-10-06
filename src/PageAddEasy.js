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
  fontSize: 64,
  marginBottom: 10 
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

const L = {
  requestComment1: "こたえを",
  requestComment2: "えらんでね😄",
  correctComment1: "せいかい🎉",
  correctComment2: "つぎはどうかな",
  incorrectComment1: "ざんねん☔",
  incorrectComment2: "もういちど",
  checkAnswer: "こたえあわせ👀",
  nextQuestion: "つぎのもんだい"
}

class PageAddEasy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no:0,
      questionText: "",
      challengeNumberText: "",
      correctNumber: 0,
      commentText1: "",
      commentText2: "",
      moveNext: false
    }
  }

  componentDidMount() {
    this.renewQuestion ();
  }

  pushNumberButton = (numberObj) => {
    let number = parseInt(numberObj.value);
    this.setState({challengeNumberText: String(number)});
  }

  renewQuestion = () => {
    let {questionText, answer} = this.makeQuestion();
    this.setState({questionText: questionText});
    this.setState({challengeNumberText: "?"});
    this.setState({commentText1: L.requestComment1});
    this.setState({commentText2: L.requestComment2});
    this.setState({correctNumber: answer});
    this.setState({moveNext: false});
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
      n[0] = Math.floor( Math.random() * 11 ) ;
      n[1] = Math.floor( Math.random() * 11 ) ;

      answer = n[0] + n[1];

      // 生成された設問の答えが2桁の場合はやり直し
      if (answer > 9) {
        continue;
      }

      // 設問用文字列を生成
      questionText = "" + n[0] + " + " + n[1] + " = "

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
      this.setState({commentText2: L.correctComment2});
      this.setState({moveNext: true});
    } else {
      // 間違いの場合
      this.setState({commentText1: L.incorrectComment1});
      this.setState({commentText2: L.incorrectComment2});
    }
  }

  render() {
    return (
      <div style={{
        background: 'linear-gradient(to right bottom, #ffefba, #ffffff)',
        height: '100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'
      }} >
        <CommentText>
          {this.state.commentText1}<br />
          {this.state.commentText2}
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
        </Grid>
      </div>
    );
  }
}

export default PageAddEasy;
