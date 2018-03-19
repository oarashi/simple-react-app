import React, { PureComponent } from 'react'

const debounceInterval = 3000;

function withTimer(WrappedComponent, interval) {
    return class extends PureComponent {
        componentDidMount() {
            this.timer = setInterval(
                () => this.props.getTables(),
                interval || debounceInterval,
            );
        }

        componentWillUnmount() {
            clearInterval(this.timer);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export default withTimer;