export default function Card({ children }) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      {children}
    </div>
  ); 
}
