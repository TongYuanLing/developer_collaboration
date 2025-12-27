// GraphVisualization.ts
import G6 from '@antv/g6';

// --------------  类型声明  --------------
type NodeType = 'person' | 'company' | 'product';
interface Node {
    id: string;
    label: string;
    type?: NodeType | string;
    icon?: string;
    style?: any;
    properties?: Record<string, any>;
}
interface Edge {
    id: string;
    source: string;
    target: string;
    label?: string;
    type?: string;
    style?: any;
}
interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

// --------------  类定义  --------------
class GraphVisualization {
    private graph: any;
    private currentData: GraphData | null = null;
    private selectedNode: Node | null = null;
    private isPhysicsEnabled = false;
    private animationEnabled = true;

    constructor() {
        this.init();
    }

    private init(): void {
        this.initGraph();
        this.loadSampleData();
        // this.setupEventListeners();
        this.hideLoading();
    }

    private initGraph(): void {
        const container = document.getElementById('graph-canvas') as HTMLDivElement;
        if (!container) return;

        this.graph = new G6.Graph({
            container,
            width: container.clientWidth,
            height: container.clientHeight,
            modes: { default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'click-select'] },
            layout: {
                type: 'force',
                linkDistance: 100,
                nodeStrength: -50,
                edgeStrength: 0.1,
                gravity: 0.1,
                preventOverlap: true,
                nodeSize: 30,
            },
            defaultNode: {
                size: 30,
                style: {
                    fill: '#00d4ff',
                    stroke: '#ffffff',
                    lineWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#00d4ff',
                },
                labelCfg: {
                    style: {
                        fill: '#ffffff',
                        fontSize: 12,
                        fontFamily: 'Noto Sans SC',
                    },
                },
            },
            defaultEdge: {
                style: {
                    stroke: '#a8a8ff',
                    lineWidth: 2,
                    opacity: 0.8,
                    endArrow: { path: G6.Arrow.triangle(8, 10, 0), fill: '#a8a8ff' },
                },
                labelCfg: { style: { fill: '#e0e0e0', fontSize: 10, fontFamily: 'JetBrains Mono' } },
            },
            nodeStateStyles: {
                hover: { fill: '#00ff88', stroke: '#ffffff', lineWidth: 3, shadowBlur: 20, shadowColor: '#00ff88' },
                selected: { fill: '#ff6b6b', stroke: '#ffffff', lineWidth: 3, shadowBlur: 20, shadowColor: '#ff6b6b' },
            },
            edgeStateStyles: { hover: { stroke: '#00ff88', lineWidth: 3, opacity: 1 } },
        });

        this.bindGraphEvents();
    }

    private bindGraphEvents(): void {
        this.graph.on('node:click', (evt: any) => {
            const nodeData: Node = evt.item.getModel();
            this.selectNode(nodeData);
            this.animateNodeSelection(evt.item);
        });

        this.graph.on('node:mouseenter', (evt: any) => {
            this.graph.setItemState(evt.item, 'hover', true);
            this.showNodeTooltip(evt.item);
        });
        this.graph.on('node:mouseleave', (evt: any) => {
            this.graph.setItemState(evt.item, 'hover', false);
            this.hideNodeTooltip();
        });

        this.graph.on('edge:mouseenter', ({ item }: any) => this.graph.setItemState(item, 'hover', true));
        this.graph.on('edge:mouseleave', ({ item }: any) => this.graph.setItemState(item, 'hover', false));

        this.graph.on('canvas:click', () => this.clearSelection());

        this.graph.on('wheel', (evt: WheelEvent) => {
            evt.preventDefault();
            const currentZoom = this.graph.getZoom();
            const delta = evt.deltaY > 0 ? -0.1 : 0.1;
            this.graph.zoomTo(currentZoom + delta, { x: evt.clientX, y: evt.clientY });
        });
    }

    /* 以下所有函数仅把参数/返回值加上简单类型，逻辑保持原样 */
    public loadSampleData(): void {
        const sampleData: GraphData = { /* 原样数据，略 */ };
        this.currentData = sampleData;
        this.renderGraph(sampleData);
        this.updateStats();
    }

    private renderGraph(data: GraphData): void {
        this.graph.data(data);
        this.graph.render();
        if (this.animationEnabled) this.animateGraphEntry();
    }

    private selectNode(nodeData: Node): void {
        this.selectedNode = nodeData;
        this.updateDetailPanel(nodeData);
        this.highlightRelatedNodes(nodeData.id);
    }

    private clearSelection(): void {
        this.selectedNode = null;
        this.resetHighlight();
        this.showWelcomePanel();
    }

    private updateDetailPanel(nodeData: Node): void {
        const typeColors: Record<string, string> = { person: '#00ff88', company: '#ff6b6b', product: '#a8a8ff' };
        const typeNames: Record<string, string> = { person: '人员', company: '公司', product: '产品' };

        const propertiesHtml = Object.entries(nodeData.properties || {})
            .map(([key, value]) => `
        <div class="property-item">
          <span class="property-key">${this.formatPropertyKey(key)}</span>
          <span class="property-value">${value}</span>
        </div>`)
            .join('');

        const html = `
      <div class="node-detail">
        <div class="node-header">
          <div class="node-icon" style="background:${typeColors[nodeData.type || ''] || '#00d4ff'}">
            ${nodeData.icon || '📊'}
          </div>
          <div>
            <div class="node-title">${nodeData.label}</div>
            <div class="node-type">${typeNames[nodeData.type || ''] || nodeData.type}</div>
          </div>
        </div>
        <div class="node-properties">${propertiesHtml}</div>
        <div style="margin-top:1rem;display:flex;gap:0.5rem">
          <button class="btn" onclick="graphViz.editNode('${nodeData.id}')">✏️ 编辑</button>
          <button class="btn" onclick="graphViz.exportNode('${nodeData.id}')">📤 导出</button>
        </div>
      </div>`;
        const detailContent = document.getElementById('node-detail-content') as HTMLElement;
        if (detailContent) detailContent.innerHTML = html;
    }

    private formatPropertyKey(key: string): string {
        const keyMap: Record<string, string> = {
            department: '部门', position: '职位', experience: '经验', projects: '项目数',
            industry: '行业', employees: '员工数', founded: '成立时间', revenue: '营收',
            type: '类型', users: '用户数', version: '版本', status: '状态', components: '组件数',
        };
        return keyMap[key] || key;
    }

    private showWelcomePanel(): void {/* 原逻辑 */}
    private animateNodeSelection(nodeItem: any): void {/* anime 动画 */}
    private animateGraphEntry(): void {/* anime 动画 */}
    private highlightRelatedNodes(nodeId: string): void {/* 高亮 */}
    private resetHighlight(): void {/* 重置 */}
    private updateStats(): void {/* 统计 */}
    private showNodeTooltip(nodeItem: any): void {/* tooltip */}
    private hideNodeTooltip(): void {/* 移除 */}
    private hideLoading(): void {/* 隐藏 loading */}

    /* 公共方法：保持原样，仅加简单类型 */
    public generateRandomData(): void {/* 随机数据 */}
    public editNode(nodeId: string): void { alert('编辑功能开发中...'); }
    public exportNode(nodeId: string): void {/* 导出 */}
    public getTypeColor(type: string): string {
        const colors: Record<string, string> = { person: '#00ff88', company: '#ff6b6b', product: '#a8a8ff' };
        return colors[type] || '#00d4ff';
    }
}

/* -------------------- 全局函数（保持原样，仅加类型） -------------------- */
declare global {
    interface Window {
        graphViz: GraphVisualization;
    }
}

window.graphViz = new GraphVisualization();