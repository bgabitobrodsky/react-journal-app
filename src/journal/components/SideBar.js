import { TurnedInNot } from "@mui/icons-material"
import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

export const SideBar = ({drawerWidth = 240}) => {
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0} }}
    >
        <Drawer
            variant='permanent'
            open
            sx={{ display: { xs: 'block' }, 
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
            }}
        >
            <Toolbar variant='h6' noWrap component='div'>
                <Typography>Bernardo Gabito</Typography>
            </Toolbar>

            <List>
                {
                    ['Enero','Febrero','Marzo','Abril'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                    <ListItemText secondary={ 'asdf adsf asdf asdf' }/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>
    </Box>
  )
}
