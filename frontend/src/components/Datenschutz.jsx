import { Container, Typography, Paper, Box, Link } from '@mui/material';

function Datenschutz() {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          fontSize: {
            xs: '2rem',  // Noch kleinere Schriftgröße für sehr kleine Bildschirme wie iPhone SE
            sm: '2.5rem',    // Für größere Bildschirme (z. B. Tablets)
            md: '3.5rem',    // Für größere Bildschirme (z. B. Desktop)
          },
        }}
      >
        Datenschutzerklärung
      </Typography>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          1. Allgemeine Hinweise
        </Typography>
        <Typography variant="body1" paragraph>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
          Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </Typography>
        <Typography variant="body1" paragraph>
          Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener
          Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise
          Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit
          möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
          Zustimmung nicht an Dritte weitergegeben.
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          2. Erhebung und Verarbeitung von Daten
        </Typography>
        <Typography variant="body1" paragraph>
          Wenn Sie unsere Webseite besuchen, werden automatisch Informationen über den
          Besuch erhoben, die nicht direkt einer bestimmten Person zugeordnet werden können
          (z. B. die IP-Adresse, die Art des Browsers, das verwendete Betriebssystem und
          die Uhrzeit des Zugriffs).
        </Typography>
        <Typography variant="body1" paragraph>
          Diese Daten werden nur zur Sicherstellung des Betriebs der Webseite und zur
          Analyse der Nutzung erhoben. Sie können diese Daten nicht einer bestimmten Person
          zuordnen.
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          3. Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Unsere Webseite verwendet Cookies. Dabei handelt es sich um kleine Textdateien,
          die auf Ihrem Endgerät gespeichert werden. Sie können die Speicherung von Cookies
          in den Einstellungen Ihres Browsers verhindern, jedoch kann dies die Funktionalität
          der Webseite einschränken.
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          4. Nutzung von Kontaktformularen und E-Mail
        </Typography>
        <Typography variant="body1" paragraph>
          Wenn Sie über das Kontaktformular oder per E-Mail mit uns in Verbindung treten,
          werden die von Ihnen angegebenen Daten ausschließlich zur Bearbeitung Ihrer Anfrage
          verwendet und nicht an Dritte weitergegeben.
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px', marginBottom: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          5. Ihre Rechte
        </Typography>
        <Typography variant="body1" paragraph>
          Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten
          personenbezogenen Daten zu erhalten. Darüber hinaus haben Sie das Recht auf
          Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen
          Daten.
        </Typography>
        <Typography variant="body1" paragraph>
          Falls Sie Fragen zum Datenschutz haben oder Ihre Rechte ausüben möchten, können
          Sie sich jederzeit an uns wenden:
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong> <Link href="mailto:support@example.com" color="primary">support@example.com</Link>
        </Typography>
      </Paper>

      <Paper sx={{ padding: '20px' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          6. Änderungen dieser Datenschutzerklärung
        </Typography>
        <Typography variant="body1" paragraph>
          Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an
          geänderte gesetzliche Vorschriften oder Änderungen der Dienstleistungen anzupassen.
        </Typography>
        <Typography variant="body1" paragraph>
          Diese Datenschutzerklärung wurde zuletzt am <strong>28. Januar 2025</strong> geändert.
        </Typography>
      </Paper>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 Your Company Name. Alle Rechte vorbehalten.
        </Typography>
      </Box>
    </Container>
  );
};

export default Datenschutz;
