import './ThemeSwitch.css'
import React, {useState} from 'react';

function ThemeSwitch (){

  const[isChecked, setIsChecked] = useState(false);
  
  //function that changes the theme, and sets a localStorage variable to track the theme between page loads
  function switchTheme(e) {
    const toggleSwitch = document.querySelector("#theme-toggle-button");
    const btnToggleText = document.querySelector(
      'label[for="theme-toggle-button"] span'
    );

    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setIsChecked(true);
      btnToggleText.innerText = "light";
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      setIsChecked(false);
      btnToggleText.innerText = "dark";
    }
  }


    return (
        <div className="switch-holder">
            <label className="switch-container" htmlFor="theme-toggle-button">
              <input name="theme-switch" id="theme-toggle-button" type="checkbox" onChange={(e) => switchTheme(e)}/>
              <span className="screen-reader-only" id="toggle-announce" >switch to dark theme</span>
            </label>
            <div className="moon">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
            </div> 
          </div>
    )
}

export default ThemeSwitch