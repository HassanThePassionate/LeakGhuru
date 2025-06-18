import React from 'react';
import { Clock, User, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'security' | 'user' | 'system' | 'alert';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  maxEvents?: number;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events, maxEvents = 10 }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'security': return Shield;
      case 'user': return User;
      case 'alert': return AlertTriangle;
      case 'system': return CheckCircle;
      default: return Info;
    }
  };

  const getEventColor = (type: string, severity?: string) => {
    if (severity) {
      switch (severity) {
        case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
        case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
        case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
        case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      }
    }

    switch (type) {
      case 'security': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'user': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'alert': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'system': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const displayEvents = events.slice(0, maxEvents);

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <Clock className="w-6 h-6 text-primary" />
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {displayEvents.map((event, index) => {
          const EventIcon = getEventIcon(event.type);
          const isLast = index === displayEvents.length - 1;

          return (
            <div key={event.id} className="relative">
              <div className="flex items-start space-x-4">
                <div className={`relative z-10 p-2 rounded-lg border ${getEventColor(event.type, event.severity)}`}>
                  <EventIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium text-sm">{event.title}</p>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {formatTimeAgo(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{event.description}</p>
                  {event.user && (
                    <p className="text-xs text-gray-500">by {event.user}</p>
                  )}
                </div>
              </div>
              {!isLast && (
                <div className="absolute left-6 top-12 w-px h-4 bg-tertiary"></div>
              )}
            </div>
          );
        })}
      </div>

      {events.length > maxEvents && (
        <div className="mt-4 pt-4 border-t border-tertiary">
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200">
            View all activity ({events.length - maxEvents} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;