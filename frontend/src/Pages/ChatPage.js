import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;

/*import {Box} from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatPage = ({fetchAgain}) => {
  const { user} = ChatState();
  const[fetchAgain,setFetchAgain] = useState(false);
  return(
  <div style={{ width: "100%"}}>
  {user && <SideDrawer/>}
  <Box  display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
  {user && <MyChats fetchAgain={fetchAgain} />}
  {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
 
</Box>
</div>


  );
    
};
export default ChatPage;
*/