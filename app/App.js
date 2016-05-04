var Firebase = require('firebase');

import React, {
  Component,
  View,
  Navigator
} from 'react-native';

import Home from '../scenes/Home';
import About from '../scenes/About';
import Instagram from '../scenes/Instagram';
import store from '../redux/appStore';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillMount() {
    // snap is the snapshot of the data
    this.firebaseRef = new Firebase("https://blistering-inferno-4190.firebaseio.com/pages");
  }

  /**
   *
   * TODO's:
   *
   * 1. Setup initial state hydration (with real church data) until
   *    firebase values are loaded than switch out...
   *
   */

  componentDidMount() {
    this.firebaseRef.on("value", function(dataSnapshot) {
      store.dispatch({
        type: 'GET_PAGE',
        page: dataSnapshot.val()
      })
    }.bind(this));
  }

  onSceneForward() {
    this.nav.push({
      name: 'about',
      index: 1
    });
  }

  onSceneInstagram() {
    this.nav.push({
      name: 'instagram',
      index: 2
    });
  }

  onSceneBack() {
    this.nav.pop();
  }

  getPagePayload(type) {

    var {page} = this.state;

    var payload = {
      title: '',
      body: ''
    }

    if (page) {
      payload = {
        title: page[type].title,
        body: page[type].body
      }
    }

    return payload;

  }

  renderScene(route, nav) {

    switch (route.name) {
      case 'about':
        return (
          <About
            payload={this.getPagePayload('about')}
            onSceneSwitch={this.onSceneBack.bind(this)} />
        );
      case 'home':
        return (
          <Home
            payload={this.getPagePayload('home')}
            onSceneSwitch={this.onSceneForward.bind(this)}
            onSceneInstagram={this.onSceneInstagram.bind(this)} />
        );
      case 'instagram':
        return (
          <Instagram
            onSceneSwitch={this.onSceneBack.bind(this)} />
        );
      default:
        return (
          <Home
            payload={this.getPagePayload('home')}
            onSceneSwitch={this.onSceneBack.bind(this)}
            onSceneInstagram={this.onSceneInstagram.bind(this)} />
      );
    }
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {

    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'home', index: 0 }}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

export default App;
