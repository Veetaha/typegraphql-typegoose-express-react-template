import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#4527A0' },
    secondary: { main: '#283593' },
    
};

export default createMuiTheme({ palette, typography: { useNextVariants: true } });