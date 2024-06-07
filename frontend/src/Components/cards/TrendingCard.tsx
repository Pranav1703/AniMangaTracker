import { Button } from '@chakra-ui/react'
import { OpenUrl} from "../../../wailsjs/go/main/App"



type CardProps = {
  title: string
  imgSrc: string
  position: string
  link: string
}

const TMangaCard = ({title,imgSrc,position,link}:CardProps) => {
  return (
    <div className='T-Card'>
      <img src={imgSrc} alt="poster" />
      <div id='T-info'>
        <b>{position}</b>
        <p id='para'>Title: {title}</p>
        <Button colorScheme='teal' variant='outline' onClick={()=>OpenUrl(link)}>
            Read
        </Button>
      </div>

    </div>
  )
}

export default TMangaCard