import React from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const MaterialUI = (props) => {
  return(
    <Container maxWidth="md">
      <h1>Container</h1>
      <Box>
        <h2>Box</h2>
        <Box>
          <h3>Buttons</h3>
          <Button variant="contained">Default</Button>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Link
          </Button>
        </Box>
        <Box>
          Disabled height
          <Button variant="contained" color="primary" disableElevation>
            Disable elevation
          </Button>
        </Box>
        <Box>
          Text buttons
          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button disabled>Disabled</Button>
          <Button href="#text-buttons" color="primary">
            Link
          </Button>
        </Box>
        <Box>
          Outlined
          <Button variant="outlined">Default</Button>
          <Button variant="outlined" color="primary">
            Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="primary" href="#outlined-buttons">
            Link
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MaterialUI;
