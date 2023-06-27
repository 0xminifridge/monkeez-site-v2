import { useLinkClickHandler, useLocation } from "react-router-dom";
import { Navbar } from "flowbite-react";

export default function NavLink({ to, name }) {
  const location = useLocation();
  const clickHandler = useLinkClickHandler(to);

  return (
    <span onClick={clickHandler}>
      <Navbar.Link
        href={to}
        class="text-black hover:text-white font-bold text-xl"
      >
        {name}
      </Navbar.Link>
    </span>
  );
}
