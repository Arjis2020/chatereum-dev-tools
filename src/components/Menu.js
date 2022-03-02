import React from 'react'
import { Drawer, Toolbar, Divider, List, ListItem, ListItemText, ListItemIcon, Typography, Stack } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Key, Https, Visibility } from '@mui/icons-material';

export default function Menu({ index }) {
    const DRAWER_WIDTH = 300
    return (
        <Drawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <Typography
                    variant='h6'
                >
                    Chatereum Dev Tools
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => index(0)}
                >
                    <ListItemIcon>
                        <Key htmlColor='#304fff' />
                    </ListItemIcon>
                    <ListItemText primary={"Generate Keys"} />
                </ListItem>
                <ListItem
                    button
                    onClick={() => index(1)}
                >
                    <ListItemIcon>
                        <Https htmlColor='#304fff' />
                    </ListItemIcon>
                    <ListItemText primary={"Encrypt"} />
                </ListItem>
                <ListItem
                    button
                    onClick={() => index(2)}
                >
                    <ListItemIcon>
                        <Visibility htmlColor='#304fff' />
                    </ListItemIcon>
                    <ListItemText primary={"Decrypt"} />
                </ListItem>
            </List>
        </Drawer>
    )
}
