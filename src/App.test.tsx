import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, test, beforeEach } from 'vitest';

import App from './App';

const mockUsers = [
    {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        address: { city: 'Gwenborough' }
    },
    {
        id: 2,
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
        address: { city: 'Wisoky' }
    },
];

beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUsers),
    }));
});

test('Рендер списка после загрузки', async () => {
    render(<App />);

    const firstUser = await screen.findByText('Leanne Graham');
    const secondUser = await screen.findByText('Ervin Howell');

    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();

    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('Gwenborough')).toBeInTheDocument();

    expect(screen.getByText('Shanna@melissa.tv')).toBeInTheDocument();
    expect(screen.getByText('Wisoky')).toBeInTheDocument();

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);
});


test('Фильтрация по поиску с учетом Debounce', async () => {
    render(<App />);

    await screen.findByText('Leanne Graham');

    const input = screen.getByPlaceholderText('Поиск');

    fireEvent.change(input, { target: { value: 'Lea' } });

    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();
    }, { timeout: 500 });

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
        expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
        expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });
});

test('Состояние загрузки отображается', async () => {

//   vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))); 

  render(<App />);

  const loader = screen.getByText('Загрузка контактов...');
  expect(loader).toBeInTheDocument();
});

