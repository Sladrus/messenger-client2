import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import StageConversationCard from '../StageConversationCard';
import { AutoSizer, List } from 'react-virtualized';

const StageConversationList = ({ conversations }) => {
  const rowRenderer = ({ index, key, style }) => {
    const conversation = conversations[index];

    return (
      <div key={key} style={style}>
        <StageConversationCard conversation={conversation} />
      </div>
    );
  };

  return (
    <Box sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
      {conversations?.length > 0 ? (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height} // Subtract the header height (64px)
              rowCount={conversations?.length}
              rowHeight={100}
              rowRenderer={({ key, index, style }) => {
                const conversation = conversations[index];
                return (
                  <div key={key} style={style}>
                    <StageConversationCard conversation={conversation} />
                  </div>
                );
              }}
              width={width}
            />
          )}
        </AutoSizer>
      ) : (
        <Typography
          sx={{
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="body2"
          color="textSecondary"
        >
          Чаты отсутствуют
        </Typography>
      )}
    </Box>
  );
};

export default StageConversationList;
