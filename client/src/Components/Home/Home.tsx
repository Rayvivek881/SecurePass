import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper } from '@mui/material';
import HomePasswordsTable from './HomePasswordsTable';
import SharedPasswordTable from './SharedPasswordTable';

import { GlobalContext } from '../Context/GlobalStorage';


export default function Home() {
  const { currentTab, setCurrentTab } = useContext(GlobalContext);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    if (setCurrentTab != undefined) {
      setCurrentTab(newValue);
    }
  };
  const HomeStyles = {
    width: '100wv',
    height: '100vh',
    overflow: 'scroll',
  }
  return (
    <Paper sx={HomeStyles}>
      <Tabs value={currentTab} onChange={handleChangeTabs}>
        <Tab label="Passwords" value="passwords" />
        <Tab label="Shared Password" value="shared_passwords" />
      </Tabs>
      { currentTab === "passwords" ? <HomePasswordsTable /> : <SharedPasswordTable />}
    </Paper>
  );
}