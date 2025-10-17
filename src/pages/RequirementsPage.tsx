import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { CheckCircle, BookOpen, Award } from 'lucide-react';
import type { User } from '../App';

interface RequirementsPageProps {
  user: User | null;
  onLogout: () => void;
}

export default function RequirementsPage({ user, onLogout }: RequirementsPageProps) {
  const requirements = {
    ms: {
      academic: [
        '16 years of education (BA/BSc/BBA/BCS or equivalent)',
        'Minimum 2.5 CGPA or 50% marks',
        'No third division in academic career',
      ],
      test: [
        'GAT (General) with minimum 50% marks',
        'Valid GAT score (not older than 5 years)',
        'Department entry test (if applicable)',
      ],
      additional: [
        'Two recommendation letters from professors',
        'Statement of Purpose (1-2 pages)',
        'Research proposal (for research-based programs)',
      ],
    },
    mba: {
      academic: [
        '16 years of education in any discipline',
        'Minimum 2.5 CGPA or 50% marks',
        'No third division throughout academic career',
      ],
      test: [
        'NTS/GAT (General) with minimum 50% marks',
        'Valid test score (not older than 5 years)',
      ],
      additional: [
        'Work experience preferred but not mandatory',
        'Two recommendation letters',
        'Statement of Purpose',
      ],
    },
    mphil: {
      academic: [
        '18 years of education (MS/MA/MSc or equivalent)',
        'Minimum 3.0 CGPA or First Division',
        'Relevant subject background',
      ],
      test: [
        'GAT (Subject) with minimum 60% marks',
        'Valid GAT score (not older than 5 years)',
        'Department research aptitude test',
      ],
      additional: [
        'Research proposal (mandatory)',
        'Two recommendation letters from supervisors',
        'Interview with department committee',
        'Publication record (preferred)',
      ],
    },
    phd: {
      academic: [
        '18 years of education (M.Phil/MS or equivalent)',
        'Minimum 3.0 CGPA in M.Phil/MS',
        'Strong research background',
      ],
      test: [
        'GAT (Subject) with minimum 60% marks',
        'Department comprehensive exam',
        'Research proposal defense',
      ],
      additional: [
        'Detailed research proposal (5-10 pages)',
        'Two recommendation letters from research supervisors',
        'Interview with doctoral committee',
        'At least one publication in HEC recognized journal (preferred)',
        'Identification of potential supervisor',
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">Admission Requirements</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Review the eligibility criteria and requirements for different postgraduate programs.
          </p>
        </div>
      </section>

      {/* Requirements Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="ms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="ms">MS Programs</TabsTrigger>
              <TabsTrigger value="mba">MBA Programs</TabsTrigger>
              <TabsTrigger value="mphil">M.Phil Programs</TabsTrigger>
              <TabsTrigger value="phd">PhD Programs</TabsTrigger>
            </TabsList>

            {Object.entries(requirements).map(([key, reqs]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Academic Requirements */}
                  <Card className="hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-gray-900 mb-4">Academic Requirements</h3>
                      <ul className="space-y-3">
                        {reqs.academic.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Test Requirements */}
                  <Card className="hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-gray-900 mb-4">Test Requirements</h3>
                      <ul className="space-y-3">
                        {reqs.test.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Additional Requirements */}
                  <Card className="hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-gray-900 mb-4">Additional Requirements</h3>
                      <ul className="space-y-3">
                        {reqs.additional.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* General Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8 text-center">General Requirements for All Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">Eligibility Criteria</h3>
                <ul className="space-y-2">
                  {[
                    'Pakistani national or foreign student with valid visa',
                    'No criminal record',
                    'Medically fit',
                    'Not dismissed from any educational institution',
                    'Meets program-specific requirements',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">Document Verification</h3>
                <ul className="space-y-2">
                  {[
                    'All documents must be original or attested',
                    'Equivalence certificate for foreign degrees',
                    'Migration certificate (if applicable)',
                    'Gap certificate for study breaks',
                    'Documents verified by HEC/relevant authority',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
