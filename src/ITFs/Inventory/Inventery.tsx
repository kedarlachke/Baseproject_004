import React from 'react'
import { Input } from '../common/InputFields/Input/Input'
import { Select } from '../common/InputFields/Select/Select'
import { Button } from '../common/Button/Button'
import { Checkbox } from '../common/InputFields/Checkbox/Checkbox'
import '../common/common.css'
import { RadioGroup } from '../common/InputFields/RadioButton/RadioGroup'
import Radio from '../common/InputFields/RadioButton/Radio'
import DatePicker from '../common/DatePicker/DatePicker'
export default function Inventery(props: any) {
  return (
    <div className="container">
      <div className="grid">
        <div className="row">
          <Input wd="4" label="User Name" name="username" value="" />
          <Input wd="4" label="User Name" name="username" value="" />
          <Input wd="4" label="User Name" name="username" value="" />
        </div>
        <div className="row">
          <Input wd="8" label="User Name" name="username" value="" />
          <Input wd="4" label="User Name" name="username" value="" />
        </div>
        <div className="row">
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
        </div>
        <div className="row">
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Input wd="3" label="User Name" name="username" value="" />
          <Input wd="3" label="User Name" name="username" value="" />
        </div>
        <div className="row">
          <Input wd="3" label="User Name" name="username" value="" />
          <Input wd="3" label="User Name" name="username" value="" />
          <Input wd="3" label="User Name" name="username" value="" />
          <Input wd="3" label="User Name" name="username" value="" />
        </div>
        <div className="row">
          <Input wd="3" label="User Name" name="username" value="" />
          <Input wd="3" label="User Name" name="username" value="" />
          <Input wd="6" label="User Name" name="username" value="" />
        </div>
        <div className="row">
          <Input wd="4" label="User Name" name="username" value="" />
          <Input wd="2" label="User Name" name="username" value="" />
          <Select
            wd="6"
            label="User Name"
            options={['abc', 'pqr', 'xyz']}
            name="username"
            value=""
          />
        </div>

        <RadioGroup {...props}>
          <Radio wd="2" label="Option 1" groupname="gender" id="male"></Radio>
          <Radio wd="2" label="Option 1" groupname="gender" id="female"></Radio>
          <Radio
            wd="2"
            label="Option 1"
            groupname="gender"
            id="mentionnot"
          ></Radio>
          <div className="col-6"></div>
        </RadioGroup>

        <div className="row">
          <Checkbox wd="3" />
          <div className="col-3"></div>
          <Button
            wd="2"
            label="Clear"
            name="register"
            className="btn-deault btn-small"
          />
          <Button
            wd="2"
            label="Register"
            name="register"
            className="btn1 btn-small"
          />
          <Button
            wd="2"
            label="Register"
            name="register"
            className="btn1 btn-small"
          />
        </div>
        <div className="row">
          <div className="col-4">
            <DatePicker {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}
