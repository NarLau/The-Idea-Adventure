import PlayerMoveScene from "./PlayerMoveScene";

export default function ShopScene() {
    return (
        <div className="playerShop">
            <h1>We are in the Shop</h1>
            <PlayerMoveScene targetScene="town" label="Go to Town" type="door" />
                
        </div>
        )
}