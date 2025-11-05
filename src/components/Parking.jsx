export default function Parking() {
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Parking</h1>
      <img
        src="/parking.jpg"
        alt="Parking Map"
        className="w-full max-w-md rounded-xl shadow-2xl"
      />
      <p className="mt-4 text-center opacity-80">
        Upload your image to <code className="bg-white/20 px-2 rounded">public/parking.jpg</code>
      </p>
    </div>
  );
}