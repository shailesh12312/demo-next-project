import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Layout/Header';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn()
}));

describe('Header Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockPush
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderHeader = () => {
    return render(<Header />);
  };

  it('renders dashboard heading', () => {
    renderHeader();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('heading-2');
  });

  it('renders logout button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('handles logout click correctly', () => {
    renderHeader();
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    
    fireEvent.click(logoutButton);

    expect(toast.success).toHaveBeenCalledWith('Logout successful');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('has correct header alignment class', () => {
    renderHeader();
    expect(screen.getByRole('banner')).toHaveClass('header-alignment');
  });

  it('has correct button class', () => {
    renderHeader();
    expect(screen.getByRole('button')).toHaveClass('logout-button');
  });
}); 