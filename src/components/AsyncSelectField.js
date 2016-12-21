import cx from 'classnames';
import Select from 'react-select';
import { FormGroup, ControlLabel, HelpBlock }  from 'react-bootstrap';


const AsyncSelectField = ({ input, label, loadOptions, conf,  meta: { touched, error } }) => {
    const onChange = (option) => {
        if (input.onChange) {
            const value = conf.valueKey ? option[conf.valueKey] : option;
            input.onChange(value);
        }

    };

    const customGroupRenderer = ({ focusedOption, focusOption, options, selectValue, valueArray }) => {
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
    };

    const renderGrouped = () => {
        return (
            <Select.Async {...input}
                          menuRenderer= { customGroupRenderer }
                          loadOptions={ loadOptions }
                          onChange={ onChange }
                          onBlur={() => input.onBlur(input.value)} // just pass the current value (updated on change) on blur
                          { ...conf }/>

        );
    };

    const renderUnGrouped = () => {
        return (
            <Select.Async {...input}
                          loadOptions={ loadOptions }
                          onChange={ onChange }
                          onBlur={() => input.onBlur(input.value)} // just pass the current value (updated on change) on blur
                          { ...conf }/>
        );
    };

    return (
        <FormGroup bsClass={ cx('form-group',{ 'has-error' : touched && error }) }>
            <ControlLabel>{label}</ControlLabel>
            {/*input.value === '' ? renderUnGrouped() : renderGrouped() */}
            { renderUnGrouped() }
            {
                touched && error &&
                <HelpBlock>{error}</HelpBlock>
            }
        </FormGroup>

    );
};

export default AsyncSelectField;