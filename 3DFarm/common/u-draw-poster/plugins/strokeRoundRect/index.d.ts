import { DrawPosterPlugin } from '../../core/plugin';
declare module '../../core/typed' {
    interface CanvasCtx {
        /** 绘制圆角矩形（边框）
         *
         * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
         */
        strokeRoundRect(x: number, y: number, w: number, h: number, r: number): void;
    }
}
declare const _default: () => DrawPosterPlugin;
export default _default;
