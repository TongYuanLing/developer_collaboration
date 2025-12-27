import { Graph } from '@antv/g6';
import {useEffect, useRef, useState} from 'react';
import {createLine} from "../../api/function_graph.ts";

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

export function ColGraph({
                             idata,
                             layoutType,
                             onNodeSelect,
                             onCanvasClick,
                             animationEnabled = true,
                         }){
    const containerRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState({ nodes: [], edges: [] });
    useEffect(() => {
        createLine() //  public 下的文件直接 / 开头
            .then(data => {
                console.log(data);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setData(data)
            })
            .catch(err => console.error('解析失败：', err));
    }, []);
    useEffect(() => {
        if (!data.nodes.length) return;
        const graph = new Graph({
            container: containerRef.current!,
            width: 1700,
            height: 850,
            autoResize: true,
            // 视口配置
            zoom: 0.8,
            autoFit: {
                type: 'center', // 自适应类型：'view' 或 'center'
                options: {
                    // 仅适用于 'view' 类型
                    when: 'overflow', // 何时适配：'overflow'(仅当内容溢出时) 或 'always'(总是适配)
                    direction: 'both', // 适配方向：'x'、'y' 或 'both'
                },
                animation: {
                    // 自适应动画效果
                    duration: 1000, // 动画持续时间(毫秒)
                    easing: 'ease-in-out', // 动画缓动函数
                },
            },
            padding: 20,

            // 主题配置
            theme: 'dark',

            node: {
                type: "circle",
                style: {
                    fill: '#7FFFD4',
                    stroke: '#5CACEE',
                    lineWidth: 2,
                    // labelText: (d) => d.data?.username
                },
                state: {
                    hover: {
                        lineWidth: 2,
                        stroke: '#69c0ff',
                    },
                    selected: {
                        fill: '#bae7ff',
                        stroke: '#1890ff',
                        lineWidth: 2,
                    },
                },
                // states: ["selected"],
                // combo: null
            },

            // 边配置
            edge: {
                style: {
                    stroke: '#A4D3EE',
                    lineWidth: 1.5,
                    endArrow: true,
                },
            },

            // 布局配置
            layout: {
                type: 'force',
                preventOverlap: true,
                linkDistance: 100,
            },

            // mousewheel: {
            //     enabled: true,
            //     modifiers: ['ctrl', 'meta'],
            //     factor: 1.2,
            //     minScale: 0.5,
            //     maxScale: 2,
            // },

            // 交互行为
            behaviors: [
                'drag-canvas',
                // { type: 'drag-canvas', enableOptimize: true, direction: 'both', trigger: 'shift' },
                'zoom-canvas', 'drag-element'],

            data: {
                nodes: [
                    { id: 'node1', data: { label: '节点1' } },
                    { id: 'node2', data: { label: '节点2' } },
                ],
                edges: [{ source: 'node1', target: 'node2', data: { label: '关系' } }],
            },
            // data: data,
        });

        graph.on('node:click', (evt) => {
            // graph.getNodes().forEach(n => {
            //     if (!keepIds.has(n.getID())) graph.removeItem(n);
            // });
            // graph.changeData(data);
            console.log('node:click', evt);
        });

        graph.render();

        return () => {
            graph.destroy();   // 必须d
        };
    }, [data]);

    return <div ref={containerRef} />;
}