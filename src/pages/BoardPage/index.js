import React, { useContext } from 'react';
import './BoardPage.css';
import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../context/store';
import StageList from '../../components/Stage/StageList';
import { styled } from '@mui/material/styles';
import EmptyStageList from '../../components/Stage/EmptyStageList';
import CreateStageModal from '../../components/Stage/CreateStageModal';
import EditStageModal from '../../components/Stage/EditStageModal';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(0),
  height: 'calc(100% - 66px)',
  textAlign: 'left',
}));

const BoardPage = observer(() => {
  const { stageStore, conversationStore } = useContext(StoreContext);
  const filteredStages =
    conversationStore.filter.type === 'all'
      ? stageStore.stages
      : stageStore.stages.filter(
          (stage) =>
            stage.type === 'all' || stage.type === conversationStore.filter.type
        );

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const [selectedStage, setSelectedStage] = React.useState('');

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenEdit = (stage) => {
    setSelectedStage(stage);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
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
          {filteredStages?.map((stage) => {
            return (
              <StageList
                key={stage._id}
                stage={stage}
                conversations={stageStore?.fullStages[stage.value]}
                handleOpenEdit={handleOpenEdit}
              />
            );
          })}
          <EmptyStageList handleOpen={handleOpenCreate} />
        </Grid>
      </Box>
      <CreateStageModal show={openCreate} handleClose={handleCloseCreate} />
      <EditStageModal
        show={openEdit}
        handleClose={handleCloseEdit}
        selectedStage={selectedStage}
      />
    </Item>
  );
});

export default BoardPage;
