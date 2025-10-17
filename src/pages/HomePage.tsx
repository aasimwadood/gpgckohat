import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Calendar, Bell, BookOpen, Award, Users, TrendingUp, 
  Wifi, Network, GraduationCap, Lightbulb, ArrowRight 
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import type { User } from '../App';
import cm from '../assets/image/cm.jpeg';
import principal from '../assets/image/javed.jpg';
interface HomePageProps {
  user: User | null;
  onLogout: () => void;
}

export default function HomePage({ user, onLogout }: HomePageProps) {
  const newsItems = [
    { id: 1, title: 'Admissions Open for Spring 2025', date: '2025-10-15', category: 'Admissions' },
    { id: 2, title: 'Annual Sports Week Commences Next Monday', date: '2025-10-14', category: 'Events' },
    { id: 3, title: 'Career Counseling Workshop - Register Now', date: '2025-10-12', category: 'Workshop' },
    { id: 4, title: 'Mid-term Examination Schedule Released', date: '2025-10-10', category: 'Examination' },
  ];

  const quickStats = [
    { icon: Users, label: 'Students Enrolled', value: '5,000+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Programs Offered', value: '25+', color: 'text-green-600' },
    { icon: Award, label: 'Years of Excellence', value: '30+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Placement Rate', value: '92%', color: 'text-orange-600' },
  ];

  const leadershipMessages = [
    {
      title: "Minister's Message",
      name: "Mr. Meena Khan",
      image: cm,
      message: "Our institution stands as a beacon of knowledge, innovation, and academic excellence. We are committed to empowering students through cutting-edge education, fostering critical thinking, and nurturing the leaders of tomorrow who will drive meaningful change in our global community.",
    },
    {
      title: "Principal's Message",
      name: "Dr. Javed Iqbal",
      image: principal,
      message: "We are dedicated to creating a vibrant ecosystem of learning, research, and innovation. Our mission is to provide world-class education that prepares students to tackle real challenges with confidence, competence, and ethical responsibility, while contributing to the advancement of science and technology.",
    },
  ];

  const whyStats = [
    { icon: Wifi, value: '1 Gbps', label: 'Internet Speed', color: 'from-blue-500 to-cyan-500' },
    { icon: Network, value: '100%', label: 'Campus Coverage', color: 'from-purple-500 to-pink-500' },
    { icon: Users, value: '26000+', label: 'Alumni Network', color: 'from-orange-500 to-red-500' },
    { icon: Award, value: 'Scholarship', label: 'Programs', color: 'from-green-500 to-emerald-500' },
    { icon: Lightbulb, value: 'KIC', label: 'Innovation Center', color: 'from-yellow-500 to-orange-500' },
    { icon: GraduationCap, value: '8000+', label: 'Students', color: 'from-indigo-500 to-purple-500' },
  ];

  const faculties = [
    {
      name: 'Faculty of Computer Science',
      dean: 'HoD: Dr. Muhammad Abid',
      description: 'We are happy that you have chosen to be with us for a new phase in your academic journey. This faculty has a long history of excellence in computing education.',
      image: 'https://images.unsplash.com/photo-1618053238059-cc7761222f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc2MDYzMjcwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-green-400 to-emerald-600',
    },
    {
      name: 'Faculty of Biology',
      dean: 'HoD: Mr. ABC',
      description: 'The Faculty of Business & Management Sciences, at present, offers courses in Management, Marketing, Finance, Economics and related disciplines.',
      image: 'https://images.unsplash.com/photo-1629272039203-7d76fdaf1324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbmFnZW1lbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzYwNzAyMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-blue-400 to-indigo-600',
    },
    {
      name: 'Faculty of English',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },
      {
      name: 'Faculty of Mathematics',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },
      {
      name: 'Faculty of Zoology',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },
      {
      name: 'Faculty of Statistics',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },{
      name: 'Faculty of Political Science',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },{
      name: 'Faculty of Chemistry',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },{
      name: 'Faculty of Geography',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },{
      name: 'Faculty of Physics',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },{
      name: 'Faculty of Urdu',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },
    {
      name: 'Faculty of Economics',
      dean: 'HoD: Mr. Faheem Illyas',
      description: 'The Faculty of Engineering comprises of six departments: Electrical Engineering, Mechanical Engineering, Civil Engineering, and related disciplines.',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlY2hub2xvZ3klMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNzAyMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-400 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724436781032-c1645c5783ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwNjczMzkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="College Campus"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6">Welcome to Our Institution</h1>
            <p className="text-xl mb-8 text-blue-100">
              Empowering minds, shaping futures. Join us in our journey of academic excellence and holistic development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/downloads">
                <Button size="lg" variant="secondary">
                  Apply Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadershipMessages.map((leader, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-blue-600 overflow-hidden ring-4 ring-blue-100">
                        <ImageWithFallback
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-blue-800 mb-1 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {leader.title}
                      </h3>
                      <p className="text-gray-600">{leader.name}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {leader.message}
                  </p>
                  <Button variant="outline" className="group">
                    Read Full Message 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Slider */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Choose Our Institution</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find your voice, fuel your passion and forge your path at our institution, where diversity, inclusivity and student success come first.
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-6 animate-scroll-left hover:pause">
              {[...whyStats, ...whyStats].map((stat, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 flex-shrink-0 w-48">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll-left {
              animation: scroll-left 20s linear infinite;
            }
            
            .animate-scroll-left:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </section>

      {/* Faculties Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Faculties</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Join a community of scholars, innovators and leaders where creativity, critical thinking and collaboration thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculties.map((faculty, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${faculty.color} opacity-90`}></div>
                  <ImageWithFallback
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <BookOpen className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-gray-900 mb-2">{faculty.name}</h3>
                  <p className="text-sm text-red-600 mb-3">{faculty.dean}</p>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {faculty.description}
                  </p>
                  <Button variant="default" className="w-full group/btn">
                    View Detail
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900 mb-2">Latest News & Announcements</h2>
              <p className="text-gray-600">Stay updated with the latest happenings</p>
            </div>
            <Bell className="w-8 h-8 text-blue-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-gray-900 mb-2">{item.title}</h3>
                  <Button variant="link" className="p-0 h-auto">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 text-center mb-12">Explore Our Campus</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1652305500057-0fcb348b62aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwbGlicmFyeXxlbnwxfHx8fDE3NjA2NTYwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Academic Excellence"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-3">Academic Excellence</h3>
                <p className="text-gray-600 mb-4">
                  World-class faculty and state-of-the-art facilities for comprehensive learning.
                </p>
                <Link to="/about">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1738949538812-aebbb54a0592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZ3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDF8fHx8MTc2MDY4OTk5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Student Life"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-3">Student Life</h3>
                <p className="text-gray-600 mb-4">
                  Vibrant campus culture with diverse extracurricular activities and events.
                </p>
                <Link to="/about">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group">
              <div className="aspect-video relative bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Award className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-3">Admissions</h3>
                <p className="text-gray-600 mb-4">
                  Join our community of learners. Admissions now open for Spring 2025.
                </p>
                <Link to="/downloads">
                  <Button variant="link" className="p-0">
                    Apply Now →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
