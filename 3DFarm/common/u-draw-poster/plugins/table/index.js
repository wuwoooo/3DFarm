export default (options) => {
    const plugin = {
        name: '__dp-table__',
        beforeMount: (dp) => {
            var _a, _b, _c;
            dp.table = {
                height: (_a = options === null || options === void 0 ? void 0 : options.height) !== null && _a !== void 0 ? _a : 0,
                padding: (_b = options === null || options === void 0 ? void 0 : options.padding) !== null && _b !== void 0 ? _b : 8,
                margin: (_c = options === null || options === void 0 ? void 0 : options.margin) !== null && _c !== void 0 ? _c : 0
            };
        },
        mounted: (dp) => {
            dp.createLayer = (afferOptions, rowList) => {
                // 当前配置(头部偏移量, 列内边距, 表单外边距)
                const height = dp.table.height;
                const margin = dp.table.margin;
                const padding = dp.table.padding;
                // 当前层宽度
                const containerWidth = dp.canvas.width - margin * 2;
                // 基本层配置
                const options = Object.assign({ background: '#fff', columnY: height || margin, self: true, line: true, lineHeight: 0, border: true }, afferOptions);
                // 基本列配置
                const baseRowOptions = {
                    text: '',
                    font: '24px sans-serif',
                    color: '#333',
                    center: false,
                    width: 0
                };
                // 累计最高的列为标准定义为层高度
                let maxRowHeight = 0;
                // 累计固定栅格列偏移量
                let columnOffsetX = margin;
                // 创建行绘制任务
                const layers = rowList.map((afferRowOptions = {}, index) => {
                    const rowOptions = Object.assign(Object.assign({}, baseRowOptions), afferRowOptions);
                    let columnX = 0; // 每列的X轴
                    let columnW = 0; // 每列的宽度
                    let fontOffsetX = 0; // 字体偏移X轴
                    let fontMaxWidth = 100; // 字体最大宽度
                    options.lineHeight = options.lineHeight || Number(rowOptions.font.replace(/[^\d.]/g, ''));
                    if (options.self) {
                        // 自适应栅格格子计算
                        columnX = containerWidth - containerWidth / (index + 1) + margin;
                        columnW = containerWidth / rowList.length;
                        if (columnX > 0 && columnX < containerWidth - columnW) {
                            columnX = columnW * index + margin;
                        }
                        fontOffsetX = rowOptions.center ? columnX + columnW / 2 : columnX + padding;
                        fontMaxWidth = columnW - padding * 3;
                    }
                    if (!options.self) {
                        // 固定栅格格子计算
                        columnW = rowOptions.width;
                        columnX = columnOffsetX;
                        fontMaxWidth = columnW - padding * 3;
                        fontOffsetX = rowOptions.center
                            ? columnOffsetX + rowOptions.width / 2
                            : columnOffsetX + padding;
                        columnOffsetX += rowOptions.width;
                    }
                    dp.ctx.font = rowOptions.font;
                    const fonts = dp.ctx.fillWarpText({
                        content: rowOptions.text,
                        maxWidth: fontMaxWidth,
                        lineHeight: options.lineHeight,
                        x: fontOffsetX,
                        y: options.columnY,
                        layer: 10,
                        draw: false
                    });
                    // 当前行的高度
                    const rowHeight = options.lineHeight * fonts.length + padding * 3;
                    // 若该列高度大于累计高度, 将累计高度替换
                    if (rowHeight > maxRowHeight) {
                        maxRowHeight = rowHeight;
                    }
                    return {
                        font: rowOptions.font,
                        center: rowOptions.center,
                        color: rowOptions.color,
                        border: options.border,
                        background: options.background,
                        lineHeight: options.lineHeight,
                        line: options.line,
                        fonts,
                        columnY: options.columnY,
                        columnX,
                        columnW,
                        columnH: maxRowHeight,
                        margin,
                        padding
                    };
                });
                // 将行绘制任务添加至绘制容器中
                dp.draw((ctx) => layers.forEach((rowOptions) => {
                    ctx.font = rowOptions.font;
                    ctx.fillStyle = rowOptions.background;
                    ctx.strokeStyle = '#333';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'left';
                    if (rowOptions.center) {
                        ctx.textAlign = 'center';
                    }
                    ctx.fillRect(rowOptions.columnX, rowOptions.columnY, rowOptions.columnW, rowOptions.columnH);
                    if (rowOptions.border) {
                        dp.ctx.strokeRect(margin, rowOptions.columnY, dp.canvas.width - margin, maxRowHeight);
                    }
                    if (rowOptions.line && rowOptions.columnX !== margin) {
                        ctx.moveTo(rowOptions.columnX, rowOptions.columnY);
                        ctx.lineTo(rowOptions.columnX, rowOptions.columnY + rowOptions.columnH);
                        ctx.stroke();
                        ctx.beginPath();
                    }
                    ctx.fillStyle = rowOptions.color;
                    rowOptions.fonts.forEach((fontInfo) => {
                        // 计算每行字体绘制y轴长度
                        // y(当前列置顶轴) + (rowOptions.columnH(当前列最高长度) / 2) - (((总列数-1) * 行高) / 2)
                        const textTotal = rowOptions.fonts.length - 1;
                        const textMiddleY = (textTotal * rowOptions.lineHeight) / 2;
                        let fontOffsetY = fontInfo.y + rowOptions.columnH / 2;
                        fontOffsetY -= textMiddleY;
                        ctx.fillText(fontInfo.text, fontInfo.x, fontOffsetY);
                    });
                }));
                if (options.columnY === 0 || options.columnY === margin) {
                    maxRowHeight += margin;
                }
                // 叠加高度
                dp.table.height += maxRowHeight;
                return maxRowHeight;
            };
        },
        created: (dp) => (dp.table.height = 0)
    };
    return plugin;
};
//# sourceMappingURL=index.js.map