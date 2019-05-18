import React from 'react';

const Project = (props) => {
    return (
        <div>
            {props.id}<br/>
            {props.name}<br/>
            {props.description}<br/>
            {props.completed}<br/>
        </div>
    );
};

export default Project;