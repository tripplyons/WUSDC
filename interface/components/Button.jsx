export default function Button({ children, onClick, error, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        disabled
        ? "w-full items-center py-2 px-3 text-sm font-medium text-center text-white bg-gray-500 rounded-lg"
        : (
          error
          ? "w-full items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600"
          : "w-full items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        )
      }
    >
      { children }
    </button>
  );
}