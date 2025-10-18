import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { GraduationCap, AlertCircle } from 'lucide-react';
import type { User } from '../App';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('student');
  const [error, setError] = useState('');

  // Demo credentials for testing
  const demoAccounts = {
    admin: { email: 'admin@college.edu.pk', password: 'admin123', name: 'Admin User' },
    faculty: { email: 'faculty@college.edu.pk', password: 'faculty123', name: 'Prof. John Doe' },
    student: { email: 'student@college.edu.pk', password: 'student123', name: 'Ahmed Khan' },
    department: { email: 'dept@college.edu.pk', password: 'dept123', name: 'Department Head' },
    controller: { email: 'controller@college.edu.pk', password: 'controller123', name: 'Controller' },
    coordinator: { email: 'coordinator@college.edu.pk', password: 'coordinator123', name: 'Coordinator' },
    principal: { email: 'principal@college.edu.pk', password: 'principal123', name: 'Dr. Principal' },
    administration: { email: 'admin-staff@college.edu.pk', password: 'admin123', name: 'Admin Staff' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const account = demoAccounts[role];
    if (email === account.email && password === account.password) {
      const user: User = {
        id: `${role}-001`,
        name: account.name,
        email: account.email,
        role: role,
      };
      onLogin(user);
      navigate(`/dashboard/${role}`);
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const handleDemoLogin = (demoRole: User['role']) => {
    const account = demoAccounts[demoRole];
    const user: User = {
      id: `${demoRole}-001`,
      name: account.name,
      email: account.email,
      role: demoRole,
    };
    onLogin(user);
    navigate(`/dashboard/${demoRole}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <h1 className="text-gray-900">College Portal</h1>
          </div>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="role">Select Role</Label>
                <Select value={role} onValueChange={(value:any) => setRole(value as User['role'])}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="department">Department Academic</SelectItem>
                    <SelectItem value="controller">Controller of Examination</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('student')}
                >
                  Student Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('faculty')}
                >
                  Faculty Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                >
                  Admin Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('principal')}
                >
                  Principal Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('controller')}
                >
                  Controller Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('coordinator')}
                >
                  Coordinator Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('department')}
                >
                  HoD Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('administration')}
                >
                  Accountant Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/register')}>
              Register here
            </Button>
          </p>
          <Button variant="link" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
