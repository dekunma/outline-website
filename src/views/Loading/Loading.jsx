import React from 'react'
import { primaryColor } from '../../assets/jss/material-dashboard-react'
import { DominoSpinner } from "react-spinners-kit";

export default function Loading(){

    return(
        <div>
            <div style={{margin:'auto', position:'fixed', top:0, left:0, right:0, bottom:0, width:100, height:10}}>
                <DominoSpinner color={primaryColor[0]} />
            </div>
        </div>
    )
}