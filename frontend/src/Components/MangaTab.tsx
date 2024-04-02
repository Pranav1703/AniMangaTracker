import "../styles/mangatab/manga.css"
import { Input, InputGroup,InputRightAddon } from '@chakra-ui/react'
import {GetUpdatedManga} from "../../wailsjs/go/main/App"
import { Button , ButtonGroup} from '@chakra-ui/react'
import { useState } from 'react'
import Card from './Card'
import { Spinner } from '@chakra-ui/react'


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
  const [searchQuery,setSearchQuery] = useState<string>("")

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

  const searchList = ()=>{
    console.log(searchQuery)

    setSearchQuery("")
  }



  return (
    <div className='manga'>
        <InputGroup size='md' margin={'6px 0px'}>
            <Input placeholder='search for manga' size='md' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <InputRightAddon color={'gray'}>
              <button onClick={searchList}>
                search
              </button>
            </InputRightAddon>
        </InputGroup>
        <div className='main'>
          <div className='searchBtns'>
                    
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

          {             
                LrBtnClicked===true?(
                    <div className='list'>
                        {
                          LatestManga.length > 0 ?
                          (
                            LatestManga.map((i:LrManga)=>(
                              <Card key={i.id} title={i.Title} chapters={i.Chapters_released} url={i.Url} imgSrc={i.ImgSrc} />
                            ))
                          ):(
                            <div className='loader'>
                              <Spinner size='xl' />
                            </div>
                          )
                        }
                    </div>
                  ):(
                    <div className='select'>
                      <p>...</p>
                    </div>
                  )

          }
      </div>
    </div>
  )
}

export default MangaTab