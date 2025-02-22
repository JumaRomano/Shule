import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  enrollmentCount: number;
  duration: string;
  thumbnailUrl: string;
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
    instructor: 'John Doe',
    enrollmentCount: 1234,
    duration: '8 weeks',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and design patterns.',
    instructor: 'Jane Smith',
    enrollmentCount: 856,
    duration: '6 weeks',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Full Stack Development',
    description: 'Build complete web applications from front to back.',
    instructor: 'Mike Johnson',
    enrollmentCount: 2156,
    duration: '12 weeks',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  }
];

export function Courses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Available Courses</h1>
        <div className="flex gap-4">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Data Science</option>
          </select>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Sort by: Newest</option>
            <option>Sort by: Popular</option>
            <option>Sort by: Price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>{course.instructor}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.enrollmentCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}