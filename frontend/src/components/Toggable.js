import React, { useState, useImperativeHandle } from "react";
import PropTypes from 'prop-types';

const Toggable = React.forwardRef((props, refs) => {

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    }


    useImperativeHandle(refs, () => {
        return { toggleVisibility };
    })
    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className='btn btn-secondary' onClick={() => toggleVisibility() }>{ props.btnLabel }</button>
            </div>
            <div style={ showWhenVisible } className="togglableContent">
                { props.children }
                <button className="btn btn-warning" onClick={ () => toggleVisibility() } >Cancel</button>
            </div>
        </div>
    );
});

Toggable.propTypes = {
    btnLabel: PropTypes.string.isRequired
}

Toggable.displayName = 'Toggable';

export default Toggable;