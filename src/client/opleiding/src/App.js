import React, { Component } from 'react';

import {
  Collapse, Navbar, Nav, Container, Row,
  NavbarToggler, NavbarBrand, NavLink, NavItem
} from 'reactstrap';
import { NavLink as RRNavLink, HashRouter, Route } from 'react-router-dom';
import CursusLijstContainer from './components/CursusLijst';
import CursistLijstContainer from './components/CursistLijst';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <HashRouter>
        <Container>

          <Row>

            <Navbar color="light" light expand="md">
              <NavbarToggler onClick={this.toggle} />
              <NavbarBrand href='/'>Cursussen en cursisten</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/cursussen" activeClassName="active">Andere</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

          </Row>
            <Route exact path="/" render={() => <CursusLijstContainer />}></Route>
            <Route path="/cursussen" component={CursistLijstContainer}></Route>


        </Container>
      </HashRouter>
    );
  }
}

export default App;
