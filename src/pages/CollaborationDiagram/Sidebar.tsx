import React, { useState} from 'react';
import { FiMenu, FiX, FiUpload, FiDownload, FiSettings, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import {
    ControlButton,
    ControlGroup,
    ControlLabel, ControlPanel, ControlSelect, FileInput,
    PanelTitle, RangeSlider,
    SidebarContainer,
    SidebarContent,
    SidebarToggle, ToggleContainer, ToggleLabel, ToggleSwitch
} from '../../util/type.ts';

/* -------------------- 类型 -------------------- */
type LayoutType = 'force' | 'circular' | 'grid' | 'dagre' | 'concentric' | 'radial';
type Theme = 'dark' | 'blue' | 'green';
type NodeType = 'person' | 'company' | 'product';

interface Node {
    id: string;
    label: string;
    type?: NodeType | string;
    icon?: string;
    properties?: Record<string, any>;
    style?: any;
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

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

function generateRandomGraphData(): GraphData {
    const nodeTypes: NodeType[] = ['person', 'company', 'product'];
    const nodeIcons = ['👨‍💼', '👩‍💻', '🏢', '🛒', '📊', '🎨', '🔍', '🎯'];
    const nodeNames = [
        '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
        '科技公司', '设计工作室', '咨询机构', '开发团队',
        '电商平台', '移动应用', '数据分析工具', '设计系统',
    ];

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const nodeCount = Math.floor(Math.random() * 10) + 5;

    for (let i = 0; i < nodeCount; i++) {
        const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        const name = nodeNames[Math.floor(Math.random() * nodeNames.length)];
        const icon = nodeIcons[Math.floor(Math.random() * nodeIcons.length)];

        nodes.push({
            id: `random-node-${i}`,
            label: name,
            type,
            icon,
            properties: generateRandomProperties(type),
            style: { fill: getTypeColor(type), size: 30 },
        });
    }

    const edgeCount = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < edgeCount; i++) {
        const source = nodes[Math.floor(Math.random() * nodes.length)].id;
        const target = nodes[Math.floor(Math.random() * nodes.length)].id;
        if (source === target) continue;
        edges.push({
            id: `random-edge-${i}`,
            source,
            target,
            label: generateRandomRelationship(),
            type: 'random',
            style: { stroke: '#a8a8ff', lineWidth: 2 },
        });
    }

    return { nodes, edges };
}

function generateRandomProperties(type: NodeType): Record<string, any> {
    const props: Record<string, any> = {};
    switch (type) {
        case 'person':
            props.department = ['技术部', '设计部', '产品部', '市场部'][Math.floor(Math.random() * 4)];
            props.position = ['工程师', '经理', '设计师', '专员'][Math.floor(Math.random() * 4)];
            props.experience = `${Math.floor(Math.random() * 10) + 1}年`;
            props.projects = Math.floor(Math.random() * 15) + 1;
            break;
        case 'company':
            props.industry = ['科技', '金融', '教育', '医疗'][Math.floor(Math.random() * 4)];
            props.employees = Math.floor(Math.random() * 500) + 50;
            props.founded = `${2010 + Math.floor(Math.random() * 13)}年`;
            props.revenue = `${Math.floor(Math.random() * 10000) + 1000}万`;
            break;
        case 'product':
            props.type = ['Web应用', '移动应用', '桌面软件', '云服务'][Math.floor(Math.random() * 4)];
            props.users = Math.floor(Math.random() * 50000) + 1000;
            props.version = `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
            props.status = ['运行中', '开发中', '测试中', '维护中'][Math.floor(Math.random() * 4)];
            break;
    }
    return props;
}

function generateRandomRelationship(): string {
    const relationships = ['管理', '协作', '开发', '测试', '设计', '领导', '支持', '依赖'];
    return relationships[Math.floor(Math.random() * relationships.length)];
}

function getTypeColor(type: NodeType): string {
    const colors: Record<NodeType, string> = {
        person: '#00ff88',
        company: '#ff6b6b',
        product: '#a8a8ff',
    };
    return colors[type] || '#00d4ff';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
    const { state, actions } = useApp();
    const [nodeSize, setNodeSize] = useState<number>(30);

    const handleFileImport = (e: any) => {
        const file = e.target.files?.[0];
        if (!file || file.type !== 'application/json') return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target?.result as string) as GraphData;
                if (data.nodes && data.edges) actions.setGraphData(data);
                else alert('JSON文件格式不正确，需要包含nodes和edges数组');
            } catch (err) {
                alert('JSON文件解析失败：' + (err as Error).message);
            }
        };
        reader.readAsText(file);
    };

    const generateRandomData = () => {
        const randomData = generateRandomGraphData();
        actions.setGraphData(randomData);
    };

    const exportGraph = () => {
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

    const screenshot = () => alert('截图功能开发中...');
    const resetView = () => alert('重置视图功能开发中...');

    return (
        <SidebarContainer isOpen={isOpen}>
            <SidebarToggle onClick={onToggle}>{isOpen ? <FiX size={20} /> : <FiMenu size={20} />}</SidebarToggle>
            <SidebarContent>
                {/* 数据管理 */}
                <ControlPanel>
                    <PanelTitle><FiUpload /> 数据管理</PanelTitle>
                    <ControlGroup>
                        <ControlLabel>导入JSON数据</ControlLabel>
                        <FileInput id="json-file" type="file" accept=".json" onChange={handleFileImport} />
                        <ControlButton onClick={() => document.getElementById('json-file')!.click()}><FiUpload /> 选择文件</ControlButton>
                    </ControlGroup>
                    <ControlGroup>
                        <ControlLabel>生成示例数据</ControlLabel>
                        <ControlButton onClick={generateRandomData}><FiRefreshCw /> 随机生成</ControlButton>
                    </ControlGroup>
                    <ControlGroup>
                        <ControlLabel>导出数据</ControlLabel>
                        <ControlButton onClick={exportGraph}><FiDownload /> 导出JSON</ControlButton>
                    </ControlGroup>
                </ControlPanel>

                {/* 布局控制 */}
                <ControlPanel>
                    <PanelTitle><FiSettings /> 布局控制</PanelTitle>
                    <ControlGroup>
                        <ControlLabel>布局类型</ControlLabel>
                        <ControlSelect value={state.layoutType} onChange={(e) => actions.setLayout(e.target.value as LayoutType)}>
                            <option value="force">力导向布局</option>
                            <option value="circular">圆形布局</option>
                            <option value="grid">网格布局</option>
                            <option value="dagre">层次布局</option>
                            <option value="concentric">同心圆布局</option>
                            <option value="radial">放射状布局</option>
                        </ControlSelect>
                    </ControlGroup>
                    <ControlGroup>
                        <ControlLabel>节点大小: {nodeSize}px</ControlLabel>
                        <RangeSlider type="range" min="10" max="50" value={nodeSize} onChange={(e) => setNodeSize(Number(e.target.value))} />
                    </ControlGroup>
                </ControlPanel>

                {/* 视觉设置 */}
                <ControlPanel>
                    <PanelTitle><FiSettings /> 视觉设置</PanelTitle>
                    <ToggleContainer>
                        <ToggleLabel>启用动画</ToggleLabel>
                        <ToggleSwitch type="checkbox" checked={state.animationEnabled} onChange={actions.toggleAnimation} />
                    </ToggleContainer>
                    <ControlGroup>
                        <ControlLabel>主题色彩</ControlLabel>
                        <ControlSelect value={state.theme} onChange={(e) => actions.setTheme(e.target.value as Theme)}>
                            <option value="dark">深色主题</option>
                            <option value="blue">蓝色主题</option>
                            <option value="green">绿色主题</option>
                        </ControlSelect>
                    </ControlGroup>
                </ControlPanel>

                {/* 工具功能 */}
                <ControlPanel>
                    <PanelTitle><FiSettings /> 工具功能</PanelTitle>
                    <ControlGroup>
                        <ControlButton onClick={screenshot}><FiSearch /> 截图保存</ControlButton>
                    </ControlGroup>
                    <ControlGroup>
                        <ControlButton onClick={resetView}><FiRefreshCw /> 重置视图</ControlButton>
                    </ControlGroup>
                </ControlPanel>
            </SidebarContent>
        </SidebarContainer>
    );
};

export default Sidebar;