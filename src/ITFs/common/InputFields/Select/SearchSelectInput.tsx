import React from 'react'
import './SearchSelectInput.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../../validationlib';
interface Iinput {
  wd?: string
  label: string
  name: string
  currdoc: any,
  section: string,
  cal?:string,
  modifydoc:any
}

export function Input(props: Iinput) {
  const { wd, label, name, section, currdoc,modifydoc,cal } = props
  let classname = 'search-input-field'
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }
  return (
    <div className={`col-${wd}`}>
       <div className="container">
      <h2>Video Category</h2>

      <div className="select-box">
        <div className="options-container">
          <div className="option">
            <input
              type="radio"
              className="radio"
              id="automobiles"
              name="category"
            />
            <label htmlFor="automobiles">Automobiles</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="film" name="category" />
            <label for="film">Film & Animation</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="science" name="category" />
            <label for="science">Science & Technology</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="art" name="category" />
            <label for="art">Art</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="music" name="category" />
            <label for="music">Music</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="travel" name="category" />
            <label for="travel">Travel & Events</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="sports" name="category" />
            <label for="sports">Sports</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="news" name="category" />
            <label for="news">News & Politics</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="tutorials" name="category" />
            <label for="tutorials">Tutorials</label>
          </div>
        </div>

        <div className="selected">
          Select Video Category
        </div>
      </div>
    </div>
      <div className="field-error">{errorMsg}</div>
    </div>
  )
}

export const SearchSelectInput = React.memo(Input)
