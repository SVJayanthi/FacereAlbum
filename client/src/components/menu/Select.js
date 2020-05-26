import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// Select list for selecting status of task
export default function SelectList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(props.selected);

  // Change highlighted item
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle Put request to server
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (props.name == null) {
      props.func(index)
    } else {
      let data = {}
      data[props.name] = index
      const dataParams = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');
      console.log(props.id + ' was changed')
      let headers = {
          "Content-Type": "application/x-www-form-urlencoded"
      }
      fetch(('http://localhost:3001/api/id/' + props.id), {
          method: 'put',
          headers: headers,
          body: dataParams
      }).then(response => {
        console.log(response.json())
        props.func()
      }).catch(err => console.error(err))
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Return Select dropdown
  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText primary={props.list[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.list.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}