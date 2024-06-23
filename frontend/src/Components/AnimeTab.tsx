import { InputGroup, Input, InputRightAddon, Button, Spinner, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import {GetLatestReleaseAnime,GetTrendingAnime} from "../../wailsjs/go/main/App"
import LatestReleaseCard from './cards/LatestReleaseCard'
import TrendingCard from './cards/TrendingCard'

const AnimeTab = () => {
  
  const [LatestAnime,setLatestAnime] = useState<Array<any>>([]) 
  const [TrendingAnime,setTrendingAnime] = useState<Array<any>>([])
  const [filteredLatestAnimeData,setFilteredLatestAnimeData] = useState<Array<any>>([])
  const [filteredTrendingAnimeData,setFilteredTrendingAnimeData] = useState<Array<any>>([])

  const [LrBtnClicked,setLrBtnClicked] = useState<boolean>(false)// LR - latest release
  const [TBtnClicked,setTBtnClicked] = useState<boolean>(false) // trending 

  const [searchQuery,setSearchQuery] = useState<string>("")
  
  const LatestRelease = async()=>{
    setLrBtnClicked(true)
    setTBtnClicked(false)
    try {
        const res = await GetLatestReleaseAnime()
        console.log("latest data",res)
        
        setLatestAnime(res)
      } catch (error) {
        console.log("error while fetching manga data",error)
    }
    
  } 

  const Trending = async()=>{
    setTBtnClicked(true)
    setLrBtnClicked(false)
    try {
        const res = await GetTrendingAnime()
        console.log(res)
        
        setTrendingAnime(res)
      } catch (error) {
        console.log("error while fetching manga data",error)
    }
 
  }

  const searchList = async(e:React.ChangeEvent<HTMLInputElement>)=>{

    setSearchQuery(e.target.value)

    if(LrBtnClicked){

      const filteredLatestData = LatestAnime.filter((latest)=>(
        latest.Name.toLowerCase().includes(searchQuery.toLowerCase())
      ))

       setFilteredLatestAnimeData(filteredLatestData)

    }else if(TBtnClicked){

      const filteredTrendingData = TrendingAnime.filter((trending)=>(
        trending.Name.toLowerCase().includes(searchQuery.toLowerCase())
      ))

      setFilteredTrendingAnimeData(filteredTrendingData)

    }

    // console.log("search query",e.target.value)
    // console.log("length of state of filtered latest anime array",filteredLatestAnimeData.length)
    console.log("length of searchquery",searchQuery.length)

  }


  return (
    <div className='anime'>
        <InputGroup size='md' margin={'6px 0px'} justifyContent={'center'}>
            <Input placeholder='search for anime' id='searchAnime' size='md' w={'95%'} value={searchQuery} onChange={(event)=>searchList(event)}/>
        </InputGroup>
        
          <div className='searchBtns'>     
                  <Button
                    colorScheme='cyan'
                    onClick={LatestRelease}
                  >
                  Latest Release
                  </Button>
          
                  <Button
                    colorScheme='teal'
                    onClick={Trending}
                  >
                  Trending
                  </Button>
          </div>

            {
              LrBtnClicked?(
                <>
                  <div className='LR-List'>
                    {
                      (LatestAnime.length>0 && searchQuery.length>1)?(
                        filteredLatestAnimeData.map((i,index=0)=>(
                          <LatestReleaseCard key={index++} cardtype='anime' title={i.Name} animeUrl={i.Url} imgSrc={i.ImgSrc} duration={i.Duration}/>
                        ))
                      ):(LatestAnime.length>0)?(
                        LatestAnime.map((i,index=0)=>(
                          <LatestReleaseCard key={index++} cardtype='anime' title={i.Name} animeUrl={i.Url} imgSrc={i.ImgSrc} duration={i.Duration}/>
                        ))
                      ):(
                        <div className='loader'>
                          <Spinner size='xl' />
                        </div>
                      )
                    }
                  </div>
                </> 
              ):TBtnClicked?(
                <div className='T-List'>
                {
                  (TrendingAnime.length>0 && searchQuery.length>1)?(
                    filteredTrendingAnimeData.map((i)=>(
                      <TrendingCard key={i.Place} title={i.Name} imgSrc={i.ImgSrc} link={i.Url} position={i.Place} cardType={"anime"}/>
                    ))
                  ):(TrendingAnime.length>0)?(
                    TrendingAnime.map((i)=>(
                      <TrendingCard key={i.Place} title={i.Name} imgSrc={i.ImgSrc} link={i.Url} position={i.Place} cardType={"anime"}/>
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
  )
}

export default AnimeTab