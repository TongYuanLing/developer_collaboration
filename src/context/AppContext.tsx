import {createContext, type ReactNode, useContext, useReducer} from 'react';
import type { AppState, AppAction, AppActions, GraphData, Node, LayoutType, Theme } from '../util/types';

/* ---------- 初始状态 ---------- */
const initialState: AppState = {
    graphData: { nodes: [], edges: [] },
    selectedNode: null,
    sidebarOpen: false,
    detailPanelOpen: true,
    layoutType: 'force',
    theme: 'dark',
    animationEnabled: true,
    searchQuery: '',
    loading: false,
    zoomLevel: 1,
};

/* ---------- Reducer ---------- */
function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_GRAPH_DATA':
            return { ...state, graphData: action.payload, loading: false };
        case 'SET_SELECTED_NODE':
            return { ...state, selectedNode: action.payload };
        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebarOpen: !state.sidebarOpen };
        case 'TOGGLE_DETAIL_PANEL':
            return { ...state, detailPanelOpen: !state.detailPanelOpen };
        case 'SET_LAYOUT':
            return { ...state, layoutType: action.payload };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'TOGGLE_ANIMATION':
            return { ...state, animationEnabled: !state.animationEnabled };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ZOOM_LEVEL':
            return { ...state, zoomLevel: action.payload };
        case 'CLEAR_SELECTION':
            return { ...state, selectedNode: null };
        default:
            return state;
    }
}

/* ---------- Context ---------- */
interface AppContextValue {
    state: AppState;
    actions: AppActions;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

/* ---------- Provider ---------- */
interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const actions: AppActions = {
        setGraphData: (data: GraphData) => dispatch({ type: 'SET_GRAPH_DATA', payload: data }),
        setSelectedNode: (node: Node | null) => dispatch({ type: 'SET_SELECTED_NODE', payload: node }),
        toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
        toggleDetailPanel: () => dispatch({ type: 'TOGGLE_DETAIL_PANEL' }),
        setLayout: (layout: LayoutType) => dispatch({ type: 'SET_LAYOUT', payload: layout }),
        setTheme: (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme }),
        toggleAnimation: () => dispatch({ type: 'TOGGLE_ANIMATION' }),
        setSearchQuery: (query: string) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
        setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
        setZoomLevel: (zoom: number) => dispatch({ type: 'SET_ZOOM_LEVEL', payload: zoom }),
        clearSelection: () => dispatch({ type: 'CLEAR_SELECTION' }),
    };

    return <AppContext.Provider value={{ state, actions }}>{children}</AppContext.Provider>;
}

/* ---------- Hook ---------- */
export function useApp(): AppContextValue {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}