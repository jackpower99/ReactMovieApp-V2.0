
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {createUserWithEmailAndPassword} from  "firebase/auth";
import {auth} from "../../firebase-config";



const theme = createTheme();


export default function SignInForm() {

const [email, setEmail] = React.useState("");
const [confirmEmail, setConfirmEmail] = React.useState("");
const [password, setPassword] = React.useState("");

const [loginEmail, setLoginEmail] = React.useState("");
const [loginPassword, setLoginPassword] = React.useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     register();
//     //const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console

//     //do something here with form data, if user exists login if doesnt then register by calling functions adn passing in form data.
   
//     // console.log({
//     //   email: data.get('email'),
//     //   password: data.get('password'),
//     // });
//   };

  const register = async () =>{
      if(email === confirmEmail){
      try{
     const user =  await createUserWithEmailAndPassword(
         auth,
         email,
         password
     );
     console.log(user);
      } catch (error){
          console.log(error.message);
      }
    } else{
        console.log("Confirm != email")
    }
};

  const login = async () =>{

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/01/38/00/09/1000_F_138000929_F982axUV63spXL1UycBFXrjQP3Pb4tdA.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {setLoginEmail(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {setLoginPassword(event.target.value)}}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              </Box>
              </Box>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {setEmail(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Confirm Email Address"
                name="confirm email"
                autoComplete="confirm email"
                autoFocus
                onChange={(event) => {setConfirmEmail(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {setPassword(event.target.value)}}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                onClick={register}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            
            </Box>
            </Box>
        </Grid>
        </Grid>
    </ThemeProvider>
  );
}