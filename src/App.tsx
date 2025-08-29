import NavBar from './components/Navbar/Navbar';
import { Box, Grid } from '@mui/material';
import MapView from './Views/Map/Map';
import SideBar from './components/SideBar/SideBar';
import DronePanel from './components/DronesPanel/DronesPanel';

function App() {
  return (
    <Box className="App">
      <NavBar/>
      <Grid container>
        <Grid size={{lg: 1, md:2, xs:12}}>
          <SideBar/>
        </Grid>
        <Grid size={{lg: 11, md:10, xs: 112}}>
          <MapView/>
        </Grid>
      </Grid>
      <DronePanel/>
    </Box>
  );
}

export default App;
