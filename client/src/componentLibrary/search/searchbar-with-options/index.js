import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
export default function SearchbarWithOptions({ options, value, setValue }) {
  const [inputValue, setInputValue] = React.useState('');
  const history = useHistory();
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        const url = newValue.replace(/ /g, '').toLowerCase();

        history.push('/' + url);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="dense"
          label="Search"
          variant="outlined"
        />
      )}
    />
  );
}
