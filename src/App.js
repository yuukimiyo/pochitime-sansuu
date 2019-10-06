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
import PageAddEasy from './PageAddEasy';
import PageSubEasy from './PageSubEasy';
import PageMultiAll from './PageMultiAll';


const reset = `
  margin:0;
  padding:0;
  border:0;
  outline:0;
  font-size:100%;
  vertical-align:baseline;
  background:transparent;
  text-decoration: none;
`;

const Ul = styled.ul`
  ${reset}
`;

const Li = styled.li`
  ${reset}
  list-style: none;
  text-decoration: none;
`;

const ButtonMainFunction = styledMui(Button) ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  fontSize: 24,
  border: 0,
  borderRadius: 100,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  marginBottom: '10px',
  padding: '10px 30px',
  textDecoration: 'none'
});

const L = {
  title: "ぽちさんすう!",
  buttonToAddEasy: "たしざん",
  buttonToSubEasy: "ひきざん",
  buttonToMultiAll: "かけざん"
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
          <Route path='/multi-all' component={PageMultiAll} />
        </Switch>
      </div>
      </Router>
    );
  }
}

const Home = () => (
  <div style={{
    background: 'linear-gradient(to right bottom, #ffefba, #ffffff)',
    height: '100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'
  }}>
    <h1>{L.title}</h1>
    <Ul>
      <Li>
        <Link to='/add-easy' style={{ textDecoration: 'none' }}>
          <ButtonMainFunction>{L.buttonToAddEasy}</ButtonMainFunction>
        </Link>
      </Li>
      <Li>
        <Link to='/sub-easy' style={{ textDecoration: 'none' }}>
          <ButtonMainFunction>{L.buttonToSubEasy}</ButtonMainFunction>
        </Link>
      </Li>
      <Li>
        <Link to='/multi-all' style={{ textDecoration: 'none' }}>
          <ButtonMainFunction>{L.buttonToMultiAll}</ButtonMainFunction>
        </Link>
      </Li>
    </Ul>
  </div>
)

export default App;
