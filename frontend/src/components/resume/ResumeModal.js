import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResumeModal = props => {
    const linkToResume = `http://localhost:5000/resumes/${props.resumePath}`
    return (
        <Dialog
            open={props.show}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Resume"}</DialogTitle>
            <DialogContent>
                    <div>email: {props.email}</div>
                    <div>Mobile No: {props.mobile}</div>
                    <div>Experience: {props.experience}</div>
                    <div>College: {props.college}</div>
                    <div>Company: {props.company}</div>
                    <div>Degree: {props.degree}</div>
                    <div>Designation: {props.designation}</div>
                    <div>
                        <a href={linkToResume} className="btn resume-btn">View Resume</a>
                    </div>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default ResumeModal;