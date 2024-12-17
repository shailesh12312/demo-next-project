"use client"
import React from 'react';
import {Stack, styled, Typography, List, ListItem, ListItemIcon, ListItemText, Box} from '@mui/material';
import { Home, Settings, Info } from '@mui/icons-material';
import Link from '@mui/material/Link';

const SidebarContainer = styled(Stack)(({ theme }) => ({
  width: '250px',
  height: '100vh',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
}));

const SidebarLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Sidebar = () => {
  return (
    <SidebarContainer spacing={2}>
      <Box height="100%">
        <Typography variant="h6">My Application</Typography>
        <List>
          <SidebarLink to="/">
            <ListItem>
              <ListItemIcon>
                <Home style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </SidebarLink>
          <SidebarLink to="/settings">
            <ListItem>
              <ListItemIcon>
                <Settings style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </SidebarLink>
          <SidebarLink to="/about">
            <ListItem>
              <ListItemIcon>
                <Info style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </SidebarLink>
        </List>
      </Box>
      <SidebarLink to="/logout">
        <ListItem>
          <ListItemIcon>
            <Info style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;