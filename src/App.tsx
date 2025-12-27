import React, { useEffect, useState } from 'react';
import './App.css'; // ① 引入纯 CSS
import { useApp } from './context/AppContext';
// import GraphCanvas from './pages/CollaborationDiagram/GraphCanvas';
import {ColGraph} from './pages/CollaborationDiagram/ColGraph.tsx';
import DetailPanel from './pages/CollaborationDiagram/DetailPanel';
import Sidebar from './pages/CollaborationDiagram/Sidebar';
import Toolbar from './pages/CollaborationDiagram/Toolbar';
import SearchBar from './pages/CollaborationDiagram/SearchBar';
import GraphCanvas from "./pages/CollaborationDiagram/GraphCanvas.tsx";

const App: React.FC = () => {
    const { state, actions } = useApp();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        actions.setLoading(true);

        const timer = setTimeout(() => {
            actions.setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);   // 清理定时器
    }, []);

    const handleNodeSelect = (node: Node) => {
        actions.setSelectedNode(node);
        if (!state.detailPanelOpen) {
            actions.toggleDetailPanel();
        }
    };

    const handleCanvasClick = () => {
        actions.clearSelection();
    };

    return (
        <div className="app-container">
            <div className="dynamic-bg" />
            <header className="app-header">
                <div className="logo">GraphViz React</div>
                <div className="header-actions">
                    <SearchBar />
                    <Toolbar />
                </div>
            </header>

            <main className="main-content">
                <Sidebar
                    isOpen={state.sidebarOpen}
                    onToggle={() => actions.toggleSidebar()}
                />

                <div className="graph-container">
                    {isMounted && (
                        // <ColGraph
                        //     idata={state.graphData}
                        //     layoutType={state.layoutType}
                        //     onNodeSelect={handleNodeSelect}
                        //     onCanvasClick={handleCanvasClick}
                        //     animationEnabled={state.animationEnabled}
                        // />
                        <GraphCanvas
                            data={state.graphData}
                            layoutType={state.layoutType}
                            onNodeSelect={handleNodeSelect}
                            onCanvasClick={handleCanvasClick}
                            animationEnabled={state.animationEnabled}
                        />
                    )}
                    {state.loading && (
                        <div className="loading-overlay">
                            <div className="loading-box">
                                <div className="loading-spinner" />
                                <div className="loading-text">正在加载图表...</div>
                            </div>
                        </div>
                    )}
                </div>

                <DetailPanel
                    isOpen={state.detailPanelOpen}
                    node={state.selectedNode}
                    onClose={() => actions.toggleDetailPanel()}
                />
            </main>
        </div>
    );
};

export default App;