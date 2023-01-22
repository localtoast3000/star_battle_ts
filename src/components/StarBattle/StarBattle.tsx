import starBattleEngine from '../../star_battle/engine';
import styles from './style.module.css';

export default function StarBattle() {
  return (
    <div className={styles.canvasContainer}>
      <canvas
        ref={(ref: HTMLCanvasElement) => starBattleEngine(ref)}
        id='star_battle_canvas'
        className={styles.starBattleCanvas}></canvas>
    </div>
  );
}
