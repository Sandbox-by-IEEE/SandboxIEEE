'use client';

import { AlertCircle, CheckCircle, Copy, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CreatedAdmin {
  id: string;
  username: string;
  email: string;
  adminRole: string;
  tempPassword: string;
}

export default function CreateAdminForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminRole, setAdminRole] = useState<'moderator' | 'finance'>('moderator');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState<CreatedAdmin | null>(null);

  const generatePassword = () => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          adminRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error - API returns either 'error' or 'message' field
        const errorMessage = data.error || data.message || 'Failed to create admin account';
        console.error('API Error:', data);
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Show success with credentials
      setCreatedAdmin({
        ...data.admin,
        tempPassword: password,
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Success screen
  if (createdAdmin) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Admin Account Created!
          </h2>
          <p className="text-gray-600 mt-2">
            Share these credentials securely with the new admin
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm">
                {createdAdmin.username}
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard(createdAdmin.username)}
                className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Copy username"
              >
                <Copy size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm">
                {createdAdmin.email}
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard(createdAdmin.email)}
                className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Copy email"
              >
                <Copy size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temporary Password
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm">
                {createdAdmin.tempPassword}
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard(createdAdmin.tempPassword)}
                className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Copy password"
              >
                <Copy size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium text-sm capitalize">
              {createdAdmin.adminRole}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Important:</strong> The password is shown only once. Make
            sure to save it securely before leaving this page. The new admin should
            change their password on first login.
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/staff')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Staff List
          </button>
          <button
            type="button"
            onClick={() => {
              setCreatedAdmin(null);
              setUsername('');
              setEmail('');
              setPassword('');
              setAdminRole('moderator');
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Create Another Admin
          </button>
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter username (3-50 characters, alphanumeric)"
            required
            disabled={isLoading}
            minLength={3}
            maxLength={50}
            pattern="[a-zA-Z0-9]+"
            title="Username must be alphanumeric (letters and numbers only)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Only letters and numbers, 3-50 characters
          </p>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Enter email address"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Temporary Password
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter temporary password"
                required
                disabled={isLoading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="button"
              onClick={generatePassword}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
              disabled={isLoading}
            >
              Generate
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Minimum 8 characters. Admin should change this on first login.
          </p>
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="adminRole"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Admin Role
          </label>
          <select
            id="adminRole"
            value={adminRole}
            onChange={(e) => setAdminRole(e.target.value as 'moderator' | 'finance')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            disabled={isLoading}
          >
            <option value="moderator">Moderator</option>
            <option value="finance">Finance Admin</option>
          </select>
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <p>
              <strong>Moderator:</strong> Review registrations, preliminary
              submissions, and semifinal evaluations
            </p>
            <p>
              <strong>Finance:</strong> Verify payment proofs from teams
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Admin Account...' : 'Create Admin Account'}
        </button>
      </form>
    </div>
  );
}
