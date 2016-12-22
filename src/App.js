import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchPlaces from '../src/fetchPlaces'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const divStyle = {
    width: '30%'
};

class App extends Component {

    customGroupRenderer({ focusedOption, focusOption, options, selectValue, valueArray }) {
        return (
            <ul>
                <li>
                    { options.map((group) => {
                        if(group.type) {
                            return (
                                <ul>
                                    <span>{group.type}</span>
                                    { group.items.map( (item) => { return <li>{ item.name }</li>})}
                                </ul>
                            );
                        }
                    })}
                </li>
            </ul>
        )
    }

    loadAutoCompleteResults(destinationValue) {

        if(destinationValue === ''){
            return Promise.resolve({
                options: [
                    {
                        type: 'Recent Searches',
                        items: [
                            {
                                name: "O'Hare International Airport (ORD)",
                                lon: '-87.905',
                                lat: '41.977',
                                type: 'cities'
                            },
                            {
                                title: "O'Hare International Airport (ORD)",
                                lon: '-87.905',
                                lat: '.977',
                                type: 'cities'
                            }
                        ]
                    },
                ]
            });
        }

        /*לא מצליח להחזיר כרגיל משום מה.*/

        return fetchPlaces(destinationValue);
    }

  render() {
        if(true){
           return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>


                    <br />
                    <div style={divStyle}>
                        <Select.Async
                            name="form-field-name"
                            menuRenderer= { this.customGroupRenderer }
                            //loadOptions={fetchPlaces}
                            loadOptions={ this.loadAutoCompleteResults }
                        />
                    </div>
                </div>
            );
        }

            return (
              <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Welcome to React</h2>
                </div>


                <br />
                <div style={divStyle}>
                  <Select.Async
                     name="form-field-name"
                     //loadOptions={fetchPlaces}
                     loadOptions={ this.loadAutoCompleteResults }
                  />
                </div>
              </div>
            );
  }
}

export default App;
