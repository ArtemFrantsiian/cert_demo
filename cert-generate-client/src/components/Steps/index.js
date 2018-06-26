import React from 'react';
import { Tabs } from 'antd';

import './style.scss';

const TabPane = Tabs.TabPane;

export default ({ step, steps }) => (
  <Tabs
    activeKey={step.toString()}
    type="card"
    className="tac steps"
  >
    {steps.map((item, index) => (
      <TabPane
        disabled={step !== index}
        tab={index + 1}
        key={index}
        className="step"
      >
        {item}
      </TabPane>
    ))}
  </Tabs>
)