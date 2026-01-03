import { useState } from 'react';
import EcosystemCard, { Ecosystem } from '@/components/EcosystemCard';
import MissionPanel, { Mission } from '@/components/MissionPanel';
import PlayerStats, { PlayerStatsData } from '@/components/PlayerStats';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const initialEcosystems: Ecosystem[] = [
  {
    id: 'forest',
    name: 'Лес',
    icon: '🌲',
    color: 'hsl(var(--eco-forest))',
    progress: 45,
    threats: ['Вырубка', 'Загрязнение', 'Пожары'],
    unlocked: true,
    description: 'Густые леса с богатой фауной',
  },
  {
    id: 'ocean',
    name: 'Океан',
    icon: '🌊',
    color: 'hsl(var(--eco-ocean))',
    progress: 30,
    threats: ['Пластик', 'Нефть', 'Браконьерство'],
    unlocked: true,
    description: 'Глубины мирового океана',
  },
  {
    id: 'mountain',
    name: 'Горы',
    icon: '⛰️',
    color: 'hsl(var(--eco-mountain))',
    progress: 15,
    threats: ['Эрозия', 'Климат', 'Туризм'],
    unlocked: true,
    description: 'Высокогорные экосистемы',
  },
  {
    id: 'desert',
    name: 'Пустыня',
    icon: '🏜️',
    color: 'hsl(var(--eco-desert))',
    progress: 0,
    threats: ['Опустынивание', 'Засуха', 'Ветровая эрозия'],
    unlocked: false,
    description: 'Засушливые регионы планеты',
  },
  {
    id: 'tundra',
    name: 'Тундра',
    icon: '🧊',
    color: 'hsl(var(--eco-tundra))',
    progress: 0,
    threats: ['Таяние льдов', 'Вечная мерзлота', 'Климат'],
    unlocked: false,
    description: 'Арктические территории',
  },
  {
    id: 'savanna',
    name: 'Саванна',
    icon: '🦁',
    color: 'hsl(var(--eco-savanna))',
    progress: 0,
    threats: ['Браконьерство', 'Засуха', 'Выпас скота'],
    unlocked: false,
    description: 'Африканские равнины',
  },
];

const initialMissions: Mission[] = [
  {
    id: 'm1',
    title: 'Очистить лесной массив',
    description: 'Удалите мусор и восстановите 10 гектаров леса',
    reward: 150,
    difficulty: 'easy',
    completed: false,
    ecosystemId: 'forest',
  },
  {
    id: 'm2',
    title: 'Спасти коралловый риф',
    description: 'Очистите океан от пластика в прибрежной зоне',
    reward: 300,
    difficulty: 'medium',
    completed: false,
    ecosystemId: 'ocean',
  },
  {
    id: 'm3',
    title: 'Восстановить горные склоны',
    description: 'Укрепите почву и высадите растительность на склонах',
    reward: 450,
    difficulty: 'hard',
    completed: false,
    ecosystemId: 'mountain',
  },
];

export default function Index() {
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>(initialEcosystems);
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [selectedEcosystem, setSelectedEcosystem] = useState<Ecosystem | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStatsData>({
    level: 5,
    experience: 1250,
    maxExperience: 2000,
    coins: 3450,
    ecosystemsRestored: 0,
    totalMissions: 0,
  });

  const handleEcosystemClick = (ecosystem: Ecosystem) => {
    if (!ecosystem.unlocked) {
      toast.error('Экосистема заблокирована', {
        description: 'Завершите предыдущие миссии для разблокировки',
      });
      return;
    }
    setSelectedEcosystem(ecosystem);
  };

  const handleMissionStart = (mission: Mission) => {
    toast.success('Миссия начата!', {
      description: `Вы начали миссию: ${mission.title}`,
    });

    setTimeout(() => {
      setMissions((prev) =>
        prev.map((m) => (m.id === mission.id ? { ...m, completed: true } : m))
      );

      setEcosystems((prev) =>
        prev.map((eco) =>
          eco.id === mission.ecosystemId
            ? { ...eco, progress: Math.min(100, eco.progress + 15) }
            : eco
        )
      );

      setPlayerStats((prev) => ({
        ...prev,
        coins: prev.coins + mission.reward,
        experience: prev.experience + mission.reward,
        totalMissions: prev.totalMissions + 1,
      }));

      toast.success('Миссия выполнена!', {
        description: `Получено +${mission.reward} очков опыта`,
      });
    }, 2000);
  };

  const ecosystemMissions = selectedEcosystem
    ? missions.filter((m) => m.ecosystemId === selectedEcosystem.id)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/10">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">EcoQuest</h1>
          <p className="text-gray-600">Восстанови планету, спаси экосистемы</p>
        </header>

        <PlayerStats stats={playerStats} />

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">
              <Icon name="Map" size={18} className="mr-2" />
              Карта миров
            </TabsTrigger>
            <TabsTrigger value="missions">
              <Icon name="Target" size={18} className="mr-2" />
              Миссии
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecosystems.map((ecosystem) => (
                <EcosystemCard
                  key={ecosystem.id}
                  ecosystem={ecosystem}
                  onClick={() => handleEcosystemClick(ecosystem)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="missions" className="mt-6">
            <MissionPanel missions={missions} onMissionClick={handleMissionStart} />
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedEcosystem} onOpenChange={() => setSelectedEcosystem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl">{selectedEcosystem?.icon}</span>
                {selectedEcosystem?.name}
              </DialogTitle>
              <DialogDescription>{selectedEcosystem?.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Прогресс восстановления</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                      style={{ width: `${selectedEcosystem?.progress}%` }}
                    />
                  </div>
                  <span className="font-bold text-gray-800">{selectedEcosystem?.progress}%</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Экологические угрозы</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEcosystem?.threats.map((threat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg"
                    >
                      <Icon name="AlertTriangle" size={16} />
                      <span className="text-sm font-medium">{threat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Доступные миссии</h4>
                {ecosystemMissions.length > 0 ? (
                  <div className="space-y-2">
                    {ecosystemMissions.map((mission) => (
                      <div
                        key={mission.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{mission.title}</p>
                          <p className="text-sm text-gray-600">{mission.description}</p>
                        </div>
                        {!mission.completed && (
                          <Button size="sm" onClick={() => handleMissionStart(mission)}>
                            Начать
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">Нет доступных миссий</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
