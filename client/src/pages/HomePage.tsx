import { useFetch } from "../hooks/useFetch"
import { getUserInfo } from "../services/getUserInfo"

interface UserInfo {
  img: string
  name: string
  id: number
}

export default function HomePage() {
  const { data } = useFetch<UserInfo>({ service: () => getUserInfo({ id: 1 }) })

  console.log("userInfo: ", data)

  return (
    <div>
      <p>Welcome {data?.name}</p>
      <h2>HOME PAGE</h2>
      <span className="bg-red-600">TODO: Tus Gifs Favoritos</span>
    </div>
  )
}
