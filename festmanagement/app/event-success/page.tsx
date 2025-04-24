export default function EventSuccessPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white shadow-lg p-8 rounded-xl max-w-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Event Created!</h1>
          <p className="text-gray-700 mb-6">Your event has been successfully added to the platform.</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  