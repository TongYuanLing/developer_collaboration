import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import {
    ClearButton, ResultLabel, ResultType,
    SearchContainer,
    SearchIcon,
    SearchInput,
    SearchResultItem,
    SearchResults
} from "../../util/type.ts";

interface Node {
    id: string;
    label: string;
    type?: string;
    properties?: Record<string, any>;
}

const SearchBar: React.FC = () => {
    const { state, actions } = useApp();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Node[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        const results = performSearch(searchQuery);
        setSearchResults(results);
        setShowResults(results.length > 0);
    }, [searchQuery, state.graphData]);

    const performSearch = (query: string): Node[] => {
        if (!state.graphData?.nodes) return [];
        const lowerQuery = query.toLowerCase();
        return state.graphData.nodes
            .filter(
                (node) =>
                    node.label.toLowerCase().includes(lowerQuery) ||
                    Object.values(node.properties ?? {})
                        .some((v) => String(v).toLowerCase().includes(lowerQuery))
            )
            .slice(0, 5);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(e.target.value);

    const handleResultClick = (node: Node) => {
        actions.setSelectedNode(node);
        if (!state.detailPanelOpen) actions.toggleDetailPanel();
        setSearchQuery('');
        setShowResults(false);
    };

    const handleClear = () => {
        setSearchQuery('');
        setShowResults(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') setShowResults(false);
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="搜索节点..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
            {searchQuery && (
                <ClearButton onClick={handleClear}>
                    <FiX size={16} />
                </ClearButton>
            )}
            <SearchIcon>
                <FiSearch size={18} />
            </SearchIcon>
            <SearchResults show={showResults}>
                {searchResults.map((node) => (
                    <SearchResultItem key={node.id} onClick={() => handleResultClick(node)}>
                        <ResultLabel>{node.label}</ResultLabel>
                        <ResultType>{node.type}</ResultType>
                    </SearchResultItem>
                ))}
            </SearchResults>
        </SearchContainer>
    );
};

export default SearchBar;