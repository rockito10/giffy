import Avatar from "../components/Avatar"
import { useFetch } from "../hooks/useFetch"
import { getUserInfo } from "../services/getUserInfo"

interface UserInfo {
  img: string
  name: string
  id: number
}

export default function HomePage() {
  const { data: userInfo } = useFetch<UserInfo>({ service: () => getUserInfo({ id: 1 }) })

  console.log("userInfo: ", userInfo)

  return (
    <div>
      <p>Welcome {userInfo?.name}</p>
      <div className="absolute right-12 top-12">
        {userInfo && <Avatar name={userInfo.name} src={userInfo.img} />}
      </div>
      <span className="bg-red-600">TODO: Tus Gifs Favoritos</span>
    </div>
  )
}
