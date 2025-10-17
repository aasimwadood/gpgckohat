import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Mail, Phone, MapPin, Clock, Building2, HelpCircle } from 'lucide-react';
import type { User } from '../App';

interface ContactPageProps {
  user: User | null;
  onLogout: () => void;
}

export default function ContactPage({ user, onLogout }: ContactPageProps) {
  const campuses = [
    {
      name: 'Main Campus',
      address: 'University Road, Sector H-12, Islamabad',
      phone: '+92-51-9085-0000',
      email: 'info@college.edu.pk',
    },
    {
      name: 'City Campus',
      address: 'Blue Area, F-7, Islamabad',
      phone: '+92-51-9085-0001',
      email: 'city@college.edu.pk',
    },
  ];

  const contacts = [
    {
      icon: Mail,
      title: 'General Inquiries',
      details: 'info@college.edu.pk',
      description: 'For general questions and information',
    },
    {
      icon: Building2,
      title: 'Admissions Office',
      details: 'admissions@college.edu.pk',
      description: 'For admission-related queries',
    },
    {
      icon: HelpCircle,
      title: 'Technical Support',
      details: 'support@college.edu.pk',
      description: 'For technical and IT support',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+92-51-9085-0000',
      description: 'Available Mon-Fri, 9:00 AM - 5:00 PM',
    },
  ];

  const departments = [
    { name: 'Computer Science', phone: '+92-51-9085-1001', email: 'cs@college.edu.pk' },
    { name: 'Business Administration', phone: '+92-51-9085-1002', email: 'business@college.edu.pk' },
    { name: 'Engineering', phone: '+92-51-9085-1003', email: 'engineering@college.edu.pk' },
    { name: 'Finance Office', phone: '+92-51-9085-2001', email: 'finance@college.edu.pk' },
    { name: 'Controller of Examinations', phone: '+92-51-9085-3001', email: 'examinations@college.edu.pk' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Get in touch with us. We're here to help and answer any questions you may have.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8">How Can We Help?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <contact.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-blue-600 mb-2">{contact.details}</p>
                  <p className="text-sm text-gray-500">{contact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-gray-900 mb-6">Send us a Message</h2>
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+92-XXX-XXXXXXX" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-gray-900 mb-6">Office Hours</h2>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <Clock className="w-10 h-10 text-blue-600 mb-4" />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span className="text-gray-900">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span className="text-gray-900">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span className="text-gray-900">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-gray-900 mb-4">Campus Locations</h3>
              {campuses.map((campus, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="p-6">
                    <h4 className="text-gray-900 mb-3">{campus.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{campus.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{campus.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{campus.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8">Department-Wise Contacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-gray-900 mb-4">{dept.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600">{dept.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600">{dept.email}</span>
                    </div>
                  </div>
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
