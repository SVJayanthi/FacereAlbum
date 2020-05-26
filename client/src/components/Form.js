import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// CSS configuration
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '20px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'coral',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Priorities maping
const priorities = [
    {
        value: 0,
        label: 'High'
    },
    {
        value: 1,
        label: 'Medium'
    },
    {
        value: 2,
        label: 'Low'
    }
]

// Function using React hooks that handles creation of new task
export default function Create() {
  const classes = useStyles();
  const [priority, setPriority] = React.useState(2);
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState(null)
  const [date, setDate] = React.useState(null)

  // Create Post request to database
  const submit = (event) => {
    if (title !== '') {
        console.log("submitted")
        let currentDate = new Date();
        let currentDateString = (currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + 
            currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes()
            + ":00")
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        let data = {
            title: title,
            progress: 0,
            priority: priority,
            time: currentDateString,
        }
        if (description != null) {
            data.description = description
        }
        if (date != null) {
          let dueDateString = (date.getFullYear() + "-" + date.getMonth() + "-" + 
          date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
              + ":00")
          data.due_date = dueDateString
        }
        console.log(data)
        const dataParams = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
          }).join('&');
        fetch('http://localhost:3001/api', {
            method: 'post',
            headers: headers,
            body: dataParams,
        }).then(response => console.log(response.json()))
            .catch(err => console.error(err))
    } else {
        alert("Enter Title")
    }
  }

  return (
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Task
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(event) => setTitle(event.target.value)}
                required
                fullWidth
                id="title"
                label="Task Title"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                id="description"
                label="Description"
                onChange={(event) => setDescription(event.target.value)}
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="datetime"
                    label="Complete by"
                    type="datetime-local"
                    onChange={(event) => setDate(new Date(event.target.value))}
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="select-priority"
                    select
                    fullWidth
                    label="Priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    variant="outlined"
                    >
                    {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Submit
          </Button>
        </form>
      </div>
  );
}