import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return <NavbarClient session={session} />;
};

export default Navbar;
