import starBattleEngine from "../../star_battle/engine";

export default function StarBattle() {
  return (
    <>
      <canvas
        ref={(ref) => starBattleEngine(ref as HTMLCanvasElement)}
        id="star_battle_canvas"
        width="800"
        height="800"
      ></canvas>
    </>
  );
}
