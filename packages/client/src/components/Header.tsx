import { useMe } from "@/hooks/useMe";
import { Avatar } from "./Avatar";
import { Form } from "./Form";

export function Header() {
  const { avatar, username, setUserId, getSavedUserId } = useMe();

  if (!username) return null;

  // console.log("username", username);

  const handleChangeUser = () => {
    if (getSavedUserId() === "1") {
      setUserId("10");
    } else {
      setUserId("1");
    }

    window.location.reload();
  };

  return (
    <header className="bg-black">
      <button
        className="bg-black px-4 py-2 text-white"
        onClick={handleChangeUser}
      >
        Cambiar User
      </button>

      <div className="flex items-center justify-between px-8 py-2">
        <Form />

        <div>
          <Avatar name={username} src={avatar} />
          <h3>{username}</h3>
        </div>
      </div>
    </header>
  );
}
