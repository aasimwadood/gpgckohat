import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Target, Eye, History, Users } from 'lucide-react';
import type { User } from '../App';

interface AboutPageProps {
  user: User | null;
  onLogout: () => void;
}

export default function AboutPage({ user, onLogout }: AboutPageProps) {
  const leadership = [
    { name: 'Dr. Ahmed Khan', position: 'Principal', department: 'Administration' },
    { name: 'Prof. Sarah Ali', position: 'Vice Principal', department: 'Academic Affairs' },
    { name: 'Dr. Hassan Mahmood', position: 'Head of Department', department: 'Computer Science' },
    { name: 'Dr. Ayesha Siddiqui', position: 'Head of Department', department: 'Business Administration' },
    { name: 'Prof. Usman Tariq', position: 'Head of Department', department: 'Engineering' },
    { name: 'Ms. Fatima Noor', position: 'Academic Coordinator', department: 'Academic Affairs' },
  ];

  const departments = [
    {
      name: 'Computer Science',
      description: 'Cutting-edge curriculum in software development, AI, and cybersecurity.',
      programs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence'],
    },
    {
      name: 'Business Administration',
      description: 'Comprehensive business education with focus on entrepreneurship and management.',
      programs: ['BBA', 'MBA', 'Executive MBA'],
    },
    {
      name: 'Engineering',
      description: 'World-class engineering programs with state-of-the-art laboratories.',
      programs: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">About Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Learn about our institution's mission, vision, and commitment to academic excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To provide quality education that empowers students with knowledge, skills, and values 
                  necessary to excel in their chosen fields and contribute positively to society.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <Eye className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  To be recognized as a leading institution of higher learning that fosters innovation, 
                  research, and character development, preparing graduates for global leadership.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <History className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-gray-900 mb-4">Our History</h2>
              <p className="text-gray-600 mb-4">
                Established in 1995, our institution has been at the forefront of education for over 30 years. 
                What started as a small college with just 200 students has grown into a comprehensive institution 
                serving over 5,000 students across multiple disciplines.
              </p>
              <p className="text-gray-600">
                Throughout our journey, we have maintained our commitment to academic excellence, character building, 
                and producing graduates who make meaningful contributions to their professions and communities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-blue-600" />
            <h2 className="text-gray-900">Our Leadership</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((leader, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-xl">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 mb-2">{leader.position}</p>
                  <p className="text-sm text-gray-500">{leader.department}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8">Our Departments</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-gray-900 mb-3">{dept.name}</h3>
                  <p className="text-gray-600 mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Programs Offered:</p>
                    <ul className="space-y-1">
                      {dept.programs.map((program, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8">Campus Highlights</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Modern Classrooms', value: '100+' },
              { label: 'Computer Labs', value: '15' },
              { label: 'Library Books', value: '50,000+' },
              { label: 'Research Centers', value: '8' },
            ].map((highlight, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="text-blue-600 mb-2">{highlight.value}</div>
                  <p className="text-gray-600">{highlight.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
