import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import LoginForm from '@/components/LoginForm';
import {ReduxProvider} from "@/components/Provider";

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

describe('LoginForm', () => {
  const renderLoginForm = () => {
    return render(
      <ReduxProvider>
        <LoginForm/>
      </ReduxProvider>
    );
  };

  it('renders all form elements', () => {
    renderLoginForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid email', async () => {
    renderLoginForm();
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', {name: /sign in/i});

    fireEvent.change(emailInput, {target: {value: 'invalid-email'}});
    fireEvent.click(submitButton);

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows validation errors for short password', async () => {
    renderLoginForm();
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', {name: /sign in/i});

    fireEvent.change(passwordInput, {target: {value: '12345'}});
    fireEvent.click(submitButton);

    expect(await screen.findByText(/password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  it('updates form values on input change', () => {
    renderLoginForm();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
    fireEvent.change(passwordInput, {target: {value: 'password123'}});

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits form with valid data', async () => {
    const mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
    
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue(mockRouter);
    
    renderLoginForm();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', {name: /sign in/i});

    fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
    fireEvent.change(passwordInput, {target: {value: '123456'}});
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles remember me checkbox', () => {
    renderLoginForm();
    const rememberMeCheckbox = screen.getByRole('checkbox', {name: /remember me/i});
    
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
    
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });

  it('renders forgot password link', () => {
    renderLoginForm();
    const forgotPasswordLink = screen.getByText(/forgot your password/i);
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.tagName).toBe('SPAN');
  });
}); 