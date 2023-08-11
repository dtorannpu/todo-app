import { Matcher, render, screen } from '@testing-library/react'
import Home from '@/app/page';

describe('Home', () => {
    it('ログインボタン', () => {
        render(<Home />);
        expect(screen.getByRole('link', { name: 'ログイン' })).toHaveAttribute('href', '/api/auth/login');
    });
});