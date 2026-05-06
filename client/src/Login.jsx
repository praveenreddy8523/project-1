import { useState } from "react";
import { AuthService } from "../src/services/AuthService";
import { useNavigate } from "react-router-dom";
import { TextField,IconButton, Button, Typography, Box, Link, Card, CardContent, CardActions } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthWrapper = ({ children }) => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Card sx={{ width: 350, padding: 3, boxShadow: 3 }}>
      <CardContent>{children}</CardContent>
    </Card>
  </Box>
);

const Login = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Logging in with", email, password);
    const validCreds = await AuthService.userLogin(email, password);
    if (validCreds.success) {
      navigate("/dashboard");
    } else {
      alert("Entered Wrong creds");
    }
  };

  return (
    <AuthWrapper>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="User Id"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Sign In
        </Button>
      </CardActions>
      {/* <Typography variant="body2" align="center">
        Don't have an account?{" "}
        <Link component="button" onClick={onSwitch} sx={{ color: "blue" }}>
          Sign Up
        </Link>
      </Typography> */}
    </AuthWrapper>
  );
};

const Signup = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signing up with", { name, mobile, email, occupation, password });
  };

  return (
    <AuthWrapper>
      <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
      <TextField label="Full Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Mobile Number" variant="outlined" fullWidth margin="normal" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <TextField label="Email Address" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Occupation" variant="outlined" fullWidth margin="normal" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSignup}>Sign Up</Button>
      </CardActions>
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Link component="button" onClick={onSwitch} sx={{ color: "blue" }}>
          Sign In
        </Link>
      </Typography>
    </AuthWrapper>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Logging in with", email, password);
    const validCreds = await AuthService.adminLogin(email, password);
    if (validCreds.success) {
      navigate("/dashboard");
    } else {
      alert("Entered Wrong creds");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const status = await AuthService.forgotPassword(email);
      alert(status ? "Password Sent to Mail" : "Error in sending Mail");
    } catch (error) {
      console.log(error);
    }
    setForgotPassword(false);
  };

  return (
    <AuthWrapper>
      <Typography variant="h5" align="center" gutterBottom>
        Admin Login
      </Typography>
      <TextField
        label="Email Id"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isForgotPassword ? (
        <>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Sign In
            </Button>
            <Button variant="text" onClick={() => setForgotPassword(true)}>
              Forgot Password
            </Button>
          </CardActions>
        </>
      ) : (
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleForgotPassword}
          >
            Get Password Mail
          </Button>
        </CardActions>
      )}
    </AuthWrapper>
  );
};

const AuthPage = ({ isAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return isAdmin ? (
    <AdminLogin />
  ) : isLogin ? (
    <Login onSwitch={() => setIsLogin(false)} />
  ) : (
    <Signup onSwitch={() => setIsLogin(true)} />
  );
};

export default AuthPage;
