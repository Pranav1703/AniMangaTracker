import { OpenUrl} from "../../../wailsjs/go/main/App"
import { Button } from "@chakra-ui/react"

type CardProps = {
  cardtype: "manga" | "anime"
  title: string
  chapters?: string[]
  mangaUrl?: string,
  animeUrl?: string
  imgSrc: string
  duration?: string
}

const LatestReleaseCard = ({cardtype,title,chapters,mangaUrl,animeUrl,imgSrc,duration}:CardProps) => {

  const stringFormat = (ele: string, index: number, array: string[]):string =>{
    if(index === array.length -1){
      return `${ele}`
    }else{
      return `${ele}, `
    }
  }

  let chapterUrl:string

  if(cardtype==="manga"){
    const chapNo = chapters![0].split(" ")[1]
    const trimmedName = title.split(" ").join('_');
    chapterUrl = `https://ww1.mangafreak.me/Read1_${trimmedName}_${chapNo}`
  }

  return (
    <div className="LR-card">

      {
        cardtype==="manga"?(
          <>
          <img src={imgSrc} width={150} alt="poster" />
          <div id="LR-info">
            <p id="para" className="title">Title: {title}</p>
            <p id="para" className="chapters">Chapters released: <br/>
                    {
                      chapters!.length===1?(
                        chapters![0]
                      ):(
                        chapters!.map((ele,i,array)=>stringFormat(ele,i,array))
                      )
                    }
            </p>
            <Button colorScheme='teal' variant='outline' onClick={()=>OpenUrl(chapterUrl)}>
              Read
            </Button>
          </div>
        </>
        ):cardtype==="anime"?(
          <>
          <img src={imgSrc} width={150} alt="poster" />
          <div id="LR-info">
            <p id="para" className="title">Title: {title}</p>
            <p id="para">Duration: {duration}</p>
          
            <Button colorScheme='teal' variant='outline' onClick={()=>OpenUrl(animeUrl!)}>
              Watch
            </Button>
          </div>
        </>
        ):(
          null
        )
      }
    </div>
  )
}

export default LatestReleaseCard