// import {useState} from 'react';
import './styles/App.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AnimeTab from './Components/AnimeTab';
import MangaTab from './Components/MangaTab';

function App() {
    // const [resultText, setResultText] = useState("Please enter your name below 👇");
    // const [name, setName] = useState('');
    // const updateName = (e: any) => setName(e.target.value);
    // const updateResultText = (result: string) => setResultText(result);



    return (
        <div id="App">
            <Tabs isFitted variant='enclosed' marginRight={'1px'}>
                <TabList color={'azure'}>
                  <Tab _selected={{ color: 'white', bg: 'brown' }}>Manga</Tab>
                  <Tab _selected={{ color: 'white', bg: 'blue.200' }}>Anime</Tab>
                </TabList>
                <TabPanels >
                  <TabPanel padding={'0px'} margin={'0px'}>
                    <MangaTab/>
                  </TabPanel>
                  <TabPanel padding={'0px'} margin={'0px'}>
                    <AnimeTab/>
                  </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default App
