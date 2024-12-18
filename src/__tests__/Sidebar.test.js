import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/Layout/Sidebar';

describe('Sidebar Component', () => {
  const renderSidebar = () => {
    return render(<Sidebar />);
  };

  it('renders dashboard icon', () => {
    renderSidebar();
    const icon = screen.getByRole('img', { name: /dashboardicon/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/dashboard.svg');
  });

  it('renders dashboard text', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('has pointer class for clickable area', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard').parentElement).toHaveClass('pointer-class');
  });

  it('has center icon class', () => {
    renderSidebar();
    expect(screen.getByRole('img').parentElement).toHaveClass('center-icon-sidebar');
  });

  it('renders with correct structure', () => {
    const { container } = renderSidebar();
    
    // Check nested structure
    const sidebar = container.firstChild;
    const pointerDiv = sidebar.firstChild;
    const iconDiv = pointerDiv.firstChild;
    const span = pointerDiv.lastChild;

    expect(sidebar).toHaveClass('sidebar-width');
    expect(pointerDiv).toHaveClass('pointer-class');
    expect(iconDiv).toHaveClass('center-icon-sidebar');
    expect(span).toHaveTextContent('Dashboard');
  });
}); 