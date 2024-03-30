import { Button , ButtonGroup} from '@chakra-ui/react'


type propType = {
    LatestReleaseFunc: React.MouseEventHandler<HTMLButtonElement>
}

const Search = ({LatestReleaseFunc}:propType) => {
  return (
    <div className='search'>
        <ButtonGroup gap={5}>

            <Button
              colorScheme='grey'
              onClick={LatestReleaseFunc}
            >
            Latest Release
            </Button>

            <Button
              colorScheme='grey'
              onClick={()=>{}}
            >
            trending
            </Button>


        </ButtonGroup>

    </div>
  )
}

export default Search