import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/Add";
//import { withStyles } from "@material-ui/core/styles";
import AddItemDialog from "./AddItemDialog";

// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//     outline: 'none',
//   },
// });

// const defaultToolbarStyles = {
//   iconButton: {
//   },
// };

class CustomToolbar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      showModal : false
    }
  }

  handleClick = () => {
    this.setState({
      showModal : true
    })
  }

  onPressCancel = () => {
    this.setState({
      showModal : false
    })
  }

  render() {
    //const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Nowa pozycja"}>
          <IconButton onClick={this.handleClick}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <AddItemDialog open={this.state.showModal} onPressCancel={()=>this.onPressCancel()} />
      </React.Fragment>
    );
  }

}

//export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);
export default CustomToolbar;