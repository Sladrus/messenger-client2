import { Box, Stack, Typography } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import StageConversationCard from '../StageConversationCard';
import { AutoSizer, List } from 'react-virtualized';

const StageConversationList = ({ conversations }) => {
  const listRef = useRef(null);

  // Function to save the scroll position
  const saveScrollPosition = () => {
    if (listRef.current) {
      const scrollTop = listRef.current.Grid._scrollingContainer.scrollTop;
      localStorage.setItem('scrollPosition', scrollTop);
      console.log(scrollTop);
    }
  };

  // Function to restore the scroll position
  const restoreScrollPosition = () => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');

    if (savedScrollPosition && listRef.current) {
      listRef.current.scrollToPosition(savedScrollPosition);
      console.log(listRef.current);
    }
  };

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <Box sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
      {conversations?.length > 0 ? (
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef} // Assign the ref to the list
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
              onScroll={saveScrollPosition} // Save scroll position while scrolling
              // onMount={restoreScrollPosition} // Restore scroll position when the component mounts
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
