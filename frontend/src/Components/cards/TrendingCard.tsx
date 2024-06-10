import { Button } from '@chakra-ui/react'
import { OpenUrl} from "../../../wailsjs/go/main/App"



type CardProps = {
  title: string
  imgSrc: string
  position: string
  link: string
  cardType: "anime" | "manga"
}

const TrendingCard = ({title,imgSrc,position,link,cardType}:CardProps) => {
  return (
    <div className='T-Card'>
      <img src={imgSrc} width={150} alt="poster" />
      <div id='T-info'>
        <b style={{fontSize:"600"}}>{position}</b>
        <p id='para'>Title: {title}</p>
        <Button colorScheme='teal' variant='outline' onClick={()=>OpenUrl(link)} width={"md"}>
            {
              cardType==="anime"?(
                <p>Watch</p>
              ):(
                <p>Read</p>
              )
            }
        </Button>
      </div>
    </div>
  )
}

export default TrendingCard