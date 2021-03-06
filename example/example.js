import React, { Component } from 'react';

import { Main as Chart } from '../apps/main';

import { WrappedComponent } from './WrappedComponent';

export default class Example extends Component {
  constructor() {
    super();
    this.state = {
      fakeLineData: [],
      lineInterpolate: 'none',
    };
  }

  componentDidMount() {
    this.fakeLineData();
  }

  handleLineInterpolate(lineInterpolate) {
    this.setState({ lineInterpolate });
  }

  fakeLineData() {
    const numberLines = Math.floor(10 * Math.random()) + 1;
    const newData = [];

    const sortAsc = (a, b) => a - b;

    for (let i = 0; i < numberLines; i += 1) {
      let points = new Set();
      for (let j = 0; j < Math.floor(5 * Math.random()) + 3; j += 1) {
        points.add(Math.floor(10 * Math.random()));
      }
      points = [...points].sort(sortAsc);

      const values = [];
      for (let ii = 0; ii < points.length; ii += 1) {
        values.push({
          x: points[ii],
          y: Math.random(),
        });
      }

      newData.push({
        id: i,
        values,
      });
    }
    this.setState({ fakeLineData: newData });
  }

  render() {
    const fakeData = () => [
      {
        id: 0,
        value: 1 + Math.floor(10 * Math.random()),
      },
      {
        id: 1,
        value: 1 + Math.floor(10 * Math.random()),
      },
      {
        id: 2,
        value: 1 + Math.floor(10 * Math.random()),
      },
    ];

    const interpols =
      ['linear',
        'linear-closed',
        'step',
        'step-before',
        'step-after',
        'basis',
        'basis-closed',
        'bundle',
        'cardinal',
        'cardinal-open',
        'cardinal-closed',
        'monotone'];
    const interpolButtons = [];
    interpols.forEach((inter) => {
      interpolButtons.push(
        <button
          key={`btn${inter}`}
          onClick={() => this.handleLineInterpolate(inter)}
        >
          {inter}
        </button>);
    });

    return (<div>
      <WrappedComponent />
      And some exemplary charts (do note:{' '}
      <strong>d3-react-squared is a not a charts-library!</strong>):
      <hr />
      <button onClick={() => this.fakeLineData()}>
        New line data (random)
      </button>
      <br />
      {interpolButtons}
      <Chart
        chartType={'line'}
        data={this.state.fakeLineData}
        paddingBottom={'25%'}
        params={{
          aspectRatio: 1 / 4,
          yAxisPlacement: 'right',
          interpolate: this.state.lineInterpolate,
        }}
      />
      <Chart
        chartType={'line'}
        data={this.state.fakeLineData}
        paddingBottom={'50%'}
        params={{
          labelSize: 2,
          strokeWidth: 10,
          aspectRatio: 1 / 2,
          yAxisPlacement: 'right',
          interpolate: this.state.lineInterpolate,
        }}
      />

      <div style={{ width: '25%', display: 'inline-block' }}>
        <Chart
          data={fakeData()}
          paddingBottom={'200%'}
          params={{
            colorType: 'category',
            aspectRatio: 2,
            labelSize: 5,
          }}
        />
      </div>
      <div style={{ width: '50%', display: 'inline-block' }}>
        <Chart
          data={fakeData()}
          params={{
            colorType: 'category',
            labelSize: 2.5,
          }}
        />
      </div>
      <div style={{ width: '25%', display: 'inline-block' }}>
        <Chart
          data={fakeData()}
          paddingBottom={'200%'}
          params={{
            colorType: 'category',
            aspectRatio: 2,
            labelSize: 5,
          }}
        />
      </div>
      <div style={{ width: '50%', display: 'inline-block' }}>
        <Chart
          data={fakeData()}
          paddingBottom={'50%'}
          params={{
            colorType: 'category',
            aspectRatio: 1 / 2,
            labelSize: 2.5,
          }}
        />
      </div>
      <div style={{ width: '50%', display: 'inline-block' }}>
        <Chart
          data={fakeData()}
          paddingBottom={'50%'}
          params={{
            colorType: 'category',
            aspectRatio: 1 / 2,
            labelSize: 2.5,
          }}
        />
      </div>

      <Chart
        chartType={'pie'}
        data={fakeData()}
      />
    </div>);
  }
}
