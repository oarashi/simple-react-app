import React from 'react';
import styles from './style';

export default ({ id, name = id, type, warning, players, maxPlayers }) => {
    const statusError = warning ? 'tableError' : 'table';
    const handleClick = name => () => alert(name);
    return (
        <div style={styles.containerDefault} className={statusError} onClick={handleClick(name)}>
            <div style={styles.header}>
                <div>Table {name}</div>
                <div>Players: {players}/{maxPlayers}</div>
            </div>

        </div>
    )
}

