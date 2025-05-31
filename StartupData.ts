import React, { useState } from 'react';
import { Star, MapPin, Clock, Mail, Phone, Globe, ExternalLink, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReviewModal from './ReviewModal';

interface Review {
  id: number;
  author: string;
  comment: string;
  rating: number;
  date: string;
}

interface Startup {
  id: number;
  name: string;
  category: string;
  services: string[];
  hours: string;
  contact: {
    email: string;
    phone: string;
    website: string;
    address: string;
  };
  description: string;
  logo: string;
  reviews: Review[];
  isOpen: boolean;
}

interface StartupCardProps {
  startup: Startup;
  onUpdateReviews: (startupId: number, newReviews: Review[]) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, onUpdateReviews }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const averageRating = startup.reviews.length > 0
    ? startup.reviews.reduce((sum, review) => sum + review.rating, 0) / startup.reviews.length
    : 0;

  const handleAddReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: startup.reviews.length + 1,
      date: new Date().toLocaleDateString()
    };
    const updatedReviews = [...startup.reviews, newReview];
    onUpdateReviews(startup.id, updatedReviews);
    setShowReviewModal(false);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={startup.logo} alt={startup.name} />
                <AvatarFallback className="bg-gradient-to-br from-sky-500 to-orange-500 text-white font-semibold">
                  {startup.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">{startup.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {startup.category}
                  </Badge>
                  <div className={`flex items-center text-xs ${startup.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {startup.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>
              </div>
            </div>
            {averageRating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({startup.reviews.length})</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {showFullDescription ? startup.description : `${startup.description.substring(0, 120)}...`}
              {startup.description.length > 120 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-sky-600 hover:text-sky-800 ml-1 text-sm font-medium"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Services</h4>
            <div className="flex flex-wrap gap-1">
              {startup.services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {startup.services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{startup.services.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              {startup.hours}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              {startup.contact.address}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t">
            <div className="flex space-x-1">
              <a
                href={`mailto:${startup.contact.email}`}
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${startup.contact.phone}`}
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={startup.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                title="Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <Button
              onClick={() => setShowReviewModal(true)}
              variant="outline"
              size="sm"
              className="border-sky-200 text-sky-600 hover:bg-sky-50"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Review
            </Button>
          </div>

          {/* Recent Reviews */}
          {startup.reviews.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Recent Review</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {startup.reviews[startup.reviews.length - 1].author}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < startup.reviews[startup.reviews.length - 1].rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {startup.reviews[startup.reviews.length - 1].comment}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showReviewModal && (
        <ReviewModal
          startupName={startup.name}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleAddReview}
        />
      )}
    </>
  );
};

export default StartupCard;