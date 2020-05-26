import React from 'react';
import ButtonAppBar from './components/AppBar'
import TaskList from './components/list/TaskList'
import Create from './components/Form'
import Grid from '@material-ui/core/Grid';
import './App.css';

// Main file that includes all elements on application
function App() {
  return (
    <div className="App"> 
      <ButtonAppBar color = 'white'/>
      
      <Grid container spacing={3} style={{marginTop: "10px"}}>
        <Grid item xs={6}>
            <TaskList id = {0}/>
        </Grid>
        <Grid item xs={6}>
          <Create/>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
