import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';


const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn = async (provider, formData) => {
  const email = formData?.get('email');
  const password = formData?.get('password');

  try {
    const response = await fetch('http://127.0.0.1:7700/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'username': email, 'password': password }),
    });

    console.log(response)

    if (response.ok == false) {
      const error = await response.text();
      alert(`Login failed: ${error.message}`);
      return { type: 'CredentialsSignin', error: error.message || 'Invalid credentials.' };
    }

    const data = await response.json();
    const token = data.token;

    // **Token als Cookie setzen**
    document.cookie = `authToken=${token};`;
    alert(`Login successful! Token stored in cookies.`);
    // navigate("/home"); // Nach erfolgreichem Login weiterleiten
    return { type: 'CredentialsSignin', error: null, token };
  } catch (error) {
    console.error('Login error:', error);
    alert('An unexpected error occurred. Please try again.');
    return { type: 'CredentialsSignin', error: error.message || 'Unexpected error occurred.' };
  }
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={(provider, formData) => signIn(provider, formData)} providers={providers} />
    </AppProvider>
  );
}
