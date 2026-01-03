import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface PlayerStatsData {
  level: number;
  experience: number;
  maxExperience: number;
  coins: number;
  ecosystemsRestored: number;
  totalMissions: number;
}

interface PlayerStatsProps {
  stats: PlayerStatsData;
}

export default function PlayerStats({ stats }: PlayerStatsProps) {
  const experiencePercent = (stats.experience / stats.maxExperience) * 100;

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">{stats.level}</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Эколог</h3>
            <p className="text-xs text-gray-600">Уровень {stats.level}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full">
          <Icon name="Coins" size={18} className="text-yellow-600" />
          <span className="font-bold text-gray-800">{stats.coins}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-gray-700">Опыт</span>
          <span className="text-xs text-gray-600">
            {stats.experience} / {stats.maxExperience}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${experiencePercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/60 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Leaf" size={16} className="text-green-600" />
            <span className="text-xs text-gray-600">Восстановлено</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{stats.ecosystemsRestored}</p>
        </div>

        <div className="bg-white/60 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Target" size={16} className="text-blue-600" />
            <span className="text-xs text-gray-600">Миссий</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{stats.totalMissions}</p>
        </div>
      </div>
    </Card>
  );
}
