import CustomPadlock from "../../assets/CustomPadLock";

interface OddsCellProps {
  value: string | number | boolean;
}

const OddsCell = ({ value }: OddsCellProps) => (
  <span className="text-center text-blue-700 text-sm">
    {typeof value === "boolean" ? (
      <CustomPadlock className=" w-4 h-4 text-gray-600 inline-block align-middle" />
    ) : (
      value
    )}
  </span>
);

export default OddsCell;
