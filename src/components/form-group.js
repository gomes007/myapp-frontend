import React from "react";

function FormGroup(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.htmlFor} className="col-lg-2 control-label">{props.label}</label>
      <div className="col-lg-10">
        {props.children}
      </div>
    </div>
  );
}

export default FormGroup;