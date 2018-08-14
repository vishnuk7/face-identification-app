import React from 'react';
import './inputForm.css';

const InputForm = (props)=>(
    <section className="section_input">
        <form onSubmit={props.onButtonSubmit}>
            <input onChange={props.onInputChange} className="input_form" type="text" placeholder="url" />
            <button>Detect</button>
        </form>
    </section>
);

export default InputForm;