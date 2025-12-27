import React from 'react';
import {
    FiZoomIn,
    FiZoomOut,
    FiMaximize,
    FiDownload,
    FiRefreshCw,
    FiSidebar,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { ToolbarContainer, ToolButton, Divider } from '../../util/type.ts';

/* -------------------- 组件 -------------------- */
const Toolbar: React.FC = () => {
    const { state, actions } = useApp();

    const handleZoomIn = () => {
        console.log('Zoom in');
    };

    const handleZoomOut = () => {
        console.log('Zoom out');
    };

    const handleFitView = () => {
        console.log('Fit view');
    };

    const handleReset = () => {
        console.log('Reset view');
    };

    const handleExport = () => {
        if (!state.graphData) return;
        const dataStr = JSON.stringify(state.graphData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = Object.assign(document.createElement('a'), {
            href: url,
            download: 'graph-data.json',
        });
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleScreenshot = () => {
        alert('截图功能开发中...');
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <ToolbarContainer>
            <ToolButton onClick={handleZoomIn} title="放大">
                <FiZoomIn size={18} />
            </ToolButton>
            <ToolButton onClick={handleZoomOut} title="缩小">
                <FiZoomOut size={18} />
            </ToolButton>
            <ToolButton onClick={handleFitView} title="适应窗口">
                <FiMaximize size={18} />
            </ToolButton>

            <Divider />

            <ToolButton onClick={handleReset} title="重置视图">
                <FiRefreshCw size={18} />
            </ToolButton>
            <ToolButton onClick={actions.toggleSidebar} title="侧边栏">
                <FiSidebar size={18} />
            </ToolButton>

            <Divider />

            <ToolButton onClick={handleExport} title="导出数据">
                <FiDownload size={18} />
            </ToolButton>
            <ToolButton onClick={handleScreenshot} title="截图">
                {state.detailPanelOpen ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </ToolButton>
            <ToolButton onClick={handleFullscreen} title="全屏">
                <FiMaximize size={18} />
            </ToolButton>
        </ToolbarContainer>
    );
};

export default Toolbar;