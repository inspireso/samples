/*
 * Copyright (c) 2023, inspireso.org
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const React = require('react');
var DatePicker = require('./Daterangepicker');

function formGroup(field, object) {
  // var object = this.state.product;
  if (field.type === "checkbox") {
    return (
      <div className="form-group" key={field.id} ref={"div_" + field.id}>
        <div className="col-sm-offset-2 col-sm-10">
          <div className="checkbox">
            <label>
              <input ref={field.id} type="checkbox"
                     defaultChecked={field.value ? field.value(object) : object[field.id]}/>{field.name}
            </label>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div key={field.id} className="form-group" ref={"div_" + field.id}>
        <label htmlFor={"input-" + field.id}
               className="col-sm-2 control-label">{field.name}</label>

        <div className="col-sm-10">
          {inputGroup(field, object)}
        </div>
      </div>
    )
  }
}

function inputGroup(field, object) {
  var dv = field.value ? field.value(object) : object[field.id];
  if (field.addon) {
    return (
      <div className="input-group">
        {field.addon ? field.addon() : null}
        <input
          className="form-control"
          id={"input-" + field.id}
          ref={field.id}
          type={field.type ? field.type : "text"}
          placeholder={field.placeholder ? field.placeholder : ""}
          defaultValue={dv}
          {...field.attrs}/>
      </div>
    )
  }
  else if (field.type === "date") {
    return(
      <DatePicker
        className="form-control"
        id={"input-" + field.id}
        ref={field.id}
        type={field.type ? field.type : "text"}
        placeholder={field.placeholder ? field.placeholder : ""}
        defaultValue={dv}
        {...field.attrs}/>
    );
  }
  else if (field.type === "select") {
    var options = field.options.map(opt => {
      return <option key={opt.value} value={opt.value}>{opt.name}</option>;
    });

    return (
      <select className="form-control"
              id={"input-" + field.id}
              ref={field.id}
              placeholder={field.placeholder ? field.placeholder : ""}
              defaultValue={dv}
              {...field.attrs}>
        {options}
      </select>
    );

  } else {
    return (
      <input
        className="form-control"
        id={"input-" + field.id}
        ref={field.id}
        type={field.type ? field.type : "text"}
        placeholder={field.placeholder ? field.placeholder : ""}
        defaultValue={dv}
        {...field.attrs}/>
    )
  }
}

module.exports = {
  formGroup: formGroup
};
