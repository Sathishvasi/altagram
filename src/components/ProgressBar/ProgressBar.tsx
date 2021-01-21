/*
 *  ProgressBar component
 *
 */

import React from "react";
import "styles/ProgressBar.scss";

interface Props {
  value: number;
}

type State = {
    value:number
  };

  class ProgressBar extends React.Component<Props, State> {
    state: State = {
        value:this.props.value
    }

    componentDidUpdate(prevProps:Props) {
        if (prevProps.value !== this.props.value) {
            this.setState({value:this.props.value})
        }
    }

    render() {
        const {value} = this.state

        return (
        <div className="progressbar">
            <div className="progress" style={{width:`${value}%`}}></div>
        </div>
        )
    }
}

export default ProgressBar;
