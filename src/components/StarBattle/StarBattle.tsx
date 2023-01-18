import { useEffect, useState } from 'react';
import starBattleEngine from '../../star_battle/engine';
import styles from './style.module.css';

export default function StarBattle() {
  return (
    <>
      <canvas
        ref={(ref) => starBattleEngine(ref as HTMLCanvasElement)}
        id='star_battle_canvas'
        className={styles.starBattleCanvas}
        width={400}
        height={400}></canvas>
    </>
  );
}
