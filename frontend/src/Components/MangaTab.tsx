import { Input, InputGroup,InputRightAddon } from '@chakra-ui/react'
import {GetUpdatedManga} from "../../wailsjs/go/main/App"
import { Button , ButtonGroup} from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'

type LrManga = {
  Title: string,
  Chapters_released: string[],
  Url: string,
  ImgSrc: string,
  id?: number
}

const MangaTab = () => {
  
  const [LatestManga,setLatestManga] = useState<Array<any>>([]) 
  const [LrBtnClicked,setLrBtnClicked] = useState<boolean>(false)// LR - latest release
//   const [btnClicked,setBtnClicked] = useState<boolean>(false)

  const LatestRelease = async()=>{
    setLrBtnClicked(true) 
    try {
        const res = await GetUpdatedManga()
        console.log(res)
        const cardData = res.map((ele:LrManga,index)=>(
          {
            ...ele,
            id: index+1
          }
        ));
        
        setLatestManga(cardData)
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
        <div className='main'>
          {
                LrBtnClicked===false?(
                    <div className='searchBtns'>
                        
                        <ButtonGroup gap={5}>
                    
                            <Button
                              colorScheme='cyan'
                              onClick={LatestRelease}
                            >
                            Latest Release
                            </Button>
                    
                            <Button
                              colorScheme='teal'
                              onClick={()=>setLrBtnClicked(true)}
                            >
                            Trending
                            </Button>
                    
                        </ButtonGroup>

                    </div>
                ):(
                  <>
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
                    <div className='list'>
                        {LatestManga.map((i:LrManga)=>(
                          <Card key={i.id} title={i.Title} chapters={i.Chapters_released} url={i.Url} imgSrc={i.ImgSrc} />
                        ))}
                    </div>
                  </>  
                )
          }
      </div>
    </div>
  )
}

export default MangaTab