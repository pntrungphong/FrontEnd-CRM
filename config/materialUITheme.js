import { createMuiTheme } from '@material-ui/core/styles';
import defaultSettings from './defaultSettings';

export default createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: defaultSettings.var['primary-color'],
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: defaultSettings.var['primary-color'],
    },
    success: {
      main: defaultSettings.var['success-color'],
    },
    error: {
      main: defaultSettings.var['error-color'],
    },
    warning: {
      main: defaultSettings.var['warning-color'],
    },
    info: {
      main: defaultSettings.var['info-color'],
    },
    action: {
      hover: defaultSettings.var['primary-color'],
    },
    text: {
      primary: defaultSettings.var['text-color'],
    },
  },
});
