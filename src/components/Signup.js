// import * as React from 'react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import { Link } from 'react-router-dom';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Bazaar
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const defaultTheme = createTheme();

  // export default function SignUp() {
  // const Signup = () =>{
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       name: data.get('firstName'),
  //       email: data.get('email'),
  //       password: data.get('password'),
  //     });
  //   };
  // }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div className='container'>
          <CssBaseline />
          <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
          <Avatar sx={{ m: 1, margin: '5px 140px auto', bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
          <Typography style={{ marginLeft: 6 }} component="h1" variant="h5">Sign up To Create an Account </Typography>
          <form onSubmit={handleSubmit}>
            {/* <container spacing={2}> */}
            <Grid container spacing={1} style={{ marginTop: 10, }}>
              <Grid item xs={13}>
                <div className="form-group my-2" noValidate>
                  <TextField required fullWidth type="text" id="name" label="Full Name" name="name" onChange={onChange} autoComplete="name" />
                </div>
              </Grid>
              <Grid item xs={13}>
                <div className="form-group my-1">
                  {/* <label htmlFor="email">Email</label> */}
                  <TextField required fullWidth type="email" id="email" label="Email Address" name="email" onChange={onChange} autoComplete="email" />
                  {/* <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-label="Email Address" aria-describedby="emailHelp" placeholder="Enter email"/> */}
                </div>
              </Grid>
              <Grid item xs={13}>
                <div className="form-group my-1">
                  {/* <label htmlFor="password" className="form-label">Password</label> */}
                  <TextField required fullWidth type="password" id="password" label="Password" name="password" onChange={onChange} autoComplete="password" />
                  {/* <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required placeholder="Password"/> */}
                </div>
              </Grid>
              {/* <div className="form-group my-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required placeholder="Confirm Password"/>
                  </div> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Signup
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="nav-item" to="/login">
                  Already Have Account? Login
                </Link>
              </Grid>
            </Grid>
            {/* <button type="submit" className="btn btn-primary my-3">Submit</button> */}
          </form>
        </div>
        <Box />
      </Container>
    </ThemeProvider>
  )
};

export default Signup


































// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom';


// const Signup = (props) => {
//   const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
//   let history = useHistory();

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     const {name, email, password} = credentials
//     const response = await fetch("http://localhost:5000/api/auth/createuser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({name, email,password})
//       });
//       const json = await response.json()
//       console.log(json);
//       if(json.success){
//         // Save the auth token and redirect
//         localStorage.setItem('token', json.authtoken);
//         history.push("/");
//         props.showAlert("Account Created Successfully", "success")
//       }
//       else{
//         props.showAlert("Invalid Details", "danger")
//       }
// }

// const onChange = (e)=>{
//   setCredentials({...credentials, [e.target.name]: e.target.value})
// }

//   return (
//     <div className='container'>
//       <h2>Signup To Create an Account</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group my-3">
//           <label htmlFor="name" className="form-label">Full Name</label>
//           <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Your Name"/>
//         </div>
//         <div className="form-group my-3">
//           <label htmlFor="email">Email address</label>
//           <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
//         </div>
//         <div className="form-group my-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required placeholder="Password"/>
//         </div>
//         <div className="form-group my-3">
//           <label htmlFor="cpassword" className="form-label">Confirm Password</label>
//           <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required placeholder="Confirm Password"/>
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Signup;