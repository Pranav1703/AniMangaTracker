import { Input, InputGroup,InputRightAddon } from '@chakra-ui/react'
import {GetUpdatedManga} from "../../wailsjs/go/main/App"
import { Button , ButtonGroup} from '@chakra-ui/react'
import { useState } from 'react'


const MangaTab = () => {
  
  const [LatestManga,setLatestManga] = useState<any>(false) 
  const [LRClicked,setLRClicked] = useState<boolean>(false)// LR - latest release
//   const [btnClicked,setBtnClicked] = useState<boolean>(false)

  const LatestRelease = async()=>{
    setLRClicked(true) 
    try {
        const res = await GetUpdatedManga()
        console.log(res)
        setLatestManga(res)
      } catch (error) {
        console.log("error while fetching manga data",error)
    }
    
  }

  return (
    <div className='manga'>
        <InputGroup size='md' margin={'6px 0px'}>
            <Input placeholder='search for manga' size='md'/>
            <InputRightAddon color={'gray'}>
              search
            </InputRightAddon>
        </InputGroup>
        <div className='info'>
            {
                LRClicked===false?(
                    <div className='search'>
                        
                        <ButtonGroup gap={5}>
                    
                            <Button
                              colorScheme='cyan'
                              onClick={LatestRelease}
                            >
                            Latest Release
                            </Button>
                    
                            <Button
                              colorScheme='teal'
                              onClick={()=>setLRClicked(true)}
                            >
                            Trending
                            </Button>
                    
                        </ButtonGroup>

                    </div>
                ):(
                    <div className='btns'>
                        
                        <Button
                          colorScheme='cyan'
                          onClick={LatestRelease}
                        >
                        Latest Release
                        </Button>
                        
                        <Button
                          colorScheme='teal'
                          onClick={()=>{}}
                          
                        >
                        Trending
                        </Button>

                    </div>
                )
            }
        </div>
    </div>
  )
}

export default MangaTab