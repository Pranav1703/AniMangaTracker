import { Input, InputGroup,InputRightAddon } from '@chakra-ui/react'
import {GetUpdatedManga ,GetTrendingManga} from "../../wailsjs/go/main/App"
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import LatestReleaseCard from './cards/LatestReleaseCard'
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
  const [TrendingManga,setTrendingManga] = useState<Array<any>>([])

  const [LrBtnClicked,setLrBtnClicked] = useState<boolean>(false)// LR - latest release
  const [TBtnClicked,setTBtnClicked] = useState<boolean>(false) // trending 

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
        console.log("error while fetching latest release manga data",error)
    }
    setTBtnClicked(false)
  }

  const Trending = async()=>{
    setTBtnClicked(true);
    try {
      const res = await GetTrendingManga();
      console.log(res)
    } catch (error) {
      console.log("error while fetching trending manga data",error)
    }

    setLrBtnClicked(false)
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
                      onClick={ Trending }
                    >
                    Trending
                    </Button>
          </div>
          <div className='list'>
          {             
            LrBtnClicked===true?(
                  <>
                    {
                      LatestManga.length > 0 ?
                      (
                        LatestManga.map((i:LrManga)=>(
                          <LatestReleaseCard key={i.id} cardtype={"manga"} title={i.Title} chapters={i.Chapters_released} mangaUrl={i.Url} imgSrc={i.ImgSrc} />
                        ))
                      ):(
                        <div className='loader'>
                          <Spinner size='xl' />
                        </div>
                      )
                    }
                  </>
              ):TBtnClicked?(
                <div>
                  <p>...</p>
                </div>
              ):(
                null
              )
          }
          </div>
      </div>
    </div>
  )
}

export default MangaTab