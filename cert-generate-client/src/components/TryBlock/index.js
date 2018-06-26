import React, {Fragment} from "react";
import { Card, Icon, Row, Col } from "antd";

import "./style.scss";
import * as blockexplorer from "./blockexplorer.png";
import * as monitoring from "./monitoring.png";
import * as feedback from "./feedback.png";

const { Meta } = Card;

const cards = [
  {
    cover: blockexplorer,
    link: "https://explorer.testnet.remme.io/",
    title: "Block Explorer",
    description: "A block explorer is a program or website accessible through a compatible browser that allows a user to search and navigate the blocks of a blockchain, their contents, and their relevant details.",
    button: <Fragment><Icon type="fork" /> Explore</Fragment>
  },
  {
    cover: monitoring,
    link: "https://status.remme.io/",
    title: "Monitoring",
    description: "You can navigate to monitoring system to see the current status of the testnet infrastructure.",
    button: <Fragment><Icon type="tool" /> Navigate</Fragment>
  },
  {
    cover: feedback,
    link: "http://remchain.remme.io/feedback",
    title: "Feedback",
    description: "You can navigate to feedback form to send us your comments.",
    button: <Fragment><Icon type="form" /> Fill</Fragment>
  },
];

export default () => (
  <div className="tryblock-section">
    <div className="holder">
      <Row gutter={16}>

      {
        cards.map(item => (
          <Col span={8}>
            <a href={item.link}>
              <Card
                style={{ width: 300 }}
                cover={<img alt={item.title} src={item.cover} height={150}/>}
                actions={[item.button]}
              >
                <Meta
                  style={{height: 160}}
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </a>
          </Col>
        ))
      }

      </Row>
    </div>
  </div>
)
