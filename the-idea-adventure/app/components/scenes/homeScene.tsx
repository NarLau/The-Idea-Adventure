import PlayerMoveScene from "./PlayerMoveScene";

export default function HomeScene() {
    return (<div className="playerHome">
        <h1>We are at Home</h1>
         <PlayerMoveScene targetScene="forest" label="Go to Forest" type="door" />
      <PlayerMoveScene targetScene="town" label="Go to Town" type="door" />
    
    </div>)
}