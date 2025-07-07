export default function Loading({text}: {text: string}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-3xl text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-6"></div>
        <p className="text-gray-700 font-semibold text-lg">{text}</p>
      </div>
    </div>
  );
}