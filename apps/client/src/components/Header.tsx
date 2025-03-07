import { useAuth } from "@/hooks/useAuth";
import { useMe } from "@/hooks/useMe";
import { Link, useLocation } from "wouter";
import { Avatar } from "./Avatar";
import { HomeLink } from "./HomeLink";
import { SearchBar } from "./SearchBar";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const burgerMenu = (
  <div className="flex w-8 flex-col gap-2 transition-transform hover:scale-105">
    <div className="ml-auto h-1 w-3/4 bg-white" />
    <div className="h-1 w-full bg-white" />
    <div className="h-1 w-3/4 bg-white" />
  </div>
);
export function Header({ ...props }: HeaderProps) {
  const [location] = useLocation();
  const { avatar, getUserName } = useMe();
  const { logout, isAuthenticated } = useAuth();
  const username = getUserName();

  const isUploadPage = location === "/upload";

  function handleBurgerClick(
    evt: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {}

  return (
    <header {...props}>
      {/* ---------- MOBILE ---------- */}

      <div className="block grid h-24 place-items-center bg-black md:hidden">
        <div className="flex w-full items-center justify-between gap-4 p-4">
          <SearchBar className="flex-1" />

          <button type="button" onClick={handleBurgerClick}>
            {burgerMenu}
          </button>
        </div>
      </div>

      {/* MODAL */}
      {/* <div className="absolute inset-0 z-50 bg-purple-500">asdfsafas</div> */}

      {/* ---------- DESKTOP ---------- */}

      <div className="hidden h-[120px] bg-black md:block">
        <div className="flex items-center justify-between px-8 py-2 ">
          <div className="flex w-1/2 flex-col items-center gap-4 sm:flex-row">
            <HomeLink />
            <SearchBar />
          </div>

          <div className="flex items-center gap-4 sm:flex-row">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {!isUploadPage && (
                <Link
                  to="/upload"
                  className="rounded-full bg-purple-500 px-4 py-2 transition-colors hover:bg-purple-700 sm:order-2"
                >
                  Upload
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700 sm:order-1"
                  type="button"
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="rounded-full bg-[#9b64f5] px-4 py-2 transition-colors hover:bg-purple-700 sm:order-1"
                  type="button"
                  to="/login"
                >
                  Sign In
                </Link>
              )}
            </div>
            <div className="sm:order-3">
              <Avatar name={username} src={avatar} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
