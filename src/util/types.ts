// 节点、边、图数据
export interface Node {
    id: string;
    label: string;
    group?: string;
    [key: string]: any;
}
export interface Edge {
    source: string;
    target: string;
    label?: string;
    [key: string]: any;
}
export interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

// 主题、布局
export type Theme = 'dark' | 'light';
export type LayoutType = 'force' | 'circular' | 'grid' | 'dagre';

// 全局状态
export interface AppState {
    graphData: GraphData;
    selectedNode: Node | null;
    sidebarOpen: boolean;
    detailPanelOpen: boolean;
    layoutType: LayoutType;
    theme: Theme;
    animationEnabled: boolean;
    searchQuery: string;
    loading: boolean;
    zoomLevel: number;
}

// 所有 Action 的 payload 映射
export type AppAction =
    | { type: 'SET_GRAPH_DATA'; payload: GraphData }
    | { type: 'SET_SELECTED_NODE'; payload: Node | null }
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'TOGGLE_DETAIL_PANEL' }
    | { type: 'SET_LAYOUT'; payload: LayoutType }
    | { type: 'SET_THEME'; payload: Theme }
    | { type: 'TOGGLE_ANIMATION' }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ZOOM_LEVEL'; payload: number }
    | { type: 'CLEAR_SELECTION' };

// actions 对象的方法签名
export interface AppActions {
    setGraphData: (data: GraphData) => void;
    setSelectedNode: (node: Node | null) => void;
    toggleSidebar: () => void;
    toggleDetailPanel: () => void;
    setLayout: (layout: LayoutType) => void;
    setTheme: (theme: Theme) => void;
    toggleAnimation: () => void;
    setSearchQuery: (query: string) => void;
    setLoading: (loading: boolean) => void;
    setZoomLevel: (zoom: number) => void;
    clearSelection: () => void;
}