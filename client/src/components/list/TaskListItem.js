import React from 'react';
import {Avatar} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SelectList from '../menu/Select'


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Individual item displays information about specific task
export default class TaskListItem extends React.Component {
    handleDelete = () =>{
        console.log(this.props.title + ' was deleted')
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        fetch(('http://localhost:3001/api/id/' + this.props.item.id), {
            method: 'delete',
            headers: headers,
        }).then(response => console.log(response.json()))
            .catch(err => console.error(err))
        this.props.func()
    }

    // Output filtering
    printDue() {
      if (this.props.item.due_date == null) {
        return "N/A"
      } else {
        let date = new Date(this.props.item.due_date)
        return date.toDateString() + " " + date.toTimeString()
      }
    }

    printPost() {
        let date = new Date(this.props.item.time)
        return date.toDateString() + " " + date.toTimeString()
    }

    // Change colors based on priority
    colorPicker() {
      if (this.props.item.priority === 0) {
        return 'lightcoral'
      } else if (this.props.item.priority === 1) {
        return 'lightcyan'
      } else {
        return 'lightgreen'
      }
    }

    // Return individual list item
    render(){
        return (
          <div style = {{flexGrow: 1}}>
            <Paper style = {{ backgroundColor: this.colorPicker()}}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <Avatar>
                    <AssignmentIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs={8}>
                      <Typography gutterBottom variant="subtitle1">
                        {this.props.item.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {this.props.item.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {this.printPost()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                      <SelectList list = {['Not Started','In Progress','Done']} 
                      selected = {this.props.item.progress} 
                      id = {this.props.item.id}
                      name = "progress"
                      func = {this.props.func}/>
                  </Grid>
                  
                  <Grid item xs={2}>
                      <SelectList list = {['High', 'Medium','Low']} 
                      selected = {this.props.item.priority} 
                      id = {this.props.item.id}
                      name = "priority"
                      func = {this.props.func}/>
                  </Grid>
                  
                  <IconButton edge="end" aria-label="delete" onClick={this.handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                </Grid>
                
              <Grid item xs={12}>
                      <Typography variant="body2" style={{ cursor: 'pointer' }}>
                        Due: {this.printDue()}
                      </Typography>
                    </Grid>
              </Grid>
              
            </Paper>
          </div>
        )
    }


}