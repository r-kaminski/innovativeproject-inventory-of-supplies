import React from 'react';
import Input from '@material-ui/core/Input';

export default class ButtonImportCSV extends React.Component {
    render() {
        return (
            <Input
                type="file"
                onChange={event => {
                    if (event.target.files) {
                        this.props.onSelect(event.target.files[0]);
                    }
                }}
            />
        );
    }
}
