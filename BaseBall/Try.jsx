import React, { PureComponent } from 'react'

export default class Try extends PureComponent {
    render() {

        const {tryInfo} = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}
