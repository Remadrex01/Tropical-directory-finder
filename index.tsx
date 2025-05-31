import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Clock, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StartupCard from '@/components/StartupCard';
import AddStartupForm from '@/components/AddStartupForm';
import { startupData } from '@/data/startupData';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [startups, setStartups] = useState(startupData);

  const categories = ['All', 'Fintech', 'Health', 'Education', 'Transport', 'E-commerce', 'Tech', 'Agriculture', 'Tourism'];

  const filteredStartups = useMemo(() => {
    return startups.filter(startup => {
      const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           startup.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || startup.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [startups, searchTerm, selectedCategory]);

  const handleAddStartup = (newStartup: any) => {
    const startup = {
      ...newStartup,
      id: startups.length + 1,
      reviews: []
    };
    setStartups([...startups, startup]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-orange-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent">
                  Freetown Directory
                </h1>
                <p className="text-sm text-gray-600">Discover amazing startups in Sierra Leone</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Startup
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover
            <span className="bg-gradient-to-r from-sky-600 to-orange-600 bg-clip-text text-transparent"> Innovation </span>
            in Freetown
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore the vibrant startup ecosystem of Freetown, Sierra Leone. Connect with innovative companies 
            that are transforming the business landscape in West Africa.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search startups, services, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-gray-300 focus:border-sky-500"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-sky-600">{startups.length}</div>
                  <div className="text-sm text-gray-600">Total Startups</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600">{categories.length - 1}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-sky-600">
                    {startups.reduce((acc, startup) => acc + startup.reviews.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600">
                    {(startups.reduce((acc, startup) => {
                      const avgRating = startup.reviews.length > 0 
                        ? startup.reviews.reduce((sum, review) => sum + review.rating, 0) / startup.reviews.length 
                        : 0;
                      return acc + avgRating;
                    }, 0) / startups.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredStartups.length} Startups Found
            </h3>
            {(searchTerm || selectedCategory !== 'All') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Startup Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map(startup => (
              <StartupCard 
                key={startup.id} 
                startup={startup}
                onUpdateReviews={(startupId, newReviews) => {
                  setStartups(startups.map(s => 
                    s.id === startupId ? { ...s, reviews: newReviews } : s
                  ));
                }}
              />
            ))}
          </div>

          {filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No startups found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Freetown Directory</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Supporting the growth of Sierra Leone's startup ecosystem by connecting entrepreneurs, 
                investors, and customers in Freetown and beyond.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-sky-600">Home</a></li>
                <li><a href="#" className="hover:text-sky-600">Startups</a></li>
                <li><a href="#" className="hover:text-sky-600">Add Startup</a></li>
                <li><a href="#" className="hover:text-sky-600">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Freetown, Sierra Leone</li>
                <li>contact@freetowndirectory.com</li>
                <li>+232 (0) 123 456 789</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Freetown Directory. Made with ❤️ in Sierra Leone.</p>
          </div>
        </div>
      </footer>

      {/* Add Startup Modal */}
      {showAddForm && (
        <AddStartupForm 
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddStartup}
        />
      )}
    </div>
  );
};

export default Index;
