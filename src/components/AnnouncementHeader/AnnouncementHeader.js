import React from 'react'

//@material-ui
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Skeleton from '@material-ui/lab/Skeleton';

//utils
import renderHTML from 'react-render-html';

//redux
import { useSelector } from 'react-redux'

export default function AnnouncementHeader(props) {

    const announcement = useSelector(state => state.announcement)

    return (
      <GridContainer >
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={props.classes.cardTitleWhite}>Announcement</h4>
              <p className={props.classes.cardCategoryWhite}>
                New announcement published by admin
              </p>
            </CardHeader>
            <CardBody>
              {announcement !== ''
                ? //if loading finished
                  renderHTML(announcement)
                : //if loading
                  <Skeleton/>
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }