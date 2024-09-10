import { Box } from "@chakra-ui/layout"
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
><SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
     
    </Box>
  );
};

export default ChatBox;

/*import { Box } from "@chakra-ui/layout";

import { ChatState } from "../Context/ChatProvider";
import React from "react";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <singleChat fetchAgai={fetchAgain} setfetchAgain ={ setFetchAgain}/>
    </Box>
  );
};

export default ChatBox;*/