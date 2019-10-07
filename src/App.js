/* App.js
 * 2019/10/06
 * yuuki.miyo@gmail.com
 */

// load global modules for function
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// load global modules for style
import 'typeface-roboto';
import styled from 'styled-components';
import { styled as styledMui } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

// load local modules
import { Reset } from './CommonStyle';
import PageAddEasy from './PageAddEasy';
import PageSubEasy from './PageSubEasy';
import PageMultiIndex from './PageMultiIndex';
import PageMultiAll from './PageMultiAll';

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

/*
 * Function definitions
 */

const L = {
  title: "ぽちさんすう!",
  buttonToAddEasy: "たしざん",
  buttonToSubEasy: "ひきざん",
  buttonToMulti: "かけざん"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/add-easy' component={PageAddEasy} />
          <Route path='/sub-easy' component={PageSubEasy} />
          <Route path='/multi' component={PageMultiIndex} />
          {['all', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(value => (
            <Route path={'/multi-'+value} render={() => <PageMultiAll grade={value}/>} />
          ))}
        </Switch>
      </div>
      </Router>
    );
  }
}

const Home = () => (
  <Main>
    <h1>{L.title}</h1>
    <Ul>
      <Li>
        <StyledLink to='/add-easy'>
          <ButtonMainFunction>{L.buttonToAddEasy}</ButtonMainFunction>
        </StyledLink>
      </Li>
      <Li>
        <StyledLink to='/sub-easy'>
          <ButtonMainFunction>{L.buttonToSubEasy}</ButtonMainFunction>
        </StyledLink>
      </Li>
      <Li>
        <StyledLink to='/multi'>
          <ButtonMainFunction>{L.buttonToMulti}</ButtonMainFunction>
        </StyledLink>
      </Li>
    </Ul>
  </Main>
)

export default App;
