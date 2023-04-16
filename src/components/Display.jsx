import React from "react";
import './Display.css'

export default props =>
    <div className="display">
        <div className="value">{props.value}</div>
    </div>