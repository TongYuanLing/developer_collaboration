import React from 'react';
import styled from 'styled-components';
import { FiX, FiDownload, FiEdit3 } from 'react-icons/fi';
import {
    ActionButton,
    ActionButtons,
    CloseButton,
    NodeDetail,
    NodeHeader, NodeIcon, NodeProperties, NodeTitle,
    PanelContainer,
    PanelContent,
    PanelHeader, NodeType,
    PanelTitle, PropertyItem, PropertyKey, PropertyValue, StatItem, StatsContainer, WelcomeIcon, WelcomeMessage
} from "../../util/type.ts";

/* -------------------- 类型 -------------------- */
type NodeType = 'person' | 'company' | 'product' | string;

interface Node {
    id: string;
    label: string;
    type?: NodeType;
    icon?: string;
    properties?: Record<string, any>;
}

interface DetailPanelProps {
    isOpen: boolean;
    node: Node | null;
    onClose: () => void;
}

/* -------------------- 组件 -------------------- */
const DetailPanel: React.FC<DetailPanelProps> = ({ isOpen, node, onClose }) => {
    const getTypeColor = (type?: NodeType) => {
        const colors: Record<NodeType, string> = {
            person: '#00ff88',
            company: '#ff6b6b',
            product: '#a8a8ff',
        };
        return colors[type || ''] || 'var(--accent-blue)';
    };

    const getTypeName = (type?: NodeType) => {
        const names: Record<NodeType, string> = {
            person: '人员',
            company: '公司',
            product: '产品',
        };
        return names[type || ''] || type || '未知';
    };

    const formatPropertyKey = (key: string) => {
        const map: Record<string, string> = {
            department: '部门',
            position: '职位',
            experience: '经验',
            projects: '项目数',
            industry: '行业',
            employees: '员工数',
            founded: '成立时间',
            revenue: '营收',
            type: '类型',
            users: '用户数',
            version: '版本',
            status: '状态',
            components: '组件数',
        };
        return map[key] || key;
    };

    const handleEdit = () => alert('编辑功能开发中...');
    const handleExport = () => {
        if (!node) return;
        const json = JSON.stringify(node, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement('a'), {
            href: url,
            download: `node-${node.label}.json`,
        });
        a.click();
        URL.revokeObjectURL(url);
    };

    if (!isOpen) return null;

    return (
        <PanelContainer isOpen={isOpen}>
            <PanelHeader>
                <PanelTitle>节点详情</PanelTitle>
                <CloseButton onClick={onClose} aria-label="关闭">
                    <FiX size={20} />
                </CloseButton>
            </PanelHeader>

            <PanelContent>
                {node ? (
                    <NodeDetail>
                        <NodeHeader>
                            <NodeIcon bgColor={getTypeColor(node.type)}>{node.icon || '📊'}</NodeIcon>
                            <div>
                                <NodeTitle>{node.label}</NodeTitle>
                                <NodeType>{getTypeName(node.type)}</NodeType>
                            </div>
                        </NodeHeader>

                        <NodeProperties>
                            {node.properties &&
                                Object.entries(node.properties).map(([key, value]) => (
                                    <PropertyItem key={key}>
                                        <PropertyKey>{formatPropertyKey(key)}</PropertyKey>
                                        <PropertyValue>{value}</PropertyValue>
                                    </PropertyItem>
                                ))}
                        </NodeProperties>

                        <ActionButtons>
                            <ActionButton onClick={handleEdit}>
                                <FiEdit3 /> 编辑
                            </ActionButton>
                            <ActionButton onClick={handleExport}>
                                <FiDownload /> 导出
                            </ActionButton>
                        </ActionButtons>
                    </NodeDetail>
                ) : (
                    <WelcomeMessage>
                        <WelcomeIcon>📊</WelcomeIcon>
                        <h3>欢迎使用 GraphViz React</h3>
                        <p>点击图表中的节点查看详细信息</p>
                        <StatsContainer>
                            <StatItem>
                                <PropertyKey>版本</PropertyKey>
                                <PropertyValue>v1.0.0</PropertyValue>
                            </StatItem>
                            <StatItem>
                                <PropertyKey>引擎</PropertyKey>
                                <PropertyValue>AntV Graphin</PropertyValue>
                            </StatItem>
                            <StatItem>
                                <PropertyKey>React</PropertyKey>
                                <PropertyValue>v18.x</PropertyValue>
                            </StatItem>
                        </StatsContainer>
                    </WelcomeMessage>
                )}
            </PanelContent>
        </PanelContainer>
    );
};

export default DetailPanel;

/* -------------------- 样式（保持你的原样） -------------------- */
