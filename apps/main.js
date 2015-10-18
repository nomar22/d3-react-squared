import React, {Component, PropTypes} from 'react';

import D3Container from './CoreComponent/d3container';
import wrapper from './CoreComponent/wrapper';
import C3Container from './CoreComponent/c3container';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

export default class mainClass extends Component {
  // this is a bit ugly here, will clean up in due time...
  render() {
    const {component, c3obj} = this.props;
    if (component) {
      const Comp = wrapper(component);
      return (<Provider store={store}>
        <Comp {...this.props} dispatch={store.dispatch}/>
      </Provider>);
    } else if (c3obj) {
      return (<Provider store={store}>
        <C3Container {...this.props} dispatch={store.dispatch}/>
      </Provider>);
    }
    return (<Provider store={store}>
      <D3Container {...this.props} dispatch={store.dispatch}/>
    </Provider>);
  }
}

mainClass.defaultProps = {
  component: 0,
};

mainClass.propTypes = {
  c3obj: PropTypes.object,
  component: PropTypes.any,
};
