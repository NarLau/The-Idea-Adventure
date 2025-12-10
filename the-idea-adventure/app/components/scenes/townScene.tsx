import PlayerMoveScene from "./PlayerMoveScene";

export default function TownScene() {
    return (
    <div className="playerTown">
        <h1>We are in the Town</h1>
        <PlayerMoveScene targetScene="forest" label="Go to Forest" type="sign" />
        <PlayerMoveScene targetScene="home" label="Go Home" type="sign" />
         <PlayerMoveScene targetScene="shop" label="Go to the Shop" type="door" />
            
    </div>
    )
}