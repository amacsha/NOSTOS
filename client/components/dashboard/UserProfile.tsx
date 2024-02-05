import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getValueFor } from "../../utils/secureStorage";
import { getProfile } from "./DashboardsServices";

export default function UserProfile () {
  const userId = useSelector((state: RootState) => state.user.id);
  const token: string = getValueFor("accessToken") || "";

  const profile = getProfile(userId as number, token).then(response => response)
  console.log(profile);
}