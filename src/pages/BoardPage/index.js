import React, { useContext } from 'react';
import './BoardPage.css';
import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../context/store';
import StageList from '../../components/Stage/StageList';
import { styled } from '@mui/material/styles';
import EmptyStageList from '../../components/Stage/EmptyStageList';
import CreateStageModal from '../../components/Stage/CreateStageModal';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(0),
  height: 'calc(100vh - 82px)',
  textAlign: 'left',
}));

const BoardPage = observer(() => {
  const { stageStore } = useContext(StoreContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Item>
      <Box
        sx={{
          width: { marginLeft: `65px`, marginTop: `65px`, height: '100%' },
        }}
      >
        <Grid
          container
          component="main"
          sx={{
            position: 'relative',
            flexWrap: 'nowrap',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {stageStore.stages?.map((stage) => {
            return (
              <StageList
                key={stage._id}
                stage={stage}
                conversations={stageStore?.fullStages[stage.value]}
              />
            );
          })}
          <EmptyStageList handleOpen={handleOpen} />
        </Grid>
      </Box>
      <CreateStageModal show={open} handleClose={handleClose} />
    </Item>
  );
});

export default BoardPage;