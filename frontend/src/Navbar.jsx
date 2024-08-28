import { Sun, ShoppingBag, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "./Context";

const Navbar = () => {
  const name = useTheme();
  return (
    <div className="flex max-w-[900px] m-auto p-7 justify-between">
      <div className="flex gap-3 items-center">
        <Link to="/" className="text-2xl font-medium">
          Product Store
        </Link>
        <ShoppingBag />
      </div>
      <nav className="flex gap-3">
        <Link
          to="/create"
          className="bg-slate-300 p-2 cursor-pointer hover:bg-slate-400 transition-all rounded"
        >
          <Plus />
        </Link>
        <div className="bg-slate-300 p-2 cursor-pointer hover:bg-slate-400 transition-all rounded">
          <Sun />
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
