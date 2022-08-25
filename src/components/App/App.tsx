import { Typography } from '@mui/material';
import { Container } from '@mui/system';

export const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1">
        Nasa API
      </Typography>
    </Container>
  );
};
