import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import tutorial_1 from '../../assets/img/tutorial_1.png'
import tutorial_2 from '../../assets/img/tutorial_2.png'
import { Divider } from "@material-ui/core";
import outline_windows from '../../assets/software/Outline-Client.exe'
import outline_android from '../../assets/software/Outline.apk'

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Tutorial() {
  const classes = useStyles();
  return (
      <div>
          
          <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Tutorial</h4>
                <p className={classes.cardCategoryWhite}>
									How to use Outline VPN on different systems
                </p>
            </CardHeader>
            <CardBody>
							<h4>1. 在 <a href='/console/dashboard'>"Dashboard"</a> 里 "Get Key"或者"Copy Key"</h4>
							<img src={tutorial_1} style={{width:'80%'}}/>
							<h4>国内翻墙复制Japan那个，国外访问网易云等复制China那个</h4>

							<Divider/>

							<h4>2. 下载客户端</h4>
								<ul><a href={outline_windows}>Windows</a></ul>
								<ul><a href="https://apps.apple.com/app/outline-app/id1356178125" target="_blank">Mac</a></ul>
								<ul><a href={outline_android}>Android</a></ul>
								<ul><a href="https://apps.apple.com/app/outline-app/id1356177741" target="_blank">IOS</a></ul>
								<ul>IOS 美区账号密码: </ul>
								<ul style={{marginLeft:20}}>WilliamBacon0314@gmail.com</ul>
								<ul style={{marginLeft:20}}>MdK20010220</ul>

              <Divider/>

              <h4>3. 打开客户端，粘贴key，连接</h4>
              <img src={tutorial_2} style={{width:'80%'}}/>
              <p>P.S.server添加了之后，可以自行重命名方便区分</p>
            </CardBody>
            </Card>
      </div>
    
  );
}
