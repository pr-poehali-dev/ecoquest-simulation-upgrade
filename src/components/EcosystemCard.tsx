import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export interface Ecosystem {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  threats: string[];
  unlocked: boolean;
  description: string;
}

interface EcosystemCardProps {
  ecosystem: Ecosystem;
  onClick: () => void;
}

export default function EcosystemCard({ ecosystem, onClick }: EcosystemCardProps) {
  return (
    <Card
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        !ecosystem.unlocked ? 'opacity-60' : ''
      }`}
      style={{ backgroundColor: ecosystem.color }}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{ecosystem.icon}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{ecosystem.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{ecosystem.description}</p>
            </div>
          </div>
          {!ecosystem.unlocked && (
            <Icon name="Lock" size={20} className="text-gray-500" />
          )}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-700">Восстановление</span>
              <span className="text-xs font-bold text-gray-800">{ecosystem.progress}%</span>
            </div>
            <Progress value={ecosystem.progress} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ecosystem.threats.slice(0, 3).map((threat, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-0.5 bg-white/60"
              >
                {threat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {ecosystem.progress === 100 && (
        <div className="absolute top-2 right-2">
          <Icon name="CheckCircle2" size={24} className="text-green-600" />
        </div>
      )}
    </Card>
  );
}
