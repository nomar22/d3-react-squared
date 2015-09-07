'use strict';

import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import c3 from 'c3';

//some examples
import {barChart} from '../charts/barChart';
import {pieChart} from '../charts/pieChart';
import {lineChart} from '../charts/lineChart';

export default class C3Component extends Component {
  constructor() {
    super();
    this.state = {
      chartObject: {},
      chartBoundTo: '',
      lastEvent: 0,
      chartStyle: { //svg-container
        display: 'block',
        position: 'relative',
        width: '100%',
        'paddingBottom': '50%', //adjust below for other aspect ratios!
        'verticalAlign': 'middle',
        overflow: 'hidden'
      }
    };
  }

  componentDidMount() {
    let {c3obj} = this.props;
    let {c3fct, c3arg} = c3obj;
    let chartObject = c3[c3fct](c3arg);
    let chartBoundTo = (c3arg.bindto).substr(1);
    this.setState({chartObject, chartBoundTo});
    //c3.generate(
    //create new chart
    //this.createNewChart.call(this, this.props.chartType, this.props);
  }

  componentWillReceiveProps(newProps) {
    let {c3obj} = newProps;
    let {c3fct, c3arg} = c3obj;
    let {chartObject} = this.state;
    chartObject[c3fct](c3arg);
    /*let {chartObject, lastEvent} = this.state;
    let {chartType, eventData} = this.props;

    //we check if we need to create a new chart or update the existing one
    if (!chartObject.mainFunction ||
      newProps.chartType !== chartType) {
      this.createNewChart.call(this, newProps.chartType, newProps);
    } else if (newProps.eventData.timeStamp <= lastEvent) {
      chartObject.updateFunction(newProps.data, newProps.params);
    }

    //Redux Events
    if (newProps.eventData.timeStamp > lastEvent) {
      this.setState({lastEvent: eventData.timeStamp});
      this.incomingEvent(newProps.eventData, ['default']);
    }*/
  }

  shouldComponentUpdate(newProps) {
    return (newProps.eventData.timeStamp <= this.state.lastEvent);
  }


  incomingEvent(obj) {
    let {data, event, eventGroup} = obj;
    let {highlightListen, highlight} = this.props;
    let {chartObject} = this.state;
    //check if you have an overlap between highlightEmit and highlightListen
    let listenGroups = highlightListen;
    let intersection = eventGroup.filter(function(n) {
      return listenGroups.indexOf(n) !== -1;
    });

    if (intersection.length && highlight && chartObject.onEvent) {
      chartObject.onEvent({d: data, e: event});
    }
  }


  handleChartEvent(d, event) {
    let {onChartEvent, highlightEmit, setEvent} = this.props;
    //call action
    if (onChartEvent) {
      onChartEvent(d, event);
    }

    //redux
    let eventObj = {data: d, event, eventGroup: highlightEmit};
    this.props.setEvent(eventObj);
  }

  render() {
    let {paddingBottom, c3obj} = this.props;
    let {bindto} = c3obj.c3arg;
    let {chartStyle, chartBoundTo} = this.state;
    if (bindto) {
      chartBoundTo = bindto.substr(1);
    }
    if (paddingBottom) {
      chartStyle = Object.assign({}, chartStyle, {paddingBottom});
    }

    return (<div id={chartBoundTo} style={chartStyle}/>);
  }
}

C3Component.defaultProps = {
  params: {},
  chartType: 'bar',
  paddingBottom: '100%',
  chartModule: barChart,
  data: [],
  highlight: true,
  highlightEmit: ['default'],
  highlightListen: ['default']
};

C3Component.propTypes = {
  chartModule: PropTypes.object,
  chartType: PropTypes.string,
  data: PropTypes.array,
  eventData: PropTypes.object.isRequired,
  highlight: PropTypes.bool,
  highlightEmit: PropTypes.array,
  highlightListen: PropTypes.array,
  onChartEvent: PropTypes.func,
  paddingBottom: PropTypes.string,
  params: PropTypes.object,
  setEvent: PropTypes.func.isRequired,
};
