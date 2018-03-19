import React, { PureComponent } from 'react';
import Table from 'components/Table';
import { connect } from 'react-redux';
import WithTimer from 'hoc/withDataByTimer'
import selectors from './selectors';
import * as actions from './actions';
import styles from './style';

class Tables extends PureComponent {

    componentDidMount() {
        this.props.getTables()
    }

    render() {
        const { tableData } = this.props;
        return (
            <div style={styles.mainLayout}>
                {!!tableData.length && tableData.map(item => <Table key={item.id} {...item}/>)

                }
            </div>)
    };
}

export default connect(selectors, actions)(WithTimer(Tables, 5000));