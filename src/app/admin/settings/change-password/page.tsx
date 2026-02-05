import { auth } from '@/lib/auth';
import ChangePasswordForm from './ChangePasswordForm';

export default async function ChangePasswordPage() {
  const session = await auth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
        <p className="text-gray-600 mt-1">
          Update your password to keep your account secure
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Security Reminder:</strong> Use a strong password with at least 8
          characters, including uppercase, lowercase, numbers, and symbols.
        </p>
      </div>

      <ChangePasswordForm adminId={session?.admin?.id || ''} />
    </div>
  );
}
