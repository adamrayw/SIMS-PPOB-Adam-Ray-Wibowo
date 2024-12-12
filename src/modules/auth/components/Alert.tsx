import { X } from "lucide-react";

interface AlertProps {
  message: string;
  onAlertTriggered: () => void;
}

const Alert = ({ message, onAlertTriggered }: AlertProps) => {
  const closeAlert = () => {
    onAlertTriggered();
  };

  return (
    <div className="error-alert py-4 bottom-0 w-full">
      <div className="bg-red-100 rounded px-2 py-1 flex justify-between">
        <p className="text-red-400 text-xs">{message}</p>
        <X
          onClick={closeAlert}
          className="w-4 h-4 text-red-500 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Alert;
