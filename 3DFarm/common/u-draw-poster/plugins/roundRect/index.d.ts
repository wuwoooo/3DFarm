import { DrawPosterPlugin } from '../../core/plugin';
declare module '../../core/typed' {
    interface CanvasCtx {
        /**
         * 绘制圆角矩形（原型）
         */
        roundRect(x: number, y: number, w: number, h: number, r: number, fill?: boolean, stroke?: boolean): void;
    }
}
declare const _default: () => DrawPosterPlugin;
export default _default;
