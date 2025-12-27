import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import { Graphin, Behaviors } from '@antv/graphin';
// import { Toolbar } from '@antv/graphin-components';
// import '@antv/graphin/dist/index.css';
// import '@antv/graphin-components/dist/index.css';

/* -------------------- 类型 -------------------- */
type LayoutType = 'force' | 'circular' | 'grid' | 'dagre' | 'concentric' | 'radial';

interface Node {
    id: string;
    label: string;
    style?: any;
    [key: string]: any;
}

interface Edge {
    source: string;
    target: string;
    label?: string;
    style?: any;
    [key: string]: any;
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

interface GraphCanvasProps {
    data: GraphData;
    layoutType: LayoutType;
    onNodeSelect: (node: Node) => void;
    onCanvasClick: () => void;
    animationEnabled?: boolean;
}

/* -------------------- 组件 -------------------- */
const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: transparent;
`;

const ZoomIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  z-index: 10;
`;

// const { DragCanvas, ZoomCanvas, DragNode, ClickSelect, BrushSelect, Hoverable } = Behaviors;

const GraphCanvas: React.FC<GraphCanvasProps> = ({
                                                     data,
                                                     layoutType,
                                                     onNodeSelect,
                                                     onCanvasClick,
                                                     // animationEnabled = true,
                                                 }) => {
    const graphinRef = useRef<any>(null);
    const [zoom, setZoom] = useState<number>(1);

    // const getLayoutConfig = () => {
    //     const configs: Record<LayoutType, any> = {
    //         force: {
    //             type: 'force',
    //             linkDistance: 100,
    //             nodeStrength: -50,
    //             edgeStrength: 0.1,
    //             gravity: 0.1,
    //             preventOverlap: true,
    //             nodeSize: 30,
    //         },
    //         circular: { type: 'circular', radius: 150 },
    //         grid: { type: 'grid', rows: 3, cols: 3 },
    //         dagre: { type: 'dagre', rankdir: 'LR', nodesep: 50, ranksep: 100 },
    //         concentric: { type: 'concentric', maxLevelDiff: 0.5, sortBy: 'degree' },
    //         radial: { type: 'radial', unitRadius: 100, maxIteration: 1000 },
    //     };
    //     return configs[layoutType] || configs.force;
    // };

    useEffect(() => {
        if (!graphinRef.current) return;
        const { graph } = graphinRef.current;

        const handleNodeClick = (e: any) => {
            const node: Node = e.item.getModel();
            onNodeSelect(node);
        };
        const handleCanvasClick = () => onCanvasClick();
        const handleZoom = () => setZoom(Number(graph.getZoom().toFixed(2)));

        graph.on('node:click', handleNodeClick);
        graph.on('canvas:click', handleCanvasClick);
        graph.on('wheel', handleZoom);

        return () => {
            graph.off('node:click', handleNodeClick);
            graph.off('canvas:click', handleCanvasClick);
            graph.off('wheel', handleZoom);
        };
    }, [onNodeSelect, onCanvasClick]);

    // const processedData = React.useMemo(() => {
    //     if (!data?.nodes) return { nodes: [], edges: [] };
    //     return {
    //         nodes: data.nodes.map((n) => ({
    //             ...n,
    //             style: {
    //                 ...n.style,
    //                 labelText: n.label,
    //                 labelFontSize: 12,
    //                 labelFill: '#ffffff',
    //                 labelFontFamily: 'Noto Sans SC',
    //             },
    //         })),
    //         edges: data.edges.map((e) => ({
    //             ...e,
    //             style: {
    //                 ...e.style,
    //                 labelText: e.label,
    //                 labelFontSize: 10,
    //                 labelFill: '#e0e0e0',
    //                 labelFontFamily: 'JetBrains Mono',
    //             },
    //         })),
    //     };
    // }, [data]);

    return (
        <GraphContainer>
            {/*<Graphin*/}
            {/*    ref={graphinRef}*/}
            {/*    data={processedData}*/}
            {/*    layout={getLayoutConfig()}*/}
            {/*    fitView*/}
            {/*    fitViewPadding={20}*/}
            {/*    minZoom={0.1}*/}
            {/*    maxZoom={10}*/}
            {/*    enabledStack*/}
            {/*    maxStep={20}*/}
            {/*>*/}
            {/*    <DragCanvas disabled={false} />*/}
            {/*    <ZoomCanvas disabled={false} enableOptimize />*/}
            {/*    <DragNode disabled={false} />*/}
            {/*    <ClickSelect disabled={false} />*/}
            {/*    <BrushSelect disabled={false} />*/}
            {/*    <Hoverable bindType="node" />*/}

            {/*    <Toolbar>*/}
            {/*        <Toolbar.Item*/}
            {/*            icon="icon-zoom-out"*/}
            {/*            text="缩小"*/}
            {/*            onClick={() => graphinRef.current?.apis.handleZoomOut()}*/}
            {/*        />*/}
            {/*        <Toolbar.Item*/}
            {/*            icon="icon-zoom-in"*/}
            {/*            text="放大"*/}
            {/*            onClick={() => graphinRef.current?.apis.handleZoomIn()}*/}
            {/*        />*/}
            {/*        <Toolbar.Item*/}
            {/*            icon="icon-fit"*/}
            {/*            text="适应"*/}
            {/*            onClick={() => graphinRef.current?.apis.handleAutoZoom()}*/}
            {/*        />*/}
            {/*        <Toolbar.Item*/}
            {/*            icon="icon-real-size"*/}
            {/*            text="实际大小"*/}
            {/*            onClick={() => graphinRef.current?.apis.handleRealZoom()}*/}
            {/*        />*/}
            {/*        <Toolbar.Item*/}
            {/*            icon="icon-fullscreen"*/}
            {/*            text="全屏"*/}
            {/*            onClick={() => graphinRef.current?.graph.getContainer().requestFullscreen()}*/}
            {/*        />*/}
            {/*    </Toolbar>*/}
            {/*</Graphin>*/}

            <ZoomIndicator>缩放: {zoom}x</ZoomIndicator>
        </GraphContainer>
    );
};

export default GraphCanvas;