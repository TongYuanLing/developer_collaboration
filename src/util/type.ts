import styled from "styled-components";

export const ToolbarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ToolButton = styled.button`
  padding: 0.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: var(--accent-blue);
    color: var(--primary-bg);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: var(--glass-border);
  margin: 0 0.5rem;
`;

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: ${(p) => (p.isOpen ? '0' : '-300px')};
  top: 0;
  width: 300px;
  height: 100%;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  border-right: 1px solid var(--glass-border);
  box-shadow: var(--shadow-secondary);
  transition: left 0.3s ease;
  z-index: 50;
  overflow-y: auto;
`;

export const SidebarToggle = styled.button`
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 80px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-left: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  &:hover {
    background: var(--accent-blue);
    color: var(--primary-bg);
  }
`;

export const SidebarContent = styled.div`
  padding: 2rem 1rem;
`;

export const ControlPanel = styled.div`
  margin-bottom: 2rem;
`;

export const PanelTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--accent-blue);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ControlGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const ControlLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

// export const ControlInput = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   background: var(--glass-bg);
//   border: 1px solid var(--glass-border);
//   border-radius: 8px;
//   color: var(--text-primary);
//   font-family: 'JetBrains Mono', monospace;
//   transition: all 0.3s ease;
//   &:focus {
//     outline: none;
//     border-color: var(--accent-blue);
//     box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
//   }
// `;

export const ControlSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
  }
`;

export const ControlButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background: var(--accent-blue);
    color: var(--primary-bg);
    transform: translateY(-2px);
    box-shadow: var(--shadow-primary);
  }
  &.primary {
    background: var(--accent-blue);
    color: var(--primary-bg);
    border-color: var(--accent-blue);
    &:hover {
      background: #00b8e6;
      border-color: #00b8e6;
    }
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
`;

export const ToggleLabel = styled.label`
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
`;

export const ToggleSwitch = styled.input`
  width: 40px;
  height: 20px;
  appearance: none;
  background: var(--glass-border);
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  &:checked {
    background: var(--accent-blue);
  }
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
  }
  &:checked:before {
    transform: translateX(20px);
  }
`;

export const RangeSlider = styled.input`
  width: 100%;
  height: 6px;
  background: var(--glass-border);
  border-radius: 3px;
  outline: none;
  appearance: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--accent-blue);
    border-radius: 50%;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--accent-blue);
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const SearchInput = styled.input`
  width: 250px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  color: var(--text-primary);
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    width: 300px;
  }
  &::placeholder {
    color: var(--text-muted);
  }
`;
export const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  color: var(--text-muted);
  pointer-events: none;
  transition: all 0.3s ease;
  ${SearchInput}:focus + & {
    color: var(--accent-blue);
  }
`;
export const ClearButton = styled.button`
  position: absolute;
  right: 2.5rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  &:hover {
    background: var(--glass-bg);
    color: var(--accent-blue);
  }
`;
export const SearchResults = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  margin-top: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  display: ${props => (props.show ? 'block' : 'none')};
`;
export const SearchResultItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--glass-border);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--glass-bg);
  }
`;
export const ResultLabel = styled.div`
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;
export const ResultType = styled.div`
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
`;
export const PanelContainer = styled.div<{ isOpen: boolean }>`
  width: 350px;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  border-left: 1px solid var(--glass-border);
  box-shadow: var(--shadow-secondary);
  transition: transform 0.3s ease;
  transform: ${(p) => (p.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  position: relative;
  overflow-y: auto;
  z-index: 10;
`;

export const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  z-index: 1;
`;

// export const PanelTitle = styled.h3`
//   color: var(--accent-blue);
//   font-size: 1.1rem;
//   font-weight: 600;
// `;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover {
    background: var(--glass-bg);
    color: var(--accent-blue);
  }
`;

export const PanelContent = styled.div`
  padding: 1.5rem;
`;

export const NodeDetail = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-primary);
  }
`;

export const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const NodeIcon = styled.div<{ bgColor?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: ${(p) => p.bgColor || 'var(--accent-blue)'};
`;

export const NodeTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

export const NodeType = styled.div`
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const NodeProperties = styled.div`
  margin-top: 1rem;
`;

export const PropertyItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--glass-border);
  &:last-child {
    border-bottom: none;
  }
`;

export const PropertyKey = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

export const PropertyValue = styled.span`
  color: var(--accent-blue);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background: var(--accent-blue);
    color: var(--primary-bg);
    transform: translateY(-2px);
    box-shadow: var(--shadow-primary);
  }
`;

export const WelcomeMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

export const WelcomeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

export const StatsContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: var(--glass-bg);
  border-radius: 8px;
  border: 1px solid var(--glass-border);
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--glass-border);
  &:last-child {
    border-bottom: none;
  }
`;