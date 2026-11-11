import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import { TransitionGroup } from 'react-transition-group';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Work from './pages/Work';
import About from './pages/About';
import Certifications from './pages/Certifications';
import PageMetadata from './components/PageMetadata';
import './css/style.css';
import './css/App.css';
import './css/hover-min.css';

class App extends Component {
  render() {
    return (
      <>
        <PageMetadata />
        <Navbar />
        <Jumbo className="jumbo">
          <Container as="main" style={{ minHeight: "50vh" }}>
            <Switch>
              <Route exact path="/work">
                <TransitionGroup>
                  <Work />
                </TransitionGroup>
              </Route>
              <Route exact path="/certifications">
                <TransitionGroup>
                  <Certifications />
                </TransitionGroup>
              </Route>
              <Route exact path="/">
                <TransitionGroup>
                  <About />
                </TransitionGroup>
              </Route>
              <Route exact path="/privacy" component={Privacy} />
              <Route>
                <h1>Page not found</h1>
                <p>This page does not exist. <a href="/">Return home</a>.</p>
              </Route>
            </Switch>
          </Container>
        </Jumbo>
        <Footer />
      </>
    )
  }
}

export default App;
