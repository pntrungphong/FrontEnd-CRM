import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import materialUITheme from '../../config/materialUITheme';

const Layout = ({ children }) => <ThemeProvider theme={materialUITheme}>{children}</ThemeProvider>;

export default Layout;
