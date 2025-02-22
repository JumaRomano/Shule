import React from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Clock, Users, PlayCircle, FileText, CheckCircle } from 'lucide-react';

export function CourseDetails() {
  const { id } = useParams();

  // This would normally be fetched from an API
  const course = {
    id,
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript. This comprehensive course will take you from beginner to confident web developer through hands-on projects and real-world examples.',
    instructor: 'John Doe',
    enrollmentCount: 1234,
    duration: '8 weeks',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        id: '1',
        title: 'Getting Started with HTML',
        lessons: [
          { id: '1', title: 'Introduction to HTML', duration: '10:00', type: 'video' },
          { id: '2', title: 'HTML Elements & Tags', duration: '15:00', type: 'video' },
          { id: '3', title: 'HTML Forms', duration: '20:00', type: 'video' },
        ]
      },
      {
        id: '2',
        title: 'CSS Fundamentals',
        lessons: [
          { id: '4', title: 'Introduction to CSS', duration: '12:00', type: 'video' },
          { id: '5', title: 'CSS Selectors', duration: '18:00', type: 'video' },
          { id: '6', title: 'CSS Layout', duration: '25:00', type: 'video' },
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center px-4">{course.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{course.enrollmentCount.toLocaleString()} students</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.duration}</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600">{course.description}</p>

          <button className="mt-6 w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Enroll Now
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h2>
        <div className="space-y-4">
          {course.modules.map((module) => (
            <div key={module.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
              </div>
              <div className="divide-y">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      {lesson.type === 'video' ? (
                        <PlayCircle className="h-5 w-5 text-gray-400 mr-3" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      )}
                      <span className="text-sm text-gray-900">{lesson.title}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">{lesson.duration}</span>
                      <CheckCircle className="h-5 w-5 text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}