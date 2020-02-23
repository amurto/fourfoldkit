import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../utils/LoadingSpinner';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';  
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://tacera1.com/resources/Pictures/jobstock.jpeg)',
    backgroundRepeat: 'repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const JobOffer = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    let history = useHistory();

    const classes = useStyles();
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <WorkIcon />
            </Avatar>
            <div style={{ marginBottom: "20px" }}>
                <Typography component="h1" variant="h5">
                    Create a Job Opening
                </Typography>
            </div>
            {isLoading && (
                <LoadingSpinner />
            )}
            <div style={{ marginTop: "20p", marginBottom: "20px" }}>
                {error && (
                <Alert onClose={clearError} severity="error">
                    {error}
                </Alert>
                )}
            </div>
            
            <Formik
                    initialValues={{ 
                        designation: '',
                        org: '',
                        salary: '',
                        address: '',
                        info: '',
                        phone: '',
                        perk1: '',
                        perk2: '',
                        perk3: '',
                        perk4: '',
                        skill1: '',
                        skill2: '',
                        skill3: '',
                        skill4: '',
                        deadline: '',
                        openings: ''
                }}
                    validate={values => {
                        const errors = {};
                        if (!values.designation) {
                            errors.designation = 'Required';
                        }
                        if (!values.org) {
                            errors.org = 'Required';
                        }
                        if (!values.perk1) {
                            errors.perk1 = 'Required';
                        }
                        if (!values.perk2) {
                            errors.perk2 = 'Required';
                        }
                        if (!values.perk3) {
                            errors.perk3 = 'Required';
                        }
                        if (!values.perk4) {
                            errors.perk4 = 'Required';
                        }
                        if (!values.skill1) {
                            errors.skill1 = 'Required';
                        }
                        if (!values.skill2) {
                            errors.skill2 = 'Required';
                        }
                        if (!values.skill3) {
                            errors.skill3 = 'Required';
                        }
                        if (!values.skill4) {
                            errors.skill4 = 'Required';
                        }
                        if (!values.salary) {
                            errors.salary = 'Required';
                        }
                        if (!values.phone) {
                            errors.phone = 'Required'
                        } else if (
                            !/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g.test(values.phone) 
                        ) {
                            errors.phone = 'Invalid mobile number';
                        }
                        if (!values.address) {
                            errors.address = 'Required';
                        }
                        if (!values.info) {
                            errors.info = 'Required';
                        }
                        if (!values.deadline) {
                            errors.deadline = 'Required';
                        }
                        if (!values.openings) {
                            errors.openings = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const submitFormHandler = async values => {
                            let all_perks =  [values.perk1, values.perk2, values.perk3, values.perk4];
                            let all_skills =  [values.skill1, values.skill2, values.skill3, values.skill4];
                            try {
                                const responseData = await sendRequest(
                                    process.env.REACT_APP_BACKEND_URL + '/api/users/job',
                                    'POST',
                                    JSON.stringify({
                                        designation: values.designation,
                                        perks: all_perks,
                                        skills: all_skills,
                                        title: values.title,
                                        org: values.org,
                                        salary: values.salary,
                                        address: values.address,
                                        info: values.info,
                                        phone: values.phone,
                                        deadline: values.deadline,
                                        openings: values.openings,
                                        userId: auth.userId
                                    }),
                                    {
                                        'Content-Type': 'application/json'
                                    }
                                );
                                console.log(responseData);
                                history.push("/");
                            } catch(err) {
                                setSubmitting(false);
                                console.log(err);
                            }
                        }
                        submitFormHandler(values);
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="designation"
                                variant="outlined"
                                fullWidth
                                label="Designation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                                autoFocus
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.designation && touched.designation && errors.designation}
                            </div>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Organization"
                                name="org"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.org}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.org && touched.org && errors.org}
                            </div>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Address"
                                name="address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.address && touched.address && errors.address}
                            </div>
                            </Grid>
                            <Grid item xs={12}>
                            <hr></hr>
                            <h5>Information</h5>
                            </Grid>
                            <Grid item xs={12}>
                            <TextareaAutosize 
                                variant="outlined"
                                style={{ width: "100%", marginBottom: "20px" }} 
                                aria-label="minimum height" 
                                rowsMin={8} 
                                placeholder="Info about the organization" 
                                value={values.info}
                                onChange={e => { setFieldValue('info', e.target.value )}}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.info && touched.info && errors.info}
                            </div>
                            </Grid>
                            <Grid item xs={12}>
                            <hr></hr>
                            <h5>Required Skills</h5>
                            </Grid>
                            
                            
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="skill1"
                                variant="outlined"
                                fullWidth
                                label="Skill 1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.skill1}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.skill1 && touched.skill1 && errors.skill1}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="skill2"
                                variant="outlined"
                                fullWidth
                                label="Skill 2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.skill2}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.skill2 && touched.skill2 && errors.skill2}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="skill3"
                                variant="outlined"
                                fullWidth
                                label="Skill 3"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.skill3}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.skill3 && touched.skill3 && errors.skill3}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="skill4"
                                variant="outlined"
                                fullWidth
                                label="Skill 4"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.skill4}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.skill4 && touched.skill4 && errors.skill4}
                            </div>
                            </Grid>
                           
                            <Grid item xs={12} sm={12}>
                            <hr></hr>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="salary"
                                variant="outlined"
                                fullWidth
                                type="number"
                                label="Salary in &#8377;"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.salary}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.salary && touched.salary && errors.salary}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="openings"
                                variant="outlined"
                                fullWidth
                                type="number"
                                label="No. of Openings"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.openings}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.openings && touched.openings && errors.openings}
                            </div>
                            </Grid>
                            <Grid item xs={12}>
                            <hr></hr>
                            <h5>Deadline</h5>
                            <DatePicker selected={startDate} onChange={date => {
                                setStartDate(date);
                                setFieldValue('deadline', date);
                                }
                            } />
                            </Grid>
                            <Grid item xs={12}>
                            <hr></hr>
                            <h5>Contact Info</h5>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="phone"
                                variant="outlined"
                                fullWidth
                                type="tel"
                                label="Contact"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.phone && touched.phone && errors.phone}
                            </div>
                            </Grid>
                            <Grid item xs={12}>
                            <hr></hr>
                            <h5>Perks</h5>
                            </Grid>
                            
                            
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="perk1"
                                variant="outlined"
                                fullWidth
                                label="Perk 1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.perk1}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.perk1 && touched.perk1 && errors.perk1}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="perk2"
                                variant="outlined"
                                fullWidth
                                label="Perk 2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.perk2}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.perk2 && touched.perk2 && errors.perk2}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="perk3"
                                variant="outlined"
                                fullWidth
                                label="Perk 3"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.perk3}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.perk3 && touched.perk3 && errors.perk3}
                            </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                name="perk4"
                                variant="outlined"
                                fullWidth
                                label="Perk 4"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.perk4}
                            />
                            <div style={{ margin: "10px", color: "red" }}>
                                {errors.perk4 && touched.perk4 && errors.perk4}
                            </div>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting} 
                        >
                            CREATE
                        </Button>
                    </form>
                )}
                </Formik>
            </div>
        </Grid>
        </Grid>
    );
}

export default JobOffer;