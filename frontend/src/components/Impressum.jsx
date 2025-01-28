import { Container, Typography, Link, Paper, Box } from '@mui/material';

const Impressum = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          fontSize: {
            xs: '2rem',  // Small size for iPhone SE and similar devices
            sm: '2.5rem', // Medium size for tablets
            md: '3.5rem', // Large size for desktop screens
          },
        }}
      >
        Impressum
      </Typography>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Company Information
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Company Name:</strong> Your Company Name
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Address:</strong> Street Name 123, 12345 City, Country
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>VAT ID:</strong> DE123456789
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong>{' '}
          <Link href="mailto:support@example.com" color="primary">
            support@example.com
          </Link>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Phone:</strong> +1234567890
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Responsible for content (according to § 55 RStV):
        </Typography>
        <Typography variant="body1">
          John Doe, Company Name, Street Name 123, 12345 City
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Dispute Resolution
        </Typography>
        <Typography variant="body1">
          We are not willing or obliged to participate in dispute resolution
          proceedings before a consumer arbitration board.
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="body1">
          All information on this website has been carefully checked. However,
          we cannot guarantee the accuracy or completeness of the information.
          The content may change without notice.
        </Typography>
      </Paper>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 Your Company Name. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Impressum;
