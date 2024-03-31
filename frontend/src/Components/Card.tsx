import { OpenUrl} from "../../wailsjs/go/main/App"
import { Button } from "@chakra-ui/react"

type Card = {
  title: string,
  chapters: string[],
  url: string,
  imgSrc: string
}

const Card = ({title,chapters,url,imgSrc}:Card) => {

  const stringFormat = (ele: string, index: number, array: string[]):string =>{
    if(index === array.length -1){
      return `${ele}`
    }else{
      return `${ele}, `
    }
  }

  return (
    <div className="card">
      <img src={imgSrc}  alt="test" />
      <div id="info">
        <p id="para" className="title">Title: {title}</p>
        <p id="para" className="chapters">Chapters released: <br/>
                              {
                                chapters.length===1?(
                                  chapters[0]
                                ):(
                                  chapters.map((ele,i,array)=>stringFormat(ele,i,array))
                                )
                              }
        </p>
        {/* <button id="mangaCardBtn" onClick={()=>OpenUrl(url)}>Read Manga</button> */}
        <Button colorScheme='teal' variant='outline' onClick={()=>OpenUrl(url)}>
          Read
        </Button>
      </div>
    </div>
  )
}

export default Card