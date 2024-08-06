import PropTypes from 'prop-types';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';



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
