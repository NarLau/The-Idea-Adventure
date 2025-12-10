import PlayerMoveScene from "./PlayerMoveScene";


export default function ForestScene() {
    return (<div className="playerForest">
            <h1>We are in the Forest</h1>
             <PlayerMoveScene targetScene="home" label="Go home" type="sign" />
          <PlayerMoveScene targetScene="town" label="Go to Town" type="sign" />
        
        </div>)
}