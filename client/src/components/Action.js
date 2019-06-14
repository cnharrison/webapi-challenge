import React from 'react';

const Action = (props) => {
    return (
        <div>
             <h2>{props.description}</h2>
             <p> notes:{props.notes}
             id: {props.id}
             description: {props.description}
             completed? {props.comnpleted}></p>
            
        </div>
    );
};

export default Action;