import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const recentCourses = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      progress: 25,
      lastAccessed: '2 days ago',
      thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      progress: 10,
      lastAccessed: '5 days ago',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const achievements = [
    {
      title: 'First Login',
      description: 'Started your learning journey',
      date: new Date().toLocaleDateString(),
      icon: Award
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'React Hooks Quiz',
      course: 'Advanced React Patterns',
      dueDate: '2024-03-01',
      type: 'Quiz'
    },
    {
      title: 'Final Project',
      course: 'Introduction to Web Development',
      dueDate: '2024-03-15',
      type: 'Assignment'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email?.split('@')[0]}</h1>
        <p className="mt-2 text-gray-600">Here's what's happening with your courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Courses</h2>
              <Link to="/courses" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                View all courses <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{course.title}</h3>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{course.progress}%</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Last accessed {course.lastAccessed}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{deadline.title}</h3>
                    <p className="text-sm text-gray-500">{deadline.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Due {new Date(deadline.dueDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{deadline.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-500">Active Courses</span>
                  </div>
                  <span className="text-lg font-medium text-gray-900">2</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-500">Hours Learned</span>
                  </div>
                  <span className="text-lg font-medium text-gray-900">12</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-500">Achievements</span>
                  </div>
                  <span className="text-lg font-medium text-gray-900">{achievements.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <achievement.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}