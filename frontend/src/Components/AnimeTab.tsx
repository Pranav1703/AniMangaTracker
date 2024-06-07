import { InputGroup, Input, InputRightAddon, Button, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import {GetLatestReleaseAnime,GetTrendingAnime} from "../../wailsjs/go/main/App"
import LatestReleaseCard from './cards/LatestReleaseCard'

const AnimeTab = () => {
  
  const [LatestAnime,setLatestAnime] = useState<Array<any>>([]) 
  const [TrendingAnime,setTrendingAnime] = useState<Array<any>>([])

  const [LrBtnClicked,setLrBtnClicked] = useState<boolean>(false)// LR - latest release
  const [TBtnClicked,setTBtnClicked] = useState<boolean>(false) // trending 

  const [searchQuery,setSearchQuery] = useState<string>("")
  
  const LatestRelease = async()=>{
    setLrBtnClicked(true) 
    try {
        const res = await GetLatestReleaseAnime()
        console.log(res)
        // const cardData = res.map((ele:LrManga,index)=>(
        //   {
        //     ...ele,
        //     id: index+1
        //   }
        // ));
        
        setLatestAnime(res)
      } catch (error) {
        console.log("error while fetching manga data",error)
    }
    setTBtnClicked(false)
  }

  const Trending = async()=>{
    setTBtnClicked(true) 
    try {
        const res = await GetTrendingAnime()
        console.log(res)
        // const cardData = res.map((ele:LrManga,index)=>(
        //   {
        //     ...ele,
        //     id: index+1
        //   }
        // ));
        
        setTrendingAnime(res)
      } catch (error) {
        console.log("error while fetching manga data",error)
    }
    setLrBtnClicked(false)
  }

  return (
    <div className='anime'>
        <InputGroup size='md' margin={'6px 0px'}>
            <Input placeholder='search for anime' size='md' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <InputRightAddon color={'gray'}>
              <button>
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
                    onClick={Trending}
                  >
                  Trending
                  </Button>
          </div>
          <div className="list">
            {
              
              LrBtnClicked?(
              
                <>
                  {
                    LatestAnime.length>0?(
                      LatestAnime.map((i,index=0)=>(
                        <LatestReleaseCard key={index++} cardtype='anime' title={i.Name} animeUrl={i.Url} imgSrc={i.ImgSrc} duration={i.Duration}/>
                      ))
                    ):(
                      <div className='loader'>
                        <Spinner size='xl' />
                      </div>
                    )
                  }
                </>
              
              ):TBtnClicked?(
                <></>
              ):(
                null
              )
            }
          </div>

        </div>
    </div>
  )
}

export default AnimeTab