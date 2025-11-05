export default function Parking() {
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Parking</h1>
      <img
        src="/parking.jpg"
        alt="Parking Map"
        className="w-full max-w-md rounded-xl shadow-2xl"
      />
    </div>
  );
}