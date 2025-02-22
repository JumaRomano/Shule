import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Award, BookOpen } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and achievements.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Student</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">My Achievements</h3>
            <Award className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Award className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">First Course Completed</h4>
                <p className="text-sm text-gray-500">Earned on: Not yet achieved</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Award className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Perfect Quiz Score</h4>
                <p className="text-sm text-gray-500">Earned on: Not yet achieved</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Learning Progress</h3>
            <BookOpen className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Courses Completed</span>
                <span>0/0</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full w-0"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Assignments Submitted</span>
                <span>0/0</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full w-0"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Quiz Average</span>
                <span>0%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-600 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}