import React, { useContext } from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';

const EmptyStageList = observer(({ handleOpen }) => {
  return (
    <Grid
      sx={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid #ccc',
        borderTop: '1px solid #ccc',
      }}
      xs={12}
      sm={5}
      md={4}
      lg={3}
      item
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{ p: '25px', cursor: 'pointer', background: '' }}
          onClick={handleOpen}
        >
          <Typography variant="body2" color="textSecondary">
            <AddIcon sx={{ fontSize: '60px' }} color="textSecondary" />{' '}
          </Typography>
        </Card>
        <Typography
          sx={{
            textAlign: 'center',
            p: '10px',
          }}
          variant="body2"
          color="textSecondary"
        >
          Нажмите, чтобы создать новый статус
        </Typography>
      </Box>
    </Grid>
  );
});

export default EmptyStageList;
