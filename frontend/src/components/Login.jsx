import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Importiere useNavigate

const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn = async (provider, formData, navigate) => {
  const email = formData?.get('email');
  const password = formData?.get('password');

  try {
    const response = await fetch('http://localhost:7700/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'username':email, 'password':password }),
    });
    console.log(response)

    if (!response.ok) {
      const error = await response.json();
      alert(`Login failed: ${error.message}`);
      return {
        type: 'CredentialsSignin',
        error: error.message || 'Invalid credentials.',
      };
    }

    const data = await response.json();
    const token = data.token;
    console.log(token)
    localStorage.setItem('authToken', token);
    alert(`Login successful! Token: ${token}`);
    return {
      type: 'CredentialsSignin',
      error: null, // No error indicates success.
      token, // Include token in the response.
    };
  } catch (error) {
    console.error('Login error:', error);
    alert('An unexpected error occurred. Please try again.');
    navigate("/home");
    return {
      type: 'CredentialsSignin',
      error: error.message || 'Unexpected error occurred.',
    };
  }
};
export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate(); // Verwende useNavigate
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData, navigate)} // Übergebe navigate an die SignIn-Funktion
        providers={providers}
      />
    </AppProvider>
    // preview-end
  );
}
