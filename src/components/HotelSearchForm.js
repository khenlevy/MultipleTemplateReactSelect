import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import AsyncSelectField from 'AsyncSelectField';


const displayStyles = {
    lg: { autoComplete: { xs: 12, md: 6 }, dates: { xs: 12, md: 6 } },
    sm: { autoComplete: { md: 12 }, dates: { md: 12 } }
};

class HotelSearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadAutoCompleteResults = this.loadAutoCompleteResults.bind(this);
    }

    loadAutoCompleteResults(destinationValue) {

        //if(!destinationValue){
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
        //}

        //return this.props.fetchPlaces(destinationValue);
    }

    renderAutoComplete(){
        return (
            <Field component={ AsyncSelectField }
                   value= { this.props.destination }
                   formSubmitted={ this.state.formSubmitted }
                   name='destination'
                   label='destination'
                   loadOptions={ this.loadAutoCompleteResults }
                   conf={{
                       autoload: true,
                       minimumInput: 3,
                       backspaceRemoves: false,
                       labelKey: 'name',
                       optionComponent: this.props.customOption,
                       valueComponent: this.props.customValue
                   }}
            />
        );
    }

    handleSubmit(event) {
        const { valid, submitSearchHotels } = this.props;

        event.preventDefault();
        if (valid) {
            submitSearchHotels();
        } else {
            this.setState({ formSubmitted: true });
        }
    }

    render() {
        const { submitting, displayStyle } = this.props;
        const columnStyles = displayStyles[displayStyle];

        return (
            <form onSubmit={ this.handleSubmit }>
                <Row className="show-grid">
                    <Col { ...columnStyles.autoComplete }>
                        { this.renderAutoComplete() }
                    </Col>
                </Row>
                <Button bsStyle="primary"
                        className="pull-right"
                        type="submit"
                        disabled={ submitting }>
                </Button>
            </form>
        );
    }
}

export default HotelSearchForm;