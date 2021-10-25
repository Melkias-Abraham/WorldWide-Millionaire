import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const drawerWidth = 400;

export default function Sidebar(props) {

    const {continent, setStart} = props 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Select a continent to continue
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
        <div>
            <h3>WorldWide Millionaire 💰 </h3>
        </div>
        </Toolbar>
        <Divider />
        <Toolbar />
        <div>
        <TextField id="outlined-basic" label="Insert Name" variant="outlined" />
        </div>
        <div>
        <h4>Currently selected:</h4> <p>{continent || 'None'}</p>
        </div>
        <div>
        <Button variant="contained" onClick = {() => setStart('started')} >Start Game</Button>
        </div>
      </Drawer>
    </Box>
  );
}
