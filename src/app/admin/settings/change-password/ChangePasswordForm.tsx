'use client';

import { AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { useState } from 'react';

interface ChangePasswordFormProps {
  adminId: string;
}

export default function ChangePasswordForm({
  adminId,
}: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    if (newPassword === currentPassword) {
      setError('New password must be different from current password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    // Check password strength
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      setError('Password must contain uppercase, lowercase, and numbers');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to change password');
        setIsLoading(false);
        return;
      }

      setSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsLoading(false);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { label: '', color: '' };
    if (password.length < 8)
      return { label: 'Too short', color: 'text-red-600' };

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = [hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(
      Boolean,
    ).length;

    if (strength <= 2) return { label: 'Weak', color: 'text-orange-600' };
    if (strength === 3) return { label: 'Good', color: 'text-blue-600' };
    return { label: 'Strong', color: 'text-green-600' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-8'>
      {/* Error Alert */}
      {error && (
        <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3'>
          <AlertCircle
            className='text-red-600 flex-shrink-0 mt-0.5'
            size={20}
          />
          <div>
            <p className='text-sm font-medium text-red-800'>Error</p>
            <p className='text-sm text-red-700 mt-1'>{error}</p>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3'>
          <CheckCircle
            className='text-green-600 flex-shrink-0 mt-0.5'
            size={20}
          />
          <div>
            <p className='text-sm font-medium text-green-800'>Success</p>
            <p className='text-sm text-green-700 mt-1'>{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Current Password */}
        <div>
          <label
            htmlFor='currentPassword'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Current Password
          </label>
          <div className='relative'>
            <Lock
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='password'
              id='currentPassword'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
              placeholder='Enter your current password'
              required
              disabled={isLoading}
              autoComplete='current-password'
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor='newPassword'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            New Password
          </label>
          <div className='relative'>
            <Lock
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='password'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
              placeholder='Enter your new password'
              required
              disabled={isLoading}
              autoComplete='new-password'
            />
          </div>
          {newPassword && (
            <p className={`text-sm mt-2 font-medium ${passwordStrength.color}`}>
              Password strength: {passwordStrength.label}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Confirm New Password
          </label>
          <div className='relative'>
            <Lock
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
              placeholder='Re-enter your new password'
              required
              disabled={isLoading}
              autoComplete='new-password'
            />
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className='text-sm text-red-600 mt-2'>Passwords do not match</p>
          )}
        </div>

        {/* Password Requirements */}
        <div className='bg-gray-50 rounded-lg p-4'>
          <p className='text-sm font-medium text-gray-700 mb-2'>
            Password requirements:
          </p>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li className='flex items-center gap-2'>
              <span
                className={
                  newPassword.length >= 8 ? 'text-green-600' : 'text-gray-400'
                }
              >
                {newPassword.length >= 8 ? '✓' : '○'}
              </span>
              At least 8 characters
            </li>
            <li className='flex items-center gap-2'>
              <span
                className={
                  /[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-400'
                }
              >
                {/[A-Z]/.test(newPassword) ? '✓' : '○'}
              </span>
              Contains uppercase letter
            </li>
            <li className='flex items-center gap-2'>
              <span
                className={
                  /[a-z]/.test(newPassword) ? 'text-green-600' : 'text-gray-400'
                }
              >
                {/[a-z]/.test(newPassword) ? '✓' : '○'}
              </span>
              Contains lowercase letter
            </li>
            <li className='flex items-center gap-2'>
              <span
                className={
                  /\d/.test(newPassword) ? 'text-green-600' : 'text-gray-400'
                }
              >
                {/\d/.test(newPassword) ? '✓' : '○'}
              </span>
              Contains number
            </li>
            <li className='flex items-center gap-2'>
              <span
                className={
                  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                    ? 'text-green-600'
                    : 'text-gray-400'
                }
              >
                {/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? '✓' : '○'}
              </span>
              Contains special character (recommended)
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
