import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';
import CategoryIcon from '@mui/icons-material/Category';
import Typography from '@mui/material/Typography';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <CategoryIcon sx={{fontSize:"45px"}}/><Typography variant='h1'sx={{fontSize:"40px"}}>ERP</Typography>
    </ButtonBase>
  );
};

export default LogoSection;
