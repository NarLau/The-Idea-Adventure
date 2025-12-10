import { useGame } from "~/routes/game/gameContent";


interface PlayerMoveSceneProps {
  targetScene: "home" | "town" | "forest" | "shop";
  label: string;
  type?: "door" | "sign"; 
}

export default function PlayerMoveScene({
  targetScene,
  label,
  type = "door",
}: PlayerMoveSceneProps) {
  const { setScene } = useGame();

  const handleClick = () => {
    setScene(targetScene);
  };

  return (
    <div
      className={`player-move ${type} hovernbigger cursor-pointer p-2 rounded text-center`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
