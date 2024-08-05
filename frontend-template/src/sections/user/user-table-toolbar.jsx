import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl, { useFormControl } from '@mui/material/FormControl';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filterName }) {
  return (

    <form noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="Please enter text" />
        {/* <MyFormHelperText /> */}
      </FormControl>
    </form>

    // <FormControl
    //   sx={{
    //     height: 96,
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     p: (theme) => theme.spacing(0, 1, 0, 3),
    //   }}
    // >
    //   <OutlinedInput
    //     value={filterName}
    //     placeholder="Message"
    //     fullWidth
    //     notched
        // startAdornment={
        //   <InputAdornment position="start">
        //     <Iconify
        //       icon="eva:message-square-fill"
        //       sx={{ color: 'text.disabled', width: 20, height: 20 }}
        //     />
        //   </InputAdornment>
        // }
    //   />
    // </FormControl>
  );
}

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
};
