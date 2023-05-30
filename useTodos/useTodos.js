import { useEffect, useReducer, useState } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    const [{ todosCount, pendingTodosCount }, setTodosCount] = useState({
        todosCount: 0,
        pendingTodosCount: 0,
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const newTodosCount = todos.length;
        const newPendingTodosCount = todos.filter((todo) => !todo.done).length;

        setTodosCount({
            todosCount: newTodosCount,
            pendingTodosCount: newPendingTodosCount,
        });
    }, [todos]);

    const onNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        };

        dispatch(action);
    };

    const onRemoveTodo = (todo) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: todo.id,
        });
    };

    const onToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    };

    return {
        todos,
        todosCount,
        pendingTodosCount,
        onNewTodo,
        onRemoveTodo,
        onToggleTodo,
    };
};
