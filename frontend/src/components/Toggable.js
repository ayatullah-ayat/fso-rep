import { useState, forwardRef, useImperativeHandle } from "react";

const Toggable = forwardRef((props, refs) => {

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
            <div style={ showWhenVisible }>
                { props.children }
                <button className="btn btn-warning" onClick={ () => toggleVisibility() } >Cancel</button>
            </div>
        </div>
    );
});

export default Toggable;