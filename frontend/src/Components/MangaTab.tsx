import { Input, InputGroup,InputRightAddon } from '@chakra-ui/react'
import {GetUpdatedManga ,GetTrendingManga} from "../../wailsjs/go/main/App"
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import LatestReleaseCard from './cards/LatestReleaseCard'
import TrendingCard from './cards/TrendingCard'
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
  const [filteredLatestMangaData,setFilteredLatestMangaData] = useState<Array<any>>([])
  const [filteredTrendingMangaData,setFilteredTrendingMangaData] = useState<Array<any>>([])

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

      setTrendingManga(res)
    } catch (error) {
      console.log("error while fetching trending manga data",error)
    }

    setLrBtnClicked(false)
  }

  const searchList = async(e:React.ChangeEvent<HTMLInputElement>)=>{

    setSearchQuery(e.target.value)

    if(LrBtnClicked){

      const filteredLatestData = LatestManga.filter((latest)=>(
        latest.Title.toLowerCase().includes(searchQuery.toLowerCase())
      ))

      setFilteredLatestMangaData(filteredLatestData)

    }else if(TBtnClicked){

      const filteredTrendingData = TrendingManga.filter((trending)=>(
        trending.Title.toLowerCase().includes(searchQuery.toLowerCase())
      ))

      setFilteredTrendingMangaData(filteredTrendingData)
 
    }

    console.log("search query",e.target.value)

  }


  return (
    <div className='manga'>
        <InputGroup size='md' margin={'6px 0px'} justifyContent={'center'}>
            <Input placeholder='search for anime' id='searchAnime' size='md' w={'95%'} value={searchQuery} onChange={(event)=>searchList(event)}/>
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

          {             
            LrBtnClicked===true?(
                  <div className='LR-List'>
                    {
                      (LatestManga.length>0 && searchQuery.length>1)?(
                        filteredLatestMangaData.map((i:LrManga)=>(
                          <LatestReleaseCard key={i.id} cardtype={"manga"} title={i.Title} chapters={i.Chapters_released} mangaUrl={i.Url} imgSrc={i.ImgSrc} />
                        ))
                      ):(LatestManga.length > 0 )?
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
                    </div>
              ):TBtnClicked?(
                  <div className='T-List'>
                    {
                      (TrendingManga.length>0 && searchQuery.length>1)?(
                        filteredTrendingMangaData.map((i)=>(
                          <TrendingCard key={i.Position} title={i.Title} imgSrc={i.ImgSrc} link={i.Url} position={i.Position} cardType={"manga"}/>
                        ))
                      ):(TrendingManga.length>0)?(
                        TrendingManga.map((i)=>(
                          <TrendingCard key={i.Position} title={i.Title} imgSrc={i.ImgSrc} link={i.Url} position={i.Position} cardType={"manga"}/>
                        ))
                      ):(
                        <div className='loader'>
                          <Spinner size='xl' />
                        </div>
                      )
                    }
                  </div>
              ):(
                null
              )
          }

      </div>
    </div>
  )
}

export default MangaTab