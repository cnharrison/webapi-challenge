import React from 'react';

const Action = (props) => {
    return (
        <div>
             {props.id}
             {props.notes}
             {props.description}
             {props.comnpleted}
            
        </div>
    );
};

export default Action;