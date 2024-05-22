import { Avatar, Badge, Box, Card, Chip, Typography } from "@mui/material";
import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import LinkIcon from "@mui/icons-material/Link";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../context/store";

const types = [
  { name: "Перевод физ лицу ", value: "physical" },
  { name: "Перевод юр лицу ", value: "company" },
  { name: "Прием из-за рубежа ", value: "from_abroad" },
  { name: "Выдача наличных ", value: "cash" },
  { name: "Обмен криптовалюты ", value: "exchange" },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    // top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const StageOrderCard = observer(({ order }) => {
  const { conversationStore } = useContext(StoreContext);

  return (
    <Card
      // onClick={() => handleSelectConversation(conversation.chat_id)}
      sx={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "space-between",
        m: "5px 10px",
        p: "10px",
        height: "100px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                // width: "100%",
              }}
              variant="subtitle2"
              fontWeight="bold"
            >
              {order?.title}
            </Typography>
            <StyledBadge
              sx={{ marginRight: "10px" }}
              badgeContent={
                conversationStore?.conversations?.find(
                  (item) => item?.chat_id === order?.conversation?.chat_id
                )?.unreadCount
              }
              max={99}
              color="primary"
            >
              <Typography
                sx={{
                  height: "100%",
                  // width: "80px",
                  textAlign: "right",
                  whiteSpace: "nowrap",
                  // ml: "auto", // Aligns the time to the right
                }}
                color={"textSecondary"}
                variant="body2"
              >
                {types?.find((item) => item.value === order?.type)?.name}
              </Typography>
            </StyledBadge>
          </Box>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              // width: "100%",
            }}
            variant="body2"
            color="textSecondary"
          >
            Отдают: {order.from}
          </Typography>{" "}
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              // width: "100%",
            }}
            variant="body2"
            color="textSecondary"
          >
            Получают: {order.to}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                // width: "100%",
              }}
              variant="body2"
              color="textSecondary"
            >
              Объем: {order.amount}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <LinkIcon sx={{ fontSize: "18px" }} />
            <Typography
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textAlign: "right",
                pl: "5px",
              }}
              variant="body2"
              color="textSecondary"
            >
              {order?.responsible?.username}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <>
              <Box sx={{ width: "100%", display: "flex" }}>
                {order?.tags?.map((tag) => {
                  return (
                    <Chip
                      sx={{ ml: "5px", fontSize: "11px" }}
                      key={tag?._id}
                      label={tag?.value}
                      size="small"
                      variant="outlined"
                    />
                  );
                })}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <LinkIcon sx={{ fontSize: "18px" }} />
                <Typography
                  sx={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textAlign: "right",
                    pl: "5px",
                  }}
                  variant="body2"
                  color="textSecondary"
                >
                  {order?.user?.username}
                </Typography>
              </Box>
            </>
          </Box>
        </Box> */}
    </Card>
  );
});

export default StageOrderCard;
