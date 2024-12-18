import { render, screen } from '@testing-library/react';
import CustomizedTables from '@/components/Dashboard/CustomizedTable';
import { ReduxProvider } from "@/components/Provider";

const mockUsersData = [
  {
    id: 1,
    firstName: "John",
    phone: "1234567890",
    gender: "male",
    email: "john@example.com",
    role: "admin",
    university: "MIT"
  },
  {
    id: 2,
    firstName: "Jane",
    phone: "0987654321",
    gender: "female",
    email: "jane@example.com",
    role: "user",
    university: "Harvard"
  }
];

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: () => mockUsersData
}));

describe('CustomizedTables', () => {
  const renderCustomizedTable = () => {
    return render(
      <ReduxProvider>
        <CustomizedTables />
      </ReduxProvider>
    );
  };

  it('renders table with correct headers', () => {
    renderCustomizedTable();
    
    const expectedHeaders = [
      'Id #',
      'Customer name',
      'Contact number',
      'Gender',
      'Email',
      'Role',
      'University'
    ];

    expectedHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders user data correctly', () => {
    renderCustomizedTable();

    mockUsersData.forEach(user => {
      expect(screen.getByText(user.id)).toBeInTheDocument();
      expect(screen.getByText(user.firstName)).toBeInTheDocument();
      expect(screen.getByText(user.phone)).toBeInTheDocument();
      expect(screen.getByText(user.gender)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.role)).toBeInTheDocument();
      expect(screen.getByText(user.university)).toBeInTheDocument();
    });
  });

  it('renders table with correct className', () => {
    renderCustomizedTable();
    const tableContainer = screen.getByRole('table').parentElement;
    expect(tableContainer).toHaveClass('table-design');
  });

  it('renders correct number of rows', () => {
    renderCustomizedTable();
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockUsersData.length + 1);
  });

  describe('when users data is empty', () => {
    beforeEach(() => {
      jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue([]);
    });

    it('renders table with only headers', () => {
      renderCustomizedTable();
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(1);
    });
  });

  describe('when users data is null', () => {
    beforeEach(() => {
      jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(null);
    });

    it('renders table with only headers', () => {
      renderCustomizedTable();
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(1);
    });
  });

  it('dispatches getUsers action on mount', () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);
    
    renderCustomizedTable();
    expect(mockDispatch).toHaveBeenCalled();
  });
}); 