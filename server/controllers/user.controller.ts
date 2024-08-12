import { fetchUserInfo } from "../helpers/fetchUserInfo"

export async function getUserController(req, res) {
  const { userId } = req.params
  const userInfo = await fetchUserInfo(userId)
  res.json(userInfo)
}
