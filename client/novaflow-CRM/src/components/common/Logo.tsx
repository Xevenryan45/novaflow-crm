import { LuBoxes } from "react-icons/lu";
import { company } from "../../constants/company";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <LuBoxes
        size={30}
        className="text-blue-600"
      />

      <span className="text-xl font-bold">
        {company.name}
      </span>
    </div>
  );
}