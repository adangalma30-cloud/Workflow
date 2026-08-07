import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          This page is not part of the Compass guide.
        </p>
      </div>
    </div>
  );
}
