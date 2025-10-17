import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BookOpen, Clock, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { User } from '../App';

interface ProgramsPageProps {
  user: User | null;
  onLogout: () => void;
}

export default function ProgramsPage({ user, onLogout }: ProgramsPageProps) {
  const programs = {
    ms: [
      {
        name: 'MS Computer Science',
        department: 'Computer Science',
        duration: '2 Years',
        credits: '30 Credit Hours',
        eligibility: '16 years of education with minimum 2.5 CGPA',
        specializations: ['Artificial Intelligence', 'Cybersecurity', 'Data Science'],
      },
      {
        name: 'MS Mathematics',
        department: 'Mathematics',
        duration: '2 Years',
        credits: '30 Credit Hours',
        eligibility: '16 years of education with minimum 2.5 CGPA',
        specializations: ['Pure Mathematics', 'Applied Mathematics', 'Statistics'],
      },
      {
        name: 'MS Physics',
        department: 'Physics',
        duration: '2 Years',
        credits: '30 Credit Hours',
        eligibility: '16 years of education with minimum 2.5 CGPA',
        specializations: ['Condensed Matter Physics', 'Nuclear Physics', 'Astrophysics'],
      },
      {
        name: 'MS Chemistry',
        department: 'Chemistry',
        duration: '2 Years',
        credits: '30 Credit Hours',
        eligibility: '16 years of education with minimum 2.5 CGPA',
        specializations: ['Organic Chemistry', 'Inorganic Chemistry', 'Analytical Chemistry'],
      },
    ],
    mba: [
      {
        name: 'MBA (General)',
        department: 'Business Administration',
        duration: '2 Years',
        credits: '60 Credit Hours',
        eligibility: '16 years of education with minimum 2.5 CGPA',
        specializations: ['Finance', 'Marketing', 'Human Resource Management', 'General Management'],
      },
      {
        name: 'MS Finance',
        department: 'Business Administration',
        duration: '2 Years',
        credits: '30 Credit Hours',
        eligibility: '16 years of education with minimum 2.5 CGPA',
        specializations: ['Corporate Finance', 'Investment Management', 'Financial Planning'],
      },
    ],
    mphil: [
      {
        name: 'M.Phil Computer Science',
        department: 'Computer Science',
        duration: '2 Years',
        credits: '30 Credit Hours + Thesis',
        eligibility: 'MS/MA with minimum 3.0 CGPA',
        specializations: ['Research-based program'],
      },
      {
        name: 'M.Phil Mathematics',
        department: 'Mathematics',
        duration: '2 Years',
        credits: '30 Credit Hours + Thesis',
        eligibility: 'MS/MA with minimum 3.0 CGPA',
        specializations: ['Research-based program'],
      },
      {
        name: 'M.Phil English',
        department: 'English',
        duration: '2 Years',
        credits: '30 Credit Hours + Thesis',
        eligibility: 'MA English with minimum 3.0 CGPA',
        specializations: ['Linguistics', 'Literature', 'Language Teaching'],
      },
    ],
    phd: [
      {
        name: 'PhD Computer Science',
        department: 'Computer Science',
        duration: '3-5 Years',
        credits: '18 Credit Hours + Dissertation',
        eligibility: 'M.Phil/MS with minimum 3.0 CGPA',
        specializations: ['Advanced research in specialized areas'],
      },
      {
        name: 'PhD Mathematics',
        department: 'Mathematics',
        duration: '3-5 Years',
        credits: '18 Credit Hours + Dissertation',
        eligibility: 'M.Phil/MS with minimum 3.0 CGPA',
        specializations: ['Advanced research in specialized areas'],
      },
      {
        name: 'PhD Physics',
        department: 'Physics',
        duration: '3-5 Years',
        credits: '18 Credit Hours + Dissertation',
        eligibility: 'M.Phil/MS with minimum 3.0 CGPA',
        specializations: ['Advanced research in specialized areas'],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">Academic Programs</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our comprehensive range of postgraduate programs designed to advance your academic and professional career.
          </p>
        </div>
      </section>

      {/* Programs Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="ms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="ms">MS Programs</TabsTrigger>
              <TabsTrigger value="mba">MBA Programs</TabsTrigger>
              <TabsTrigger value="mphil">M.Phil Programs</TabsTrigger>
              <TabsTrigger value="phd">PhD Programs</TabsTrigger>
            </TabsList>

            {Object.entries(programs).map(([key, programList]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programList.map((program, index) => (
                    <Card key={index} className="hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-gray-900 mb-2">{program.name}</h3>
                            <Badge variant="secondary" className="mb-3">{program.department}</Badge>
                          </div>
                          <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>Duration: {program.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span>{program.credits}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                            <span>Eligibility: {program.eligibility}</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm text-gray-900 mb-2">Specializations:</h4>
                          <ul className="space-y-1">
                            {program.specializations.map((spec, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2">
                          <Link to="/how-to-apply" className="flex-1">
                            <Button className="w-full">Apply Now</Button>
                          </Link>
                          <Link to="/requirements">
                            <Button variant="outline">Requirements</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
