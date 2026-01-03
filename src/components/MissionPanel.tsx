import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  ecosystemId: string;
}

interface MissionPanelProps {
  missions: Mission[];
  onMissionClick: (mission: Mission) => void;
}

export default function MissionPanel({ missions, onMissionClick }: MissionPanelProps) {
  const difficultyConfig = {
    easy: { label: 'Легко', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Средне', color: 'bg-yellow-100 text-yellow-700' },
    hard: { label: 'Сложно', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Target" size={24} className="text-primary" />
        <h2 className="text-xl font-bold">Активные миссии</h2>
      </div>

      {missions.length === 0 ? (
        <Card className="p-6 text-center">
          <Icon name="CheckCircle2" size={48} className="mx-auto mb-3 text-green-500" />
          <p className="text-gray-600">Все миссии выполнены!</p>
        </Card>
      ) : (
        missions.map((mission) => (
          <Card
            key={mission.id}
            className={`p-4 transition-all duration-200 hover:shadow-md ${
              mission.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{mission.title}</h3>
                  <Badge className={difficultyConfig[mission.difficulty].color}>
                    {difficultyConfig[mission.difficulty].label}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{mission.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Coins" size={16} className="text-yellow-600" />
                  <span className="font-medium text-gray-700">+{mission.reward} очков</span>
                </div>
              </div>

              {!mission.completed ? (
                <Button
                  size="sm"
                  onClick={() => onMissionClick(mission)}
                  className="shrink-0"
                >
                  Начать
                </Button>
              ) : (
                <Icon name="CheckCircle2" size={24} className="text-green-600 shrink-0" />
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
