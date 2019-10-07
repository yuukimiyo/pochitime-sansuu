import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'typeface-roboto';

// load global modules for style
import 'typeface-roboto';
import styled from 'styled-components';
import { styled as styledMui } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

// load local modules
import { Reset } from './CommonStyle';

/*
 * Style definitions
 */

const Main = styled.div`
    background: linear-gradient(to right bottom, #ffefba, #ffffff);
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Ul = styled.ul`
  ${Reset}
`;

const Li = styled.li`
  ${Reset}
  list-style: none;
  text-decoration: none;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ButtonMainFunction = styledMui(Button) ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  fontSize: 24,
  border: 0,
  borderRadius: 100,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '10px 30px',
  textDecoration: 'none'
});

const L = {
  title: "どれにする？",
  MultiAll: "ぜんぶ",
  Multi1: "1のだん",
  Multi2: "2のだん",
  Multi3: "3のだん",
  MultiGrade: "のだん"
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
  }

  render() {
    return (
      <Main>
        <h1>{L.title}</h1>
        <Ul>
          <Li>
            <StyledLink to='/multi-all'>
              <ButtonMainFunction>{L.MultiAll}</ButtonMainFunction>
            </StyledLink>
          </Li>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(value => (
            <Li>
              <StyledLink to={'multi-'+value}>
                <ButtonMainFunction>{value}{L.MultiGrade}</ButtonMainFunction>
              </StyledLink>
            </Li>
          ))}
        </Ul>
      </Main>
    );
  }
}

export default PageSubEasy;
