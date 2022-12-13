import { Checkbox } from 'flowbite-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import './MailList.scss'

function MailList() {
  const items = []
  for (let i = 0; i < 8; i++) {
    items.push(i)
  }

  const fetchData = () => {
    console.log(1)
  }
  return (
    <div>
      <div className="px-0">
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((item) => {
            return (
              <>
                <div
                  key={item}
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className="mail-item flex cursor-pointer  items-center border-b	border-solid py-2 transition-all"
                >
                  <div className="flex w-20 items-center pl-4">
                    <Checkbox defaultChecked={true} />
                    <AiOutlineStar />
                    <AiFillStar />
                  </div>
                  <div className="mr-4 w-40	shrink-0 truncate">
                    Discord
                    DiscordDiscordDiscordDiscordDiscordDiscordDiscordDiscord
                  </div>
                  <div className="w-40 shrink grow truncate text-grayText">
                    The Overflow #155: Continuous securityThe Overflow #155:
                    Continuous securityThe Overflow #155: Continuous securityThe
                    Overflow #155: Continuous securityThe Overflow #155:
                    Continuous security
                  </div>
                  <div className="ml-8 w-20 shrink-0">8. Dez.</div>
                </div>
              </>
            )
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default MailList
